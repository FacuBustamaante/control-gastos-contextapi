import type { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app'} | 
    { type: 'filter-by-category', payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id']
    currentCategory?: Category['id']
}

const initialBudget = () : number => {
    const LocalStorageBudget = localStorage.getItem('budget');
    return LocalStorageBudget ? Number(LocalStorageBudget) : 0;
}

const LocalStorageExpenses = () : Expense[]=>{
    const LocalStorageExpenses = localStorage.getItem('expenses'); 
    return LocalStorageExpenses ? JSON.parse(LocalStorageExpenses) : [];
}


export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: LocalStorageExpenses(),
    editingId: '',
    currentCategory: undefined,
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4(),
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'delete-expense') {

        return {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
        }
    }
    
    if (action.type === 'get-expense-by-id') {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {

        return {
            ...state,
            expenses: state.expenses.map(exp => exp.id === action.payload.expense.id ? action.payload.expense : exp),
            editingId: '',
            modal: false
        }
    }

    if (action.type === 'reset-app') {
        return {
            budget: 0,
            modal: false,
            expenses: [],
            editingId: '',
            currentCategory: undefined,
        };
    }

    if (action.type === 'filter-by-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        };
    }

    return state;
}