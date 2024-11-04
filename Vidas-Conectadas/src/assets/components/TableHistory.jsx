import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HistoricoDoacoes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [historicos, setHistoricos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [noMoreData, setNoMoreData] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const fetchHistoricos = async (pageNumber) => {
        try {
            const response = await fetch(`http://localhost:3000/historico?page=${pageNumber}&limit=10`);
            const result = await response.json();
            setHistoricos(result.historicos);
            setTotalPages(result.totalPages);
            setNoMoreData(result.historicos.length === 0);
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
        }
    };

    useEffect(() => {
        fetchHistoricos(page);
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/historico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, local }),
            });

            if (response.ok) {
                // Após adicionar uma nova doação, reinicie a página para 1
                setPage(1);
                fetchHistoricos(1); // Recarrega os históricos para a primeira página
                closeModal();
            } else {
                console.error('Erro ao adicionar o histórico:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
            <div className="container bg-cor10 rounded-lg shadow-lg p-6 mt-5 max-w-lg w-full">
                <a href="logado-index-exemplo.html" className="text-red-600">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-red-600 text-lg" />
                </a>
                <div className="flex justify-between font-bold my-3">
                    <p>João da Silva</p>
                    <p>123.456.789-00</p>
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-2 text-left">Data da Doação</th>
                            <th className="border-b p-2 text-left">Local da Doação</th>
                            <th className="border-b p-2 text-left">Apto a Doar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicos.map((historico) => (
                            <tr key={historico.id}>
                                <td className="border-b p-2">{historico.data}</td>
                                <td className="border-b p-2">{historico.local}</td>
                                <td className="border-b p-2">Data a definir</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between mt-5">
    <button 
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="text-black py-2 px-4 rounded hover:text-red-600 underline"
    >
        ← Página Anterior
    </button>
    <span className="text-center">
        Página {page} de {totalPages}
    </span>
    <button 
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="text-black py-2 px-4 rounded hover:text-red-600 underline"
    >
        Próxima Página →
    </button>
</div>

                {noMoreData && page > 1 && (
                    <p className="text-red-500 text-sm text-center mt-4">
                        Não há mais doações para carregar.
                    </p>
                )}

                <div className="text-center mt-5">
                    <button onClick={openModal} className="bg-red-600 text-cor10 py-2 px-4 rounded">
                        Adicionar Nova Doação
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-cor11 bg-opacity-40">
                    <div className="bg-cor10 rounded-lg shadow-lg p-5 max-w-md w-full relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Cadastrar</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="date" className="block mb-2">Data da doação:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="block w-full border-2 border-red-600 p-2 rounded mb-4"
                                required
                            />

                            <label htmlFor="local" className="block mb-2">Local:</label>
                            <input
                                type="text"
                                id="local"
                                name="local"
                                placeholder="Mario Gatti"
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}
                                className="block w-full border-2 border-red-600 p-2 rounded mb-4"
                                required
                            />

                            <button type="submit" className="bg-red-600 text-cor10 w-full py-2 rounded">Cadastrar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoricoDoacoes;