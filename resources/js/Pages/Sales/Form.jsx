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

export default function Form({ id = 0, products = [] }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, errors, reset, clearErrors } = useForm({ dni: '', client_name: '', products: [] });

    function openModal() {
        setShowModal(true);
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const calculateTotal = () => {
        return products.reduce((total, product) => total + (product.sale_price * product.quantity), 0).toFixed(2);
    }

    const submitsale = (e) => {
        e.preventDefault();
        data.products = products;
        console.log(data);
        post(route('sales.store'), {
            onSuccess: (res) => {
                console.log('OK', res);
                closeModal();
            },
            onError: (error) => console.log('error: ', error)
        })

    }

    return (
        <div>
            <div>
                <CreateButton type='button' onClick={openModal}>Generar venta</CreateButton>
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold ">GENERAR VENTA</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <InputLabel value="Codigo cliente" />
                            <TextInput className=" block w-full mb-2" type="text" name="dni" maxLength={35} value={data.dni} onChange={(e) => setData('dni', e.target.value)} />
                            {errors.dni && (
                                <InputError message={errors.dni}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Nombre cliente" />
                            <TextInput className=" block w-full mb-2" type="text" name="client_name" maxLength={35} value={data.client_name} onChange={(e) => setData('client_name', e.target.value)} />
                            {errors.client_name && (
                                <InputError message={errors.client_name}></InputError>
                            )}
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.sale_price}</td>
                                        <td>{(product.quantity * product.sale_price).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>TOTAL</td>
                                    <td>{calculateTotal()}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submitsale}>Guardar</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>

    )
}