import AmountDisplay from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget();
    const percentageSpent = +(((totalExpenses / state.budget) * 100)).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentageSpent}
                    styles={buildStyles({
                        pathColor: percentageSpent > 85 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textSize: 8,
                        textColor: percentageSpent > 85 ? '#dc2626' : '#3b82f6',
                    })}
                    text={`${percentageSpent}% Gastado`}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-700"
                    onClick={() => dispatch({ type: 'reset-app' })}
                >
                    Reiniciar App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
