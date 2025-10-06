import React, { createContext, useReducer, type Dispatch } from 'react';
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from '../reducers/budget-reducer';

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number;
    remainingBudget: number;
}

type BudgetProviderProps = {
    children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);

    // Calculate totalExpenses and remainingBudget based on state
    const totalExpenses = state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = state.budget - totalExpenses;

    return (
        <BudgetContext.Provider value={{state, dispatch, totalExpenses, remainingBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}