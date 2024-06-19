import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const { products, categories } = usePage().props;
    const [searchProduct, setSearchProduct] = useState('');
    const [searchCategory, setSearchCategory] = useState(0);

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

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
                    <div className=' grid grid-cols-4  gap-2'>
                        <div className=' col-span-3 bg-white shadow-sm'>
                            <div className=' flex justify-between px-1 py-2'>
                                <input type='text' placeholder='Buscar' onChange={(e) => setSearchProduct(e.target.value)} />
                                <div className=' space-x-2'>
                                    <select onChange={(e) => setSearchCategory(e.target.value)}>
                                        <option value={0}>Todos</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )) }
                                    </select>
                                    <input type='text' placeholder='Escanear el Codigo' />
                                </div>

                            </div>
                            <div className=' grid grid-cols-5 gap-2'>
                                {filteredProduct.map(product => (
                                    <div key={product.id}>
                                        {product.image ? (
                                            <div className='p-1 rounded shadow-lg mb-2'>
                                                <img src={'storage/images/' + product.image.url}  className=' h-48 w-full object-cover'/>
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-sm'>{product.name}</p>
                                                    <p className='text-sm'>{product.sale_price}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='p-1 rounded shadow-lg mb-2'>
                                                <img src='img/imagen-por-defecto.png' className=' h-48 w-full object-cover'/>
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-sm'>{product.name}</p>
                                                    <p className='text-sm'>{product.sale_price}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                ))}

                            </div>
                        </div>
                        <div className='bg-white shadow-sm'>
                            <p>Productos seleccionados</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
