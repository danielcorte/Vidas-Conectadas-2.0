import React, { useState } from 'react';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={openModal}
            >
                Abrir Modal
            </button>

            {isOpen && (
                <div className="modal fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="modal-content bg-white border border-black max-w-lg w-3/5 p-5 relative rounded-lg shadow-lg">
                        <span
                            className="close text-gray-400 float-right text-2xl font-bold hover:text-black cursor-pointer"
                            onClick={closeModal}
                        >
                            &times;
                        </span>

                        <form className="mt-4">
                            <h2 className="title text-2xl mb-4">Cadastrar</h2>

                            <label htmlFor="date" className="block mb-2">Data da doação:</label>
                            <div className="input mb-4">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="min-w-[100px] rounded-full border-2 border-red-600 p-2 focus:outline-none focus:border-red-800"
                                />
                            </div>

                            <label htmlFor="local" className="block mb-2">Local:</label>
                            <div className="input mb-4">
                                <input
                                    type="text"
                                    id="local"
                                    placeholder="Mario Gatti"
                                    name="local"
                                    className="min-w-[100px] rounded-full border-2 border-red-600 p-2 focus:outline-none focus:border-red-800"
                                />
                            </div>

                            <div className="mt-4 text-center">
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white rounded-full w-full h-10 transition duration-300 ease-in-out hover:bg-red-700"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
