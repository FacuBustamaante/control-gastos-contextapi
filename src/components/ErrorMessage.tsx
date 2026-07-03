type ErrorMessageProps = {
    children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <p className="bg-red-500/10 border border-red-500/30 text-red-400 text-center p-3 rounded-xl text-sm font-medium">
            {children}
        </p>
    );
}
