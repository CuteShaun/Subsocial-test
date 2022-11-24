export const Button = ({
    onClick,
    type,
    children,
    className = "",
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            onClick={onClick}
            className={`${className} text-white font-bold py-2 px-4 rounded-full`}
            type={type}
            title="don't save items very fast"
        >
            {children}
        </button>
    );
};
