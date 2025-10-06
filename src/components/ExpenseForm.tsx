import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(exp => exp.id === state.editingId)[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ["amount"].includes(name);
        setExpense(prev => ({
            ...prev,
            [name]: isAmountField ? Number(value) : value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('El gasto no puede ser mayor al presupuesto restante');
            return;
        }

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { ...expense, id: state.editingId } } });
        } else {
            dispatch({ type: 'add-expense', payload: { expense } });
        }

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        });
        setPreviousAmount(0);
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >
                {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="expenseName">
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="amount">
                    Cantidad
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="category">
                    Categoria
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">Seleccione</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="amount">
                    Cantidad
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />

            </div>
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />

        </form>
    )
}
