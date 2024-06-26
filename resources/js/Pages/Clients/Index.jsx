import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";
import TextInput from "@/Components/TextInput";

export default function Index({ auth }) {
    const { clients } = usePage().props;
    const [searchClient, setSearchClient] = useState("");
    console.log(clients);
    const filteredClient = clients.data.filter((client) =>
        client.full_name.toLowerCase().includes(searchClient.toLowerCase())
    );
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Clientes</h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center pb-2">
                                <TextInput
                                    isFocused={true}
                                    type="text"
                                    name="search"
                                    placeholder="Buscar"
                                    onChange={(event) =>
                                        setSearchClient(event.target.value)
                                    }
                                ></TextInput>
                                <Form />
                            </div>
                            <div>
                                <table className="min-w-full text-gray-800 dark:text-gray-200">
                                    <thead className="uppercase text-white bg-gray-500">
                                        <tr>
                                            <th className="bg-gray-500 py-2">
                                                DNI
                                            </th>
                                            <th className="bg-gray-500 py-2">
                                                Nombre
                                            </th>
                                            <th className="bg-gray-500 py-2">
                                                Celular
                                            </th>
                                            <th className="bg-gray-500 py-2">
                                                Dirección
                                            </th>
                                            <th className="bg-gray-500 py-2">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClient.map((client) => (
                                            <tr
                                                key={client.id}
                                                className="hover:bg-gray-200 dark:hover:bg-gray-900 py-2 px-3 border border-gray-300"
                                            >
                                                <td className="py-2 px-3 boder border-gray-300">
                                                    {client.dni}
                                                </td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    {client.full_name}
                                                </td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    {client.cell_phone}
                                                </td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    {client.address}
                                                </td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    <Form
                                                        id={client.id}
                                                        client={client}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className=" pt-2">
                                    {clients.links.map((link, index) => (
                                        <Link key={index} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} 
                                        className={` px-2 py-1 mx-2 hover:bg-slate-500 ${link.active ? 'bg-slate-900 text-white' : 'bg-slate-300'}`}/>
                                        // <a key={index} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} 
                                        // className={` px-2 py-1 mx-2 hover:bg-slate-500 ${link.active ? 'bg-slate-900 text-white' : 'bg-slate-300'}`}    />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
