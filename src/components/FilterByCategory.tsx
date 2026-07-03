import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: "filter-by-category",
            payload: { id: e.target.value },
        });
    };

    return (
        <div className="glass border border-app rounded-2xl p-5 mb-6">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <label
                        htmlFor="category"
                        className="text-muted text-xs font-medium uppercase tracking-widest shrink-0"
                    >
                        Filtrar gastos
                    </label>
                    <select
                        id="category"
                        className="bg-elevated border border-app rounded-xl p-2.5 flex-1 text-body focus:outline-none focus:border-secondary transition-colors"
                        onChange={handleChange}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
