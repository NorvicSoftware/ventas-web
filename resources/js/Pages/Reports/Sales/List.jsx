import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SearchButton from "@/Components/SearchButton";
import ResetButton from "@/Components/ResetButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function List({ auth }) {

    const { sales } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({ init_date: '', end_date: '', client: '', user: '' });
    const [initDate, setInitDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const calculateTotal = (products) => {
        return products.reduce((total, product) => total + (product.pivot.sale_price * product.pivot.quantity), 0).toFixed(2);
    }

    const search = (type, event) => {
        event.preventDefault();
        if (type === 2) {
            setInitDate(new Date());
            setEndDate(new Date());
            reset();
            data.init_date = new Date();
            data.end_date = new Date();
            data.client = '';
            data.user = '';
        }
        else {
            if(initDate !== null){
                data.init_date = initDate;
            }
            else {
                data.init_date = new Date();
            }
            if(endDate !== null){
                data.end_date = endDate;
            }
            else {
                data.end_date = new Date();;
            }
        }

        post(route('reports.sales.search'), {
            preserveScroll: true,
            onSuccess: () => console.log('Search'),
            onError: () => console.log('error '),
        });
    };


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Reporte de ventas</h2>}>
            <Head title="Ventas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="pb-2 space-x-2">
                                <form>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="init_date" value="Fecha Inicio:" />
                                            <DatePicker
                                                selected={initDate}
                                                className="border-gray-400 focus:border-blue-100 focus:ring-blue-300 rounded-md shadow-sm mt-1 block w-full"
                                                wrapperClassName="block w-full"
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(initDate) => setInitDate(initDate)}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="end_date" value="Fecha Fin:" />
                                            <DatePicker
                                                selected={endDate}
                                                className="border-gray-400 focus:border-blue-100 focus:ring-blue-300 rounded-md shadow-sm mt-1 block w-full"
                                                wrapperClassName="block w-full"
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(endDate) => setEndDate(endDate)}
                                            />
                                        </div>

                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="client" value="Cliente:" />
                                            <TextInput
                                                id="client"
                                                type="text"
                                                name="client"
                                                value={data.client}
                                                onChange={(e) => setData('client', e.target.value)}
                                                className="mt-1 block w-full"
                                                maxLength={35}
                                                placeholder="Cliente"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="user" value="Usuario:" />
                                            <TextInput
                                                id="user"
                                                type="text"
                                                name="user"
                                                value={data.user}
                                                onChange={(e) => setData('user', e.target.value)}
                                                className="mt-1 block w-full"
                                                maxLength={35}
                                                placeholder="Usuario"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <a href={route('reports.stock.products.pdf')} target="_blank" className=" bg-red-500 hover:bg-red-600 active:bg-red-700 py-2 px-4 rounded-md text-white">IMPRIMIR PDF</a>
                                        <a href={route('reports.stock.products.excel')} className=" bg-green-500 hover:bg-green-600 active:bg-green-700 py-2 px-4 rounded-md text-white">IMPRIMIR EXCEL</a>
                                        <SearchButton className="ml-3" onClick={(event) => search(1, event)}
                                            disabled={processing}>Buscar</SearchButton>
                                        <ResetButton className="ml-3" onClick={(event) => search(2, event)}
                                            disabled={processing}>Restablecer</ResetButton>
                                    </div>
                                </form>

                            </div>
                            <div>
                                <table className="min-w-full">
                                    <thead className=" uppercase text-white">
                                        <tr>
                                            <th className=" bg-gray-500 py-2">Fecha</th>
                                            <th className=" bg-gray-500 py-2">Cliente</th>
                                            <th className=" bg-gray-500 py-2">Usuario</th>
                                            <th className=" bg-gray-500 py-2">SubTotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map(sale => (
                                            <tr key={sale.id} className=" hover:bg-gray-200">
                                                <td className="py-2 px-3 border border-gray-300">{sale.sale_date}</td>
                                                <td className="py-2 px-3 border border-gray-300">{sale.client.full_name}</td>
                                                <td className="py-2 px-3 border border-gray-300">{sale.user.name}</td>
                                                <td className="py-2 px-3 border border-gray-300">{calculateTotal(sale.products)}</td>
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