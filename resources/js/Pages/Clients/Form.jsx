import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import CreateButton from "@/Components/CreateButton";
import { HiMiniPencilSquare, HiXMark } from "react-icons/hi2";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from 'react-toastify';

export default function Form({ id = 0, client = {} }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({
        dni: '',
        full_name: '',
        cell_phone: '',
        address: '',
        email: '',
    });

    function openModal() {
        setShowModal(true);
        if(id !== 0) {
            setData({
                'dni': client.dni,
                'full_name': !client.full_name ? '' : client.full_name,
                'cell_phone': !client.cell_phone ? '' : client.cell_phone,
                'address': !client.address ? '' : client.address,
                'email': !client.email ? '' : client.email,
            })
        }
    }
    function closeModal(e) {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submitCliente = (e) => {
        e.preventDefault();
        console.log(data);
        if (id === 0) {
            post(route("clients.store"), {
                onSuccess: (res) => {
                    console.log("ok", res);
                    if(res.props.flash.status){
                        toast.success(res.props.flash.message);
                    }
                    else {
                        toast.error(res.props.flash.message);
                    }
                    
                    closeModal();
                },
                onError: (error) => {
                    console.log("error", error);
                    toast.error('Existen errores en el formulario.');
                },
            });
        } else {
            put(route("clients.update", id), {
                onSuccess: (res) => {
                    console.log("ok", res);
                    if(res.props.flash.status){
                        toast.success(res.props.flash.message);
                    }
                    else {
                        toast.error(res.props.flash.message);
                    }
                    closeModal();
                },
                onError: (error) => {
                    console.log("error", error);
                    toast.error('Existen errores en el formulario.');
                },
            });
        }
    };
    return (
        <div>
            <div>
                {id === 0 ? (
                    <CreateButton type="button" onClick={openModal}>
                        Crear Nuevo Cliente
                    </CreateButton>
                ) : (
                    <button onClick={openModal}>
                        <HiMiniPencilSquare className="w-6 h-6" />
                    </button>
                )}
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold ">{id === 0 ? "CREAR NUEVO CLIENTE" : "EDITAR CLIENTE"}</h2>
                        <button
                            type="button"
                            onClick={closeModal}
                            className=" bg-gray-300 hover:bg-gray-400 px-2"
                        >
                            <HiXMark />
                        </button>
                    </div>
                    <form>
                        <InputLabel value="DNI" />
                        <TextInput
                            className="block w-full mb-2"
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            maxLength={15}
                            value={data.dni}
                            onChange={(e) => setData("dni", e.target.value)}
                        />
                        {errors.dni && (
                            <InputError message={errors.dni}></InputError>
                        )}
                        <InputLabel value="Nombre Completo" />
                        <TextInput
                            className="block w-full mb-2"
                            type="text"
                            name="full_name"
                            placeholder="Nombre Completo"
                            maxLength={75}
                            value={data.full_name}
                            onChange={(e) => {
                                setData("full_name", e.target.value);
                            }}
                        />
                        {errors.full_name && (
                            <InputError message={errors.full_name}></InputError>
                        )}
                        <InputLabel value="Celular" />
                        <TextInput
                            className="block w-full mb-2"
                            type="text"
                            name="cell_phone"
                            placeholder="Celular"
                            maxLength={15}
                            value={data.cell_phone}
                            onChange={(e) => {
                                setData("cell_phone", e.target.value);
                            }}
                        />
                        <InputLabel value="Correo electrónico" />
                        <TextInput
                            className="block w-full mb-2"
                            type="text"
                            name="email"
                            placeholder="Correo electrónico"
                            maxLength={75}
                            value={data.email}
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                        />
                        <InputLabel value="Dirección" />
                        <TextInput
                            className="block w-full mb-2"
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            maxLength={75}
                            value={data.address}
                            onChange={(e) => {
                                setData("address", e.target.value);
                            }}
                        />
                        <div className="space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>
                                Cancelar
                            </SecondaryButton>
                            <PrimaryButton onClick={submitCliente}>
                                Guardar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
