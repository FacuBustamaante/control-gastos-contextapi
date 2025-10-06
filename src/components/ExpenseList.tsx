import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {

    const { state } = useBudget();
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    if (!isEmpty && filteredExpenses.length === 0) {
        return <p className="text-gray-600 text-2xl font bold">No hay gastos en esta categoría</p>
    }
    
    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font bold">No hay gastos aún</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Gastos</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetails 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
