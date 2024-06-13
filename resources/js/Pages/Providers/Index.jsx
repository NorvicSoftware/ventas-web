import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Index ({auth}){
    return (
        <AuthenticatedLayout user={auth.user}  header="PROVEEDORES">

        </AuthenticatedLayout>
    )
}