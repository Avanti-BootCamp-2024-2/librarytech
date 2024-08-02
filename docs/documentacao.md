# Documentação do Projeto de Troca de Livros

## Visão Geral
Este projeto é uma aplicação para troca de livros entre usuários. Utiliza o PrismaJS para interações com o banco de dados e JWT para autenticação. A aplicação é construída usando Node.js e Express.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/Avanti-BootCamp-2024-2/librarytech.git
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o Prisma:
    ```bash
    npx prisma init
    ```

4. Configure o arquivo `.env` com suas credenciais do banco de dados.

5. Execute as migrações do Prisma:
    ```bash
    npx prisma migrate dev
    ```

6. Inicie o servidor:
    ```bash
    npm start
    ```

## Estrutura de Pastas
```bash
/project-root  
├── /node_modules  
├── /prisma  
│ ├── schema.prisma  
├── /src  
│ ├── /controladores  
│ │ ├── login.js  
│ │ ├── livros.js  
│ │ ├── mensagem.js  
│ │ ├── post.js  
│ │ ├── trocas.js  
│ │ ├── usuarios.js  
│ ├── /intermediarios  
│ │ ├── autenticacao.js  
│ ├── /servicos  
│ │ ├── crypts.js  
│ │ ├── historicoTroca.js  
│ ├── /validacoes  
│ │ ├── usuario.js  
│ ├── app.js  
│ ├── routes.js  
├── package.json  
└── .env
```
## Endpoints

### Autenticação  

- Login

    - `POST /login`  
    - Request Body:  

        ```JSON
        {  
            "email": "usuario@example.com",
            "senha": "senha"
        }
        ```

      

    - Response:  

        ```JSON
        {        {
            "mensagem": "Usuário removido com sucesso!"
        }
            "usuario": {
                "id": 1,
                "nome": "Usuario",
                "email": "usuario@example.com"
            },
            "token": "jwt_token"
        }
        ```

### Usuários

- Listar Usuários  

    - `GET /usuarios`
    - Headers: Authorization: Bearer <token>  
    - Response:

        ```JSON
        [
            {
                "id": 1,
                "nome": "Usuario",
                "email": "usuario@example.com"
            }
        ]
        ```
- Criar Usuário

    - `POST /usuario`
    - Request Body:
        ```JSON
        {
            "nome": "Usuario",
            "email": "usuario@example.com",
            "senha": "senha"
        }
        ```
    - Response:
        ```JSON
            {
                "mensagem": "Usuário cadastrado com sucesso!"
            }
        ```
- Editar Usuário

    - `PUT /usuario/:id`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```JSON
        {
            "nome": "Usuario",
            "senha": "nova_senha"
        }
        ```

    - Response:
        ```JSON
        {
            "mensagem": "Usuário atualizado com sucesso!"
        }
        ```

- Remover Usuário

    - `DELETE /usuario/:id`
    - Headers: Authorization: Bearer <token>
    - Response:
        ```JSON
        {
            "mensagem": "Usuário removido com sucesso!"
        }
        ```

### Livros

- Listar Livros

    - `GET /livros`
    - Response:
        ```JSON
        [
            {
                "id": 1,
                "titulo": "Livro Exemplo",
                "autor": "Autor Exemplo",
                "descricao": "Descrição do Livro",
                "usuario_id": 1
            }
        ]
        ```
- Criar Livro

    - `POST /livro`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```json

        {
            "titulo": "Novo Livro",
            "autor": "Novo Autor",
            "descricao": "Descrição do Novo Livro",
            "usuarioId": 1
        }
        ```
    - Response:
        ```json
        {
            "id": 2,
            "titulo": "Novo Livro",
            "autor": "Novo Autor",
            "descricao": "Descrição do Novo Livro",
            "usuario_id": 1
        }
        ```
- Editar Livro

    - `PUT /livro/:id`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```json
        {
            "titulo": "Livro Atualizado",
            "autor": "Autor Atualizado",
            "descricao": "Descrição Atualizada"
        }
        ```
    - Response:
        ```json

        {
            "mensagem": "Livro atualizado com sucesso!"
        }
        ```
    - Remover Livro

        - DELETE /livro/:id
        - Headers: Authorization: Bearer <token>
        - Response:
        ```json
        {
                "mensagem": "Livro removido com sucesso!"
        }
        ```
### Trocas

- Listar Trocas

    - `GET /trocas`
    - Headers: Authorization: Bearer <token>
    - Response:
        ```json
        [
            {
                "id": 1,
                "solicitante_id": 1,
                "receptor_id": 2,
                "livro_solicitado_id": 1,
                "livro_oferecido_id": 2,
                "data_solicitacao": "2024-08-02T00:00:00.000Z",
                "status": "pendente"
            }
        ]
        ```
- Criar Troca

    - `POST /troca`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```json
        {
        "solicitanteId": 1,
        "receptorId": 2,
        "livroSolicitadoId": 1,
        "livroOferecidoId": 2,
        "status": "pendente"
        }
        ```
    - Response:
        ```json
        {
            "id": 2,
            "solicitante_id": 1,
            "receptor_id": 2,
            "livro_solicitado_id": 1,
            "livro_oferecido_id": 2,
            "data_solicitacao": "2024-08-02T00:00:00.000Z",
            "status": "pendente"
        }
        ```
- Concluir Troca

    - `PUT /troca`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```json
        {
            "troca_id": 1,
            "solicitante_id": 1,
            "receptor_id": 2,
            "livro_solicitado_id": 1,
            "livro_oferecido_id": 2,
            "data_conclusao": "2024-08-02T00:00:00.000Z",
            "status": "concluída"
        }
        ```
    - Response:
        ```json
        {
            "mensagem": "Troca concluída com sucesso!"
        }
        ```
### Mensagens

- Listar Mensagens
    - `GET /mensagem`
    - Headers: Authorization: Bearer <token>
    - Response:
        ```json
        [
            {
                "id": 1,
                "troca_id": 1,
                "remetente_id": 1,
                "destinatario_id": 2,
                "conteudo": "Mensagem Exemplo",
                "data_envio": "2024-08-02T00:00:00.000Z"
            }
        ]
        ```
- Mensagens por Destinatário

    - `GET /mensagem/:id`
    - Headers: Authorization: Bearer <token>
    - Response:  
        ```json
        [
            {
                "id": 1,
                "troca_id": 1,
                "remetente_id": 1,
                "destinatario_id": 2,
                "conteudo": "Mensagem Exemplo",
                "data_envio": "2024-08-02T00:00:00.000Z"
            }
        ]
        ```
- Criar Mensagem

    - `POST /mensagem`
    - Headers: Authorization: Bearer <token>
    - Request Body:
        ```json
        {
            "troca_id": 1,
            "remetente_id": 1,
            "destinatario_id": 2,
            "conteudo": "Nova Mensagem",
            "data_envio": "2024-08-02T00:00:00.000Z"
        }
        ```
    - Response:
        ```json
        {
            "id": 2,
            "troca_id": 1,
            "remetente_id": 1,
            "destinatario_id": 2,
            "conteudo": "Nova Mensagem",
            "data_envio": "2024-08-02T00:00:00.000Z"
        }
        ```