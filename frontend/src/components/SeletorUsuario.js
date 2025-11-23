import React from 'react';

/**
 Componente para seleção de Usuários A ou B
 */
function SeletorUsuario({ usuarioAtivo, setUsuarioAtivo }) {
    return (
        <div style={styles.container}>
            <h3 style={styles.titulo}>Selecione o Usuário:</h3>
            <div style={styles.botoes}>
                <button
                    onClick={() => setUsuarioAtivo('A')}
                    style={{
                        ...styles.botao,
                        ...(usuarioAtivo === 'A' ? styles.botaoAtivo : {})
                    }}
                >
                    Usuário A
                </button>
                <button
                    onClick={() => setUsuarioAtivo('B')}
                    style={{
                        ...styles.botao,
                        ...(usuarioAtivo === 'B' ? styles.botaoAtivo : {})
                    }}
                >
                    Usuário B
                </button>
            </div>
            <p style={styles.usuarioAtual}>
                <strong>Usuário ativo:</strong> {usuarioAtivo}
            </p>
        </div>
    );
}

// Estilos inline para simplicidade
const styles = {
    container: {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    titulo: {
        margin: '0 0 15px 0',
        color: '#333',
    },
    botoes: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
    },
    botao: {
        padding: '10px 20px',
        border: '2px solid #ddd',
        borderRadius: '5px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.3s',
    },
    botaoAtivo: {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff',
    },
    usuarioAtual: {
        margin: '0',
        fontSize: '14px',
        color: '#666',
    },
};

export default SeletorUsuario;