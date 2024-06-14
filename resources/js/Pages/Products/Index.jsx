import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
// import Form from "./Form";
import TextInput from "@/Components/TextInput";

export default function Index({ auth }) {

    const { products } = usePage().props;
    const [searchProduct, setSearchProduct] = useState('');
    console.log(products);

    const filteredProduct = products.filter(
        product => product.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user} header="CATEGORIAS">

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className=" flex justify-between items-center pb-2">
                                <TextInput isFocused={true} type="text" name="search" placeholder="Buscar..." onChange={(event) => setSearchProduct(event.target.value)} />
                                {/* <Form /> */}
                            </div>
                            <div>
                                <table className="min-w-full">
                                    <thead className=" uppercase text-white">
                                        <tr>
                                            <th className=" bg-gray-500 py-2">Producto</th>
                                            <th className=" bg-gray-500 py-2">Precio</th>
                                            <th className=" bg-gray-500 py-2">Cantidad actual</th>
                                            <th className=" bg-gray-500 py-2">Estado</th>
                                            <th className=" bg-gray-500 py-2">Categoria</th>
                                            <th className=" bg-gray-500 py-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProduct.map(product => (
                                            <tr key={product.id} className=" hover:bg-gray-200">
                                                <td className="py-2 px-3 border border-gray-300">{product.name}</td>
                                                <td className="py-2 px-3 border border-gray-300">{product.sale_price}</td>
                                                <td className="py-2 px-3 border border-gray-300">{product.quantity}</td>
                                                <td className="py-2 px-3 border border-gray-300">{product.status}</td>
                                                <td className="py-2 px-3 border border-gray-300">{product.category_name}</td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    {/* <Form id={product.id} product={product} /> */}
                                                </td>
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