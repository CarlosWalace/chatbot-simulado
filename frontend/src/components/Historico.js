import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Componente para exibir o histórico completo de mensagens
 * - Mostra TODAS as mensagens salvas de um usuário
 * - Busca dados do backend sempre que o usuário muda
 * Props:
 * - usuarioAtivo: string "A" ou "B"
 */
function Historico({ usuarioAtivo }) {
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // useEffect: executa código quando o componente carrega ou quando usuarioAtivo muda
    useEffect(() => {
        buscarHistorico();
    }, [usuarioAtivo]); // Array de dependências: executa quando usuarioAtivo muda

    const buscarHistorico = async () => {
        setCarregando(true);
        try {
            // Faz requisição GET para buscar histórico
            const response = await axios.get(
                `http://localhost:8000/api/historico/${usuarioAtivo}/`
            );
            setHistorico(response.data);
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            alert('Erro ao carregar histórico. Verifique se o backend está rodando.');
        } finally {
            setCarregando(false);
        }
    };

    if (carregando) {
        return <div style={styles.carregando}>Carregando histórico...</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.titulo}>Histórico - Usuário {usuarioAtivo}</h2>

            <button onClick={buscarHistorico} style={styles.botaoAtualizar}>
                🔄 Atualizar Histórico
            </button>

            {historico.length === 0 ? (
                <p style={styles.mensagemVazia}>
                    Nenhuma mensagem encontrada para o Usuário {usuarioAtivo}.
                </p>
            ) : (
                <div style={styles.listaHistorico}>
                    {historico.map((item) => (
                        <div key={item.id} style={styles.itemHistorico}>
                            <div style={styles.cabecalho}>
                                <strong>Mensagem #{item.id}</strong>
                                <span style={styles.data}>
                                    {new Date(item.timestamp).toLocaleString('pt-BR')}
                                </span>
                            </div>

                            <div style={styles.conteudoMensagem}>
                                <div style={styles.pergunta}>
                                    <strong>Pergunta:</strong>
                                    <p>{item.conteudo}</p>
                                </div>
                                <div style={styles.resposta}>
                                    <strong>Resposta:</strong>
                                    <p>{item.resposta}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.resumo}>
                <strong>Total de mensagens:</strong> {historico.length}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    titulo: {
        margin: '0 0 20px 0',
        color: '#333',
        borderBottom: '2px solid #28a745',
        paddingBottom: '10px',
    },
    botaoAtualizar: {
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    carregando: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#666',
    },
    mensagemVazia: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        padding: '40px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
    },
    listaHistorico: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    itemHistorico: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        backgroundColor: '#fafafa',
    },
    cabecalho: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
    },
    data: {
        fontSize: '12px',
        color: '#999',
    },
    conteudoMensagem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    pergunta: {
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '5px',
        borderLeft: '3px solid #007bff',
    },
    resposta: {
        padding: '10px',
        backgroundColor: '#f1f8e9',
        borderRadius: '5px',
        borderLeft: '3px solid #4caf50',
    },
    resumo: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        textAlign: 'center',
        fontSize: '14px',
    },
};

export default Historico;