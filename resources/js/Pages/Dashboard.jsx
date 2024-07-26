import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Sales/Form';
import TextInput from "@/Components/TextInput";

export default function Dashboard({ auth }) {
    const { products, categories } = usePage().props;
    const [searchProduct, setSearchProduct] = useState('');
    const [searchCategory, setSearchCategory] = useState(0);
    const [productsForSale, setProductsForSale] = useState([]);

    const filteredProduct = products.filter(

        Number(searchCategory) === 0 ?
            product => product.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
            :
            product => {
                const auxFilterCategory = Number(product.category_id) === Number(searchCategory);
                const auxFilterProduct = product.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())

                return auxFilterCategory && auxFilterProduct
            }

    );

    const addProductForSale = (product) => {
        console.log(product);
        setProductsForSale((addProduct) => {
            const existingProduct = addProduct.find((item) => item.id === product.id);
            if (existingProduct) {
                return addProduct.map((item) => (
                    item.id === product.id ? { id: product.id, name: product.name, sale_price: product.sale_price, quantity: item.quantity + 1 }
                        : item
                ));
            }
            else {
                return [...addProduct, { id: product.id, name: product.name, sale_price: product.sale_price, quantity: 1 }];
            }

        });
    }
    const calculateTotal = () => {
        return productsForSale.reduce((total, product) => total + (product.sale_price * product.quantity), 0).toFixed(2);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
                    <div className=' grid grid-cols-4 gap-2'>
                        <div className=' col-span-3 bg-white shadow-sm sm:rounded-md'>
                            <div className=' flex justify-between px-1 py-2'>
                                <TextInput isFocused={true} type="text" name="search" placeholder="Buscar..." onChange={(event) => setSearchProduct(event.target.value)} />
                                <div className=' space-x-2'>
                                    <select onChange={(e) => setSearchCategory(e.target.value)}>
                                        <option value={0}>Todos</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <TextInput type="text" name="bar_code" placeholder="Escanear el Codigo" />
                                </div>

                            </div>
                            <div className='grid grid-cols-5 gap-2'>
                                {filteredProduct.map(product => (
                                    <div key={product.id}>
                                        {product.image ? (
                                            <div className='p-1 rounded shadow-lg mb-2'>
                                                <img src={'storage/images/' + product.image.url} className=' h-40 w-full object-cover' />
                                                <button onClick={(e) => addProductForSale(product)} className=' bg-blue-500 hover:bg-blue-600 p-2 text-white rounded w-full flex justify-between items-center mt-1'>
                                                    <span className='text-xs'>{product.name}</span>
                                                    <span>{product.sale_price}</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='p-1 rounded shadow-lg mb-2'>
                                                <img src='img/imagen-por-defecto.png' className=' h-40 w-full object-cover' />
                                                <button onClick={(e) => addProductForSale(product)} className=' bg-blue-500 hover:bg-blue-600 p-2 text-white rounded w-full flex justify-between items-center mt-1'>
                                                    <span className='text-xs'>{product.name}</span>
                                                    <span>{product.sale_price}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bg-white shadow-sm p-2 text-sm sm:rounded-md'>
                            <div className='flex justify-between'>
                                <p>Producto</p>
                                <div className=' space-x-2'>
                                    <span>Cant.</span>
                                    <span>Precio</span>
                                    <span>SubTotal</span>
                                </div>
                            </div>
                            {productsForSale.map(product => (
                                <div key={product.id} className='flex justify-between'>
                                    <p>{product.name}</p>
                                    <div className=' space-x-8'>
                                        <span>{product.quantity}</span>
                                        <span>{product.sale_price}</span>
                                        <span>{(product.sale_price * product.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-between font-bold'>
                                <span>TOTAL:</span>
                                <span>{calculateTotal()}</span>
                            </div>
                            <div>
                                <Form products={productsForSale} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
