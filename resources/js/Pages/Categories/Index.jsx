import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";

export default function Index({auth}) {

    const { categories } = usePage().props;
    const [ searchCategory, setSearchCategory ] = useState('');
    console.log(categories);

    const filteredCategory = categories.filter(
        category => category.name.toLocaleLowerCase().includes(searchCategory.toLocaleLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user} header="CATEGORIAS">
            <div>
                <input type="text" name="search" placeholder="Buscar..." onChange={(event) => setSearchCategory(event.target.value)} />
                <Form />
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filteredCategory.map(category => (
                            <tr key={category.id}>
                                <td>{ category.name }</td>
                                <td>{ category.description }</td>
                                <td>
                                    <Form id={category.id} category={category} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>       

        </AuthenticatedLayout>
    ) 

}