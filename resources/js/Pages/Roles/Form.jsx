import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import CreateButton from "@/Components/CreateButton";
import { HiMiniPencilSquare, HiXMark, HiXCircle } from "react-icons/hi2";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import { toast } from 'react-toastify';

export default function Form({ id = 0, role = {}, permissions = {} }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({ name: '', permissions: [] });

    function openModal() {
        setShowModal(true);
        if (id !== 0) {
            setData({
                'name': role.name,
                'permissions': role.permissions.map(permission => permission.name),
            })
        }
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const LoadPermissionChange = (value) => {
        setData('permissions', data.permissions.includes(value)
            ? data.permissions.filter(item => item === value)
            : [...data.permissions, value]);
    }

    const submitrole = (e) => {
        e.preventDefault();
        if (id === 0) {
            post(route('roles.store'), {
                onSuccess: (res) => {
                    console.log('OK', res);
                    if(res.props.flash.status){
                        toast.success(res.props.flash.message);
                    }
                    else {
                        toast.error(res.props.flash.message);
                    }
                    closeModal();
                },
                onError: (error) => {
                    toast.error('Existen errores en el formulario.');
                    console.log('error: ', error);
                }
            })
        }
        else {
            put(route('roles.update', id), {
                onSuccess: (res) => {
                    console.log('OK', res);
                    if(res.props.flash.status){
                        toast.success(res.props.flash.message);
                    }
                    else {
                        toast.error(res.props.flash.message);
                    }
                    closeModal();
                },
                onError: (error) => {
                    toast.error('Existen errores en el formulario.');
                    console.log('error: ', error);
                }
            })
        }
    }

    return (
        <div>
            <div>
                {id === 0 ? (
                    <CreateButton type='button' onClick={openModal}>Crear nuevo rol</CreateButton>
                ) : (
                    <button onClick={openModal}><HiMiniPencilSquare className="w-6 h-6" /></button>
                )}
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold ">{id === 0 ? "CREAR NUEVO ROL" : "EDITAR ROL"}</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <InputLabel value="Nombre rol" />
                            <TextInput className=" block w-full mb-2" type="text" name="name" placeholder="Nombre rol" maxLength={35} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && (
                                <InputError message={errors.name}></InputError>
                            )}
                        </div>
                        {permissions.map(permission => (
                            <div key={permission.id}>
                                <label>
                                    <Checkbox value={permission.name} checked={data.permissions.includes(permission.name)} onChange={(e) => LoadPermissionChange(e.target.value)}/>
                                    {permission.name}
                                </label>
                            </div>
                        ))}
                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submitrole}>Guardar</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}