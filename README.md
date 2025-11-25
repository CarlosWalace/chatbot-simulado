# 💬 Chatbot Simulado

Sistema fullstack de chat com histórico separado por usuário, desenvolvido para o desafio técnico 4Blue.

## 📋 Sobre o Projeto

Este projeto implementa um sistema de chat simulado onde:
- Usuários podem alternar entre dois perfis (A e B) sem autenticação real
- Cada mensagem enviada recebe uma resposta automática personalizada
- O histórico de mensagens é separado por usuário
- API RESTful com Django

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.11+**
- **Django 5.0** - Framework web
- **Django REST Framework** - Criação de APIs
- **django-cors-headers** - Gerenciamento de CORS
- **SQLite** - Banco de dados

### Frontend
- **React 18** - Biblioteca JavaScript
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Python 3.11 ou superior ([Download](https://www.python.org/downloads/))
- Node.js 18 ou superior ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### Passo 1: Clonar o repositório
```bash
git clone <url-do-seu-repositorio>
cd chatbot-simulado
```

### Passo 2: Configurar o Backend

#### 2.1 Criar e ativar ambiente virtual

**Windows:**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Instalar dependências
```bash
pip install django djangorestframework django-cors-headers
```

#### 2.3 Aplicar migrações
```bash
python manage.py migrate
```

#### 2.4 Iniciar o servidor
```bash
python manage.py runserver
```

O backend estará rodando em: **http://localhost:8000**

### Passo 3: Configurar o Frontend

**Abra um novo terminal** (mantenha o backend rodando)

#### 3.1 Navegar para a pasta frontend
```bash
cd frontend
```

#### 3.2 Instalar dependências
```bash
npm install
```

#### 3.3 Iniciar o servidor de desenvolvimento
```bash
npm start
```

O frontend abrirá automaticamente em: **http://localhost:3000**

## 📖 Como Usar

### 1. Selecionar Usuário
- Use os botões na parte superior para alternar entre "Usuário A" e "Usuário B"
- O usuário ativo é exibido abaixo dos botões

### 2. Enviar Mensagens (Aba Chat)
- Digite sua mensagem no campo de texto
- Clique em "Enviar" ou pressione Enter
- A resposta automática aparecerá imediatamente
- As mensagens ficam salvas no banco de dados

### 3. Ver Histórico (Aba Histórico)
- Clique na aba "📋 Histórico"
- Veja todas as mensagens do usuário ativo
- Troque de usuário para ver históricos diferentes
- Use o botão "🔄 Atualizar" para recarregar


**Endpoints:**
- `POST /api/mensagens/` - Criar nova mensagem
- `GET /api/historico/<usuario>/` - Buscar histórico

### CORS

Configurado para permitir requisições do `localhost:3000`.
