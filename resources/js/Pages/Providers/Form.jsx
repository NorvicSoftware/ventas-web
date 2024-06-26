import CreateButton from "@/Components/CreateButton";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { HiMiniPencilSquare, HiXMark } from "react-icons/hi2";
import { toast } from 'react-toastify';

export default function Form({ id = 0, provider={} }) {

    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({ company: '', contact: '', cell_phone: '', address: '', email: '' });

    function openModal() {
        setShowModal(true);
        if (id !== 0) {
            setData({
                'company': provider.company,
                'contact': !provider.contact ? '' : provider.contact,
                'cell_phone': !provider.cell_phone ? '' : provider.cell_phone,
                'address': !provider.address ? '' : provider.address,
                'email': !provider.email ? '' : provider.email,
            })
        }
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submitProvider = (e) => {
        e.preventDefault();
        if (id === 0) {
            post(route('providers.store'), {
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
            put(route('providers.update', id), {
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
                    <CreateButton type='button' onClick={openModal}>Crear nuevo Proveedor</CreateButton>
                ) : (
                    <button onClick={openModal}><HiMiniPencilSquare className="w-6 h-6" /></button>
                )}
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold ">{id === 0 ? "CREAR NUEVO PROVEEDOR" : "EDITAR PROVEEDOR"}</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <InputLabel value="Empresa" />
                            <TextInput className=" block w-full mb-2" type="text" name="company" placeholder="Empresa" maxLength={35} value={data.company} onChange={(e) => setData('company', e.target.value)} />
                            {errors.company && (
                                <InputError message={errors.company}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Contacto" />
                            <TextInput className=" block w-full mb-2" type="text" name="contact" placeholder="Contacto" maxLength={75} value={data.contact} onChange={(e) => setData('contact', e.target.value)} />
                            {errors.contact && (
                                <InputError message={errors.contact}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Celular" />
                            <TextInput className=" block w-full mb-2" type="text" name="cell_phone" placeholder="Celular" maxLength={18} value={data.cell_phone} onChange={(e) => setData('cell_phone', e.target.value)} />
                            {errors.cell_phone && (
                                <InputError message={errors.cell_phone}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Correo electrónico" />
                            <TextInput className=" block w-full mb-2" type="text" name="email" placeholder="Correo electrónico" maxLength={75} value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && (
                                <InputError message={errors.email}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Dirección" />
                            <TextInput className=" block w-full mb-2" type="text" name="address" placeholder="Dirección" maxLength={250} value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        </div>
                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submitProvider}>Guardar</PrimaryButton>
                        </div>

                    </form>
                </div>

            </Modal>
        </div>
    )

}