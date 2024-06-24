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

export default function Form({ id = 0, user = {} }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({ name: '', email: '', password:'', password_confirmation: '', status: 1 });

    function openModal() {
        setShowModal(true);
        if (id !== 0) {
            setData({
                'name': user.name,
                'description': !user.description ? '' : user.description,
            })
        }
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submituser = (e) => {
        e.preventDefault();
        console.log(data);
        if (id === 0) {
            post(route('users.store'), {
                onSuccess: (res) => {
                    console.log('OK', res);
                    closeModal();
                },
                onError: (error) => console.log('error: ', error)
            })
        }
        else {
            console.log('update');
            put(route('categories.update', id), {
                onSuccess: (res) => {
                    console.log('OK', res);
                    closeModal();
                },
                onError: (error) => console.log('error: ', error)
            })
        }

    }

    return (
        <div>
            <div>
                {id === 0 ? (
                    <CreateButton type='button' onClick={openModal}>Crear nuevo usuario</CreateButton>
                ) : (
                    <button onClick={openModal}><HiMiniPencilSquare className="w-6 h-6" /></button>
                )}
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold ">{id === 0 ? "CREAR NUEVA CATEGORIA" : "EDITAR CATEGORIA"}</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <InputLabel value="Usuario" />
                            <TextInput className=" block w-full mb-2" type="text" name="name" maxLength={35} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && (
                                <InputError message={errors.name}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Correo Electrónico" />
                            <TextInput className=" block w-full mb-2" type="text" name="email" maxLength={75} value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && (
                                <InputError message={errors.email}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Contraseña" />
                            <TextInput className=" block w-full mb-2" type="password" name="password" maxLength={75} value={data.password} onChange={(e) => setData('password', e.target.value)} />
                            {errors.password && (
                                <InputError message={errors.password}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Confirmar Contraseña" />
                            <TextInput className=" block w-full mb-2" type="password" name="password_confirmation" maxLength={75} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                            
                        </div>
                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submituser}>Guardar</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>

    )
}