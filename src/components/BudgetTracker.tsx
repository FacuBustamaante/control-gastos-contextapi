import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget();
    const percentageSpent = +(((totalExpenses / state.budget) * 100)).toFixed(2);

    const isOver = percentageSpent > 85;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
                <div className="w-52">
                    <CircularProgressbar
                        value={percentageSpent}
                        styles={buildStyles({
                            pathColor: isOver ? "#dc2626" : "#00ed64",
                            trailColor: "#1e2422",
                            textSize: 8,
                            textColor: isOver ? "#dc2626" : "#00ed64",
                        })}
                        text={`${percentageSpent}% Gastado`}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-center gap-5">
                <button
                    className="w-full p-3 rounded-xl border border-app text-muted uppercase font-bold text-sm tracking-widest hover:border-red-500 hover:text-red-500 transition-colors"
                    onClick={() => dispatch({ type: "reset-app" })}
                >
                    Reiniciar App
                </button>
                <div className="space-y-3 border-t border-app pt-5">
                    <AmountDisplay label="Presupuesto" amount={state.budget} />
                    <AmountDisplay label="Disponible" amount={remainingBudget} />
                    <AmountDisplay label="Gastado" amount={totalExpenses} />
                </div>
            </div>
        </div>
    );
}
