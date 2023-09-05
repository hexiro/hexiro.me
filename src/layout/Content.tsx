export default function Content({ children }: { readonly children: React.ReactNode }) {
    return (
        <main className="mt-32 flex min-h-screen w-full flex-col rounded-t-md bg-background px-[5%] py-28 lg:ml-52 lg:mt-0 lg:rounded-l-md lg:px-[10%]">
            {children}
        </main>
    );
}
