import { useMemo } from "react";
import { formatDate } from "../helpers";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailsProps = {
    expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
    const categoryInfo = useMemo(
        () => categories.filter((cat) => cat.name === expense.category)[0],
        [expense]
    );
    const { dispatch } = useBudget();

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
                }
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({ type: "delete-expense", payload: { id: expense.id } })
                }
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-surface border-b border-app p-5 w-full flex gap-4 items-center transition-colors hover:bg-elevated">
                    <div className="shrink-0">
                        <img
                            src={`/icono_${categoryInfo?.icon}.svg`}
                            alt="Icono Gasto"
                            className="w-14"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase text-muted tracking-widest">
                            {categoryInfo?.name}
                        </p>
                        <p className="font-bold text-body truncate">{expense.expenseName}</p>
                        <p className="text-muted text-sm">
                            {expense.date instanceof Date ? formatDate(expense.date) : ""}
                        </p>
                    </div>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
