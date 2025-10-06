import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'filter-by-category',
            payload: {
                id: e.target.value
            }
        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select id="category" className="bg-slate-100 p-3 flex-1 rounded-lg"
                        onChange={handleChange}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map(cat => (
                            <option
                                key={cat.id}
                                value={cat.name}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
