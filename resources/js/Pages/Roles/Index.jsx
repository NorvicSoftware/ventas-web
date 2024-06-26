import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VerticalLayout from "@/Layouts/VerticalLayout";
import { usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";
import TextInput from "@/Components/TextInput";

export default function Index({ auth }) {

    const { roles, permissions } = usePage().props;
    const [searchRole, setSearchRole] = useState('');
    console.log(roles);

    const filteredRole = roles.filter(
        role => role.name.toLocaleLowerCase().includes(searchRole.toLocaleLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Roles</h2>}>
            <Head title="Roles" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className=" flex justify-between items-center pb-2">
                                <TextInput isFocused={true} type="text" name="search" placeholder="Buscar..." onChange={(event) => setSearchRole(event.target.value)} />
                                <Form permissions={permissions}/>
                            </div>
                            <div>
                                <table className="min-w-full">
                                    <thead className=" uppercase text-white">
                                        <tr>
                                            <th className=" bg-gray-500 py-2">Rol</th>
                                            <th className=" bg-gray-500 py-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRole.map(role => (
                                            <tr key={role.id} className=" hover:bg-gray-200">
                                                <td className="py-2 px-3 border border-gray-300">{role.name}</td>
                                                <td className="py-2 px-3 border border-gray-300">
                                                    <Form id={role.id} role={role} permissions={permissions} />
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