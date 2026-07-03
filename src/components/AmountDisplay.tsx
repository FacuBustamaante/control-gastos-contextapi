import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
    label?: string;
    amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className="text-lg font-bold">
            {label && (
                <span className="text-muted font-medium">{label}: </span>
            )}
            <span className="text-secondary font-black">{formatCurrency(amount)}</span>
        </p>
    );
}
