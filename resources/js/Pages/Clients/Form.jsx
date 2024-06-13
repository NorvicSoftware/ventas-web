import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Form({ id = 0, client = {} }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({
        dni: !client ? "" : client.dni,
        full_name: !client ? "" : client.full_name,
        cell_phone: !client ? "" : client.cell_phone,
        address: !client ? "" : client.address,
    });
    function openModal() {
        setShowModal(true);
    }
    function closeModal(e) {
        e.preventDefault();
        setShowModal(false);
        clearErrors();
        reset();
    }

    const submitCliente = (e) => {
        console.log(data);
        if (id === 0) {
            post(route("clients.store"), {
                onSuccess: (res) => {
                    console.log("ok", res);
                    closeModal();
                },
                onError: (error) => {
                    console.log("error", error);
                },
            });
        } else {
            put(route("clients.update", id), {
                onSuccess: (res) => {
                    console.log("ok", res);
                    closeModal();
                },
                onError: (error) => {
                    console.log("error", error);
                },
            });
        }
    };
    return (
        <div>
            <div>
                {id === 0 ? (
                    <button onClick={openModal}>Registrar Nuevo Cliente</button>
                ) : (
                    <button onClick={openModal}>Editar</button>
                )}
            </div>
            <Modal show={showModal} closeable={true} onClose={setShowModal}>
                <h1>Registrar Nuevo Cliente</h1>
                <form>
                    <label htmlFor="dni">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        value={data.dni}
                        onChange={(e) => {
                            setData("dni", e.target.value);
                        }}
                    />
                    {errors.dni && <p>{errors.dni}</p>}
                    <label htmlFor="full_name">Nombre</label>
                    <input
                        type="text"
                        name="full_name"
                        value={data.full_name}
                        onChange={(e) => {
                            setData("full_name", e.target.value);
                        }}
                    />
                    <label htmlFor="cell_phone">Celular</label>
                    <input
                        type="number"
                        name="cell_phone"
                        value={data.cell_phone}
                        onChange={(e) => {
                            setData("cell_phone", e.target.value);
                        }}
                    />
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={(e) => {
                            setData("address", e.target.value);
                        }}
                    />
                    <button onClick={closeModal}>Cancelar</button>
                    <button onClick={submitCliente}>Guardar</button>
                </form>
            </Modal>
        </div>
    );
}
