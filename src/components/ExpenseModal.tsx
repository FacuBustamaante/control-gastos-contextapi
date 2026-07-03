import { Fragment } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { useBudget } from "../hooks/useBudget";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal() {
    const { state, dispatch } = useBudget();

    return (
        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => dispatch({ type: "show-modal" })}
                    aria-label="Agregar gasto"
                    className="rounded-full transition-transform hover:scale-110 drop-shadow-lg"
                >
                    <PlusCircleIcon className="w-16 h-16 text-secondary" />
                </button>
            </div>

            <Transition appear show={state.modal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => dispatch({ type: "hide-modal" })}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-surface border border-app p-6 text-left align-middle shadow-xl transition-all">
                                    <ExpenseForm />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
