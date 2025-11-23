import React, { useState } from 'react';
import SeletorUsuario from './components/SeletorUsuario';
import Chat from './components/Chat';
import Historico from './components/Historico';
import './App.css';

/**
 * Componente principal da aplicação
 * - Gerencia o estado global (usuário ativo e página atual)
 * - Coordena a navegação entre Chat e Histórico
 * - Mantém o SeletorUsuario sempre visível
 */
function App() {
  const [usuarioAtivo, setUsuarioAtivo] = useState('A'); // Estado: usuário selecionado
  const [paginaAtual, setPaginaAtual] = useState('chat'); // Estado: página sendo exibida

  return (
    <div className="App">
      <header className="App-header">
        <h1>💬 Chatbot Simulado</h1>
        <p>Sistema de chat com histórico por usuário</p>
      </header>

      <main className="App-main">
        {/* Seletor de Usuário - sempre visível */}
        <SeletorUsuario
          usuarioAtivo={usuarioAtivo}
          setUsuarioAtivo={setUsuarioAtivo}
        />

        {/* Navegação entre páginas */}
        <nav className="App-nav">
          <button
            onClick={() => setPaginaAtual('chat')}
            className={paginaAtual === 'chat' ? 'ativo' : ''}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setPaginaAtual('historico')}
            className={paginaAtual === 'historico' ? 'ativo' : ''}
          >
            📋 Histórico
          </button>
        </nav>

        {/* Renderização condicional: mostra Chat OU Histórico */}
        {paginaAtual === 'chat' ? (
          <Chat usuarioAtivo={usuarioAtivo} />
        ) : (
          <Historico usuarioAtivo={usuarioAtivo} />
        )}
      </main>

      <footer className="App-footer">
        <p>Sistema de Chat Simulado © 2025</p>
      </footer>
    </div>
  );
}

export default App;