import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    });
    const [error, setError] = useState("");
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value });
    };

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(
                (exp) => exp.id === state.editingId
            )[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.editingId]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const isAmountField = ["amount"].includes(name);
        setExpense((prev) => ({
            ...prev,
            [name]: isAmountField ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (expense.amount - previousAmount > remainingBudget) {
            setError("El gasto no puede ser mayor al presupuesto restante");
            return;
        }
        if (state.editingId) {
            dispatch({
                type: "update-expense",
                payload: { expense: { ...expense, id: state.editingId } },
            });
        } else {
            dispatch({ type: "add-expense", payload: { expense } });
        }
        setExpense({ amount: 0, expenseName: "", category: "", date: new Date() });
        setPreviousAmount(0);
        setError("");
    };

    const inputClass =
        "bg-elevated border border-app rounded-xl p-3 text-body placeholder:text-muted focus:outline-none focus:border-secondary transition-colors";
    const labelClass = "text-xs text-muted uppercase tracking-widest font-medium";

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="font-display text-center text-2xl font-bold border-b border-secondary pb-3 text-body block w-full">
                {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="expenseName">
                    Nombre del Gasto
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className={inputClass}
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="amount">
                    Cantidad
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Ej. 300"
                    className={inputClass}
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="category">
                    Categoría
                </label>
                <select
                    id="category"
                    className={inputClass}
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass}>Fecha</label>
                <DatePicker
                    className="bg-elevated border-0 rounded-xl"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-primary cursor-pointer w-full p-3 text-white uppercase font-bold rounded-xl hover:bg-[#00855f] transition-colors"
                value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
            />
        </form>
    );
}
