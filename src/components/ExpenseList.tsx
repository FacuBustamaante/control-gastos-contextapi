import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
    const { state } = useBudget();
    const filteredExpenses = state.currentCategory
        ? state.expenses.filter((expense) => expense.category === state.currentCategory)
        : state.expenses;
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    if (!isEmpty && filteredExpenses.length === 0) {
        return (
            <p className="text-muted text-lg font-medium text-center py-12">
                No hay gastos en esta categoría
            </p>
        );
    }

    return (
        <div className="mt-2">
            {isEmpty ? (
                <p className="text-muted text-lg font-medium text-center py-12">
                    No hay gastos aún
                </p>
            ) : (
                <>
                    <p className="text-muted text-xs uppercase tracking-widest font-medium mb-3">
                        Gastos registrados
                    </p>
                    <div className="bg-surface border border-app rounded-2xl overflow-hidden">
                        {filteredExpenses.map((expense) => (
                            <ExpenseDetails key={expense.id} expense={expense} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
