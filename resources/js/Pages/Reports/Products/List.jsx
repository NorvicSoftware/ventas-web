import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";

export default function List({ auth }) {

    const { products } = usePage().props;


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Reporte de Stock de productos</h2>}>
            <Head title="Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className=" flex justify-end items-center pb-2 space-x-2">
                                <a href={route('reports.stock.products.pdf')} target="_blank" className=" bg-red-500 hover:bg-red-600 active:bg-red-700 py-2 px-4 rounded-md text-white">IMPRIMIR PDF</a>
                                <a href={route('reports.stock.products.excel')} className=" bg-green-500 hover:bg-green-600 active:bg-green-700 py-2 px-4 rounded-md text-white">IMPRIMIR EXCEL</a>
                            </div>
                            <div>
                                <table className="min-w-full">
                                    <thead className=" uppercase text-white">
                                        <tr>
                                            <th className=" bg-gray-500 py-2">Producto</th>
                                            <th className=" bg-gray-500 py-2">Stocks</th>
                                            <th className=" bg-gray-500 py-2">Categoria</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id} className=" hover:bg-gray-200">
                                                {Number(product.quantity) < 50 ? (
                                                    <>
                                                        <td className="py-2 px-3 border border-gray-300 text-red-400">{product.name}</td>
                                                        <td className="py-2 px-3 border border-gray-300 text-red-400">{product.quantity}</td>
                                                        <td className="py-2 px-3 border border-gray-300 text-red-400">{product.category.name}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="py-2 px-3 border border-gray-300">{product.name}</td>
                                                        <td className="py-2 px-3 border border-gray-300">{product.quantity}</td>
                                                        <td className="py-2 px-3 border border-gray-300">{product.category.name}</td>
                                                    </>
                                                )}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )

}