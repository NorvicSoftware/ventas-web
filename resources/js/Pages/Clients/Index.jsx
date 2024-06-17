import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";

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
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between items-center">
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar..."
                                onChange={(event) =>
                                    setSearchClient(event.target.value)
                                }
                                className="dark:text-gray-900 text-gray-100"
                            />
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <table className="min-w-full text-gray-800 dark:text-gray-200">
                                    <thead className="uppercase border-b-2">
                                        <tr>
                                            <th>DNI</th>
                                            <th>Nombre</th>
                                            <th>Celular</th>
                                            <th>Dirección</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClient.map((client) => (
                                            <tr key={client.id}>
                                                <td>{client.dni}</td>
                                                <td>{client.full_name}</td>
                                                <td>{client.cell_phone}</td>
                                                <td>{client.address}</td>
                                                <td>
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
