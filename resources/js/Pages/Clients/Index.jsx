import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";
import TextInput from "@/Components/TextInput";

export default function Index({ auth }) {
    const { clients } = usePage().props;
    const [searchClient, setSearchClient] = useState("");
    console.log(clients);
    const filteredClient = clients.filter((client) =>
        client.full_name.toLowerCase().includes(searchClient.toLowerCase())
    );
    return (
        <AuthenticatedLayout user={auth.user} header="CLIENTES">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center pb-2">
                                <TextInput
                                    placeholder="Buscar"
                                    onChange={(event) =>
                                        setSearchClient(event.target.value)
                                    }
                                ></TextInput>
                                <Form />
                            </div>
                            <div>
                                <table className="min-w-full text-gray-800 dark:text-gray-200">
                                    <thead className="uppercase bg-gray-500 border border-gray-300">
                                        <tr>
                                            <th className="py-2">DNI</th>
                                            <th className="py-2">Nombre</th>
                                            <th className="py-2">Celular</th>
                                            <th className="py-2">Dirección</th>
                                            <th className="py-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClient.map((client) => (
                                            <tr
                                                key={client.id}
                                                className="hover:bg-gray-900 py-2 px-3 border border-gray-300"
                                            >
                                                <td className="py-2 px-3">
                                                    {client.dni}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {client.full_name}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {client.cell_phone}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {client.address}
                                                </td>
                                                <td className="py-2 px-3">
                                                    <Form
                                                        id={client.id}
                                                        client={client}
                                                    />
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
    );
}
