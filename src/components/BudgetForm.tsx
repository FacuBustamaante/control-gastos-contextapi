import { useMemo, useState, type ChangeEvent } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    };

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "add-budget", payload: { budget } });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-3">
                <label
                    htmlFor="budget"
                    className="font-display text-3xl text-secondary font-bold text-center"
                >
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-elevated border border-app rounded-xl p-3 text-body placeholder:text-muted focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-primary w-full p-3 rounded-xl text-white uppercase font-bold hover:bg-[#00855f] cursor-pointer disabled:opacity-40 transition-colors"
                disabled={isValid}
            />
        </form>
    );
};

export default BudgetForm;
