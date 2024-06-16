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

export default function Form({ id = 0, product = {}, categories = [] }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({ name: '', sale_price: '', quantity: '', status: '', category_id: '', image: '' });

    function openModal() {
        setShowModal(true);
        if (id !== 0) {
            setData({
                'name': product.name,
                'sale_price': !product.sale_price ? '' : product.sale_price,
                'quantity': !product.quantity ? '' : product.quantity,
                'status': !product.status ? '' : product.status,
                'category_id': !product.category_id ? '' : product.category_id,
            })
        }
    }

    const closeModal = (e) => {
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submitProduct = (e) => {
        e.preventDefault();
        console.log(data);
        if (id === 0) {
            post(route('products.store'), {
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
                    <CreateButton type='button' onClick={openModal}>Crear nuevo Producto</CreateButton>
                ) : (
                    <button onClick={openModal}><HiMiniPencilSquare className="w-6 h-6" /></button>
                )}

            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold "> {id === 0 ? "CREAR NUEVO PRODUCTO" : "EDITAR PRODUCTO"}</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <form>
                        <div>
                            <InputLabel value="Nombre producto" />
                            <TextInput className=" block w-full mb-2" type="text" name="name" value={data.name} onChange={(e) => console.log(e.target.value)} />
                            {errors.name && (
                                <InputError message={errors.name}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Precio de venta" />
                            <TextInput className=" block w-full mb-2" type="text" name="sale_price" value={data.sale_price} onChange={(e) => setData('sale_price', e.target.value)} />
                            {errors.sale_price && (
                                <InputError message={errors.sale_price}></InputError>
                            )}
                        </div>
                        <div>
                            <InputLabel value="Cantidad" />
                            <TextInput className=" block w-full mb-2" type="text" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Estado" />
                            <TextInput className=" block w-full mb-2" type="text" name="status" value={data.status} onChange={(e) => setData('status', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Categoria" />
                            <select onChange={(e) => setData('category_id', e.target.value)}>
                                {categories.map(category =>(
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {/* <TextInput className=" block w-full mb-2" type="text" name="category_id" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} /> */}
                        </div>
                        <div>
                            <input type="file" onChange={(e) => setData('image', e.target.files[0])} />
                        </div>

                        <div className=" space-x-2 flex justify-end">
                            <SecondaryButton type="button" onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton onClick={submitProduct}>Guardar</PrimaryButton>
                        </div>

                    </form>
                </div>

            </Modal>
        </div>

    )
}