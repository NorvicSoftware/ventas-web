import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import Form from "./Form";

export default function Index({ auth }) {
    const { providers } = usePage().props;
    const [searchProvider, setSearchProvider] = useState("");

    const filteredProvider = providers.filter(
        (provider) =>
            provider.contact
                .toLocaleLowerCase()
                .includes(searchProvider.toLocaleLowerCase()) ||
            provider.company
                .toLocaleLowerCase()
                .includes(searchProvider.toLocaleLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Proveedores</h2>}>
            <Head title="Proveedores" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className=" flex justify-between pb-2">
                                <TextInput placeholder="Buscar..." onChange={(event) => setSearchProvider(event.target.value)}></TextInput>
                                <Form />
                            </div>
                            <div>
                                <table className=" min-w-full">
                                    <thead className="uppercase text-white dark:text-gray-200">
                                        <tr>
                                            <th className=" bg-gray-500 py-2">Empresa</th>
                                            <th className=" bg-gray-500 py-2">Contacto</th>
                                            <th className=" bg-gray-500 py-2">Celular</th>
                                            <th className=" bg-gray-500 py-2">Correo Electrónico</th>
                                            <th className=" bg-gray-500 py-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProvider.map(provider => (
                                            <tr key={provider.id} className=" hover:bg-gray-200">
                                                <td className="py-2 px-3 border border-gray-300">{provider.company}</td>
                                                <td className="py-2 px-3 border border-gray-300">{provider.contact}</td>
                                                <td className="py-2 px-3 border border-gray-300">{provider.cell_phone}</td>
                                                <td className="py-2 px-3 border border-gray-300">{provider.email}</td>
                                                <td className="py-2 px-3 border border-gray-300"><Form id={provider.id} provider={provider} /></td>
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
    );
}
