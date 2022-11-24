export const Feed = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-4">
                <div
                    id="feed"
                    className="max-w-lg bg-white border border-b-0 border-gray-200 mx-auto"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
