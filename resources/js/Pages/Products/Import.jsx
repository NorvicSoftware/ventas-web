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
import TextSelect from "@/Components/TextSelect";
import { toast } from 'react-toastify';

export default function Import() {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({ excel: '' });

    function openModal() {
        setShowModal(true);
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submitProduct = (e) => {
        e.preventDefault();
        post(route('products.import'), {
            onSuccess: (res) => {
                console.log('OK', res);
                if (res.props.flash.status) {
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

    return (
        <>
            <PrimaryButton type='button' onClick={openModal}>Importar Producto Excel</PrimaryButton>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold "> IMPORTAR ARCHIVO EXCEL PRODUCTOS</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <input type="file" onChange={(e) => setData('excel', e.target.files[0])} />
                        </div>
                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submitProduct}>Guardar</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>

    )
}