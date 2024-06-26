import Modal from "@/Components/Modal";
import { useState } from "react";
import CreateButton from "@/Components/CreateButton";
import { HiEye, HiXMark } from "react-icons/hi2";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import TextSelect from "@/Components/TextSelect";

export default function Show({ product = {} }) {
    const [showModal, setShowModal] = useState(false);


    function openModal() {
        setShowModal(true);
    }

    const closeModal = (e) => {
        setShowModal(false);
    }

    return (
        <div>
            <div>
                <button onClick={openModal}><HiEye className="w-6 h-6" /></button>
            </div>
            <Modal show={showModal} closeable={true} onClose={closeModal}>
                <div className="p-4">
                    <div className=" flex justify-between pb-4">
                        <h2 className=" font-semibold "> VER PRODUCTO</h2>
                        <button type="button" onClick={closeModal} className=" bg-gray-300 hover:bg-gray-400 px-2"><HiXMark /></button>
                    </div>
                    <div className="flex p-2">
                        {product.image ?(
                            <img src={'storage/images/' + product.image.url} className=" w-48 h-36"/>
                        ) : (
                            <img src="/img/imagen-por-defecto.png" className=" w-48 h-36"/>
                        )}
                        
                        <div className="flex-1">
                            <p>Producto: {product.name}</p>
                            <p>Precio: {product.sale_price}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p>Categoria: {product.category.name}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    )
}