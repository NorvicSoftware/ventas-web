
export default function VerticalLayout({ children }) {
    return (
        <div className="flex justify-normal">
            <div className=" bg-slate-300 w-60">
                <div className=" p-6">
                    <h1 className=" text-2xl font-bold">LOGO</h1>
                </div>
                <nav className="mt-4">
                    <a href="#" className=" block py-4 pl-4 hover:bg-slate-500 hover:text-white">Categorias</a>
                    <a href="#" className=" block py-4 pl-4 hover:bg-slate-500 hover:text-white">Productos</a>
                    <a href="#" className=" block py-4 pl-4 hover:bg-slate-500 hover:text-white">Clientes</a>
                </nav>
            </div>
            <div className=" flex-1">
                {children}
            </div>
        </div>
    )
}