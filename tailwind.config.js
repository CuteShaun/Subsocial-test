module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: "#b2277a",
                "purple-50": "#941c63",
            },
            animation: {
                "spin-fast": "spin 0.5s linear infinite",
            },
        },
    },
    plugins: [],
};
