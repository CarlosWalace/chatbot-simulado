import React, { useState } from 'react';
import axios from 'axios';

/**
 * Componente principal do Chat
 * - Interface para digitar e enviar mensagens
 * - Exibe o histórico da conversa atual
 * Props:
 * - usuarioAtivo: string "A" ou "B"
 */

function Chat({ usuarioAtivo }) {
    const [mensagem, setMensagem] = useState('');
    const [conversas, setConversas] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const enviarMensagem = async () => {
        if (!mensagem.trim()) {
            alert('Digite uma mensagem antes de enviar!');
            return;
        }

        setCarregando(true);

        try {
            // Faz requisição POST para o backend
            const response = await axios.post('http://localhost:8000/api/mensagens/', {
                usuario: usuarioAtivo,
                conteudo: mensagem,
            });

            // Adiciona a nova conversa ao estado
            setConversas([...conversas, response.data]);
            setMensagem(''); // Limpa o campo de input
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Verifique se o backend está rodando.');
        } finally {
            setCarregando(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.titulo}>Chat - Usuário {usuarioAtivo}</h2>

            {/* Área de mensagens */}
            <div style={styles.areaConversa}>
                {conversas.map((conversa, index) => (
                    <div key={index} style={styles.blocoConversa}>
                        {/* Mensagem do usuário */}
                        <div style={styles.mensagemUsuario}>
                            <strong>Você:</strong> {conversa.conteudo}
                        </div>
                        {/* Resposta do sistema */}
                        <div style={styles.mensagemSistema}>
                            <strong>Sistema:</strong> {conversa.resposta}
                        </div>
                        <small style={styles.timestamp}>
                            {new Date(conversa.timestamp).toLocaleString('pt-BR')}
                        </small>
                    </div>
                ))}
            </div>

            {/* Campo de input */}
            <div style={styles.areaInput}>
                <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    style={styles.textarea}
                    rows="3"
                    disabled={carregando}
                />
                <button
                    onClick={enviarMensagem}
                    disabled={carregando}
                    style={{
                        ...styles.botaoEnviar,
                        ...(carregando ? styles.botaoDesabilitado : {})
                    }}
                >
                    {carregando ? 'Enviando...' : 'Enviar'}
                </button>
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
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px',
    },
    areaConversa: {
        minHeight: '400px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
    },
    mensagemVazia: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
    },
    blocoConversa: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    mensagemUsuario: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '5px',
        borderLeft: '3px solid #007bff',
    },
    mensagemSistema: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f1f8e9',
        borderRadius: '5px',
        borderLeft: '3px solid #4caf50',
    },
    timestamp: {
        color: '#999',
        fontSize: '12px',
    },
    areaInput: {
        display: 'flex',
        gap: '10px',
    },
    textarea: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        resize: 'none',
    },
    botaoEnviar: {
        padding: '10px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    botaoDesabilitado: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
};

export default Chat;