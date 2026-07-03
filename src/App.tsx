import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";
import { useBudget } from "./hooks/useBudget";
import { useTheme } from "./hooks/useTheme";
import { useEffect, useMemo } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function App() {
    const { state } = useBudget();
    const { theme, toggle } = useTheme();
    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    useEffect(() => {
        localStorage.setItem("budget", state.budget.toString());
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
    }, [state]);

    return (
        <>
            <header className="grid-bg border-b border-app py-10">
                <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
                    <div>
                        <p className="text-muted text-xs uppercase tracking-widest mb-1">
                            App Financiera
                        </p>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-body leading-tight">
                            Planificador de{" "}
                            <span className="text-gradient">Gastos</span>
                        </h1>
                    </div>
                    <button
                        onClick={toggle}
                        aria-label="Cambiar tema"
                        className="grid size-10 place-items-center rounded-xl border border-app text-muted transition-colors hover:border-secondary hover:text-secondary"
                    >
                        {theme === "dark"
                            ? <SunIcon className="w-5 h-5" />
                            : <MoonIcon className="w-5 h-5" />
                        }
                    </button>
                </div>
            </header>

            <div className="max-w-3xl mx-auto mt-8 bg-surface border border-app shadow-lg p-8 md:p-10 rounded-2xl">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </div>

            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-8 px-4">
                    <FilterByCategory />
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
}

export default App;
