# Plataforma de Troca de Livros

Este projeto é uma plataforma para facilitar a troca de livros entre usuários. A plataforma permite que os usuários registrem-se, façam login, listem seus livros para troca, busquem livros de interesse, solicitem trocas e gerenciem essas trocas. Além disso, a plataforma inclui funcionalidades para avaliações, mensagens privadas, histórico de trocas e perfis de usuário.

## Funcionalidades Principais

- **Cadastro de Usuários**: Permitir que novos membros se registrem na plataforma e criem um perfil.
- **Login e Autenticação**: Garantir que apenas usuários autenticados possam acessar determinadas funcionalidades.
- **Listagem de Livros**: Permitir que os usuários listem os livros que possuem e desejam trocar.
- **Busca de Livros**: Proporcionar uma ferramenta de busca para encontrar livros disponíveis para troca.
- **Solicitação de Troca**: Permitir que os usuários solicitem trocas de livros com outros membros.
- **Gerenciamento de Trocas**: Facilitar o acompanhamento e gerenciamento das solicitações de troca.
- **Sistema de Avaliações e Reputação**: Implementar um sistema onde os usuários possam avaliar uns aos outros e construir uma reputação baseada em trocas anteriores.
- **Mensagens Privadas**: Permitir que os usuários se comuniquem diretamente para negociar os detalhes das trocas.
- **Histórico de Trocas**: Manter um registro de todas as trocas realizadas pelos usuários.
- **Perfil do Usuário**: Permitir que os usuários editem seu perfil e visualizem suas atividades na plataforma.

## Funcionalidades Adicionais

- **Recomendações de Livros**: Sugestões de livros com base nas preferências e histórico de trocas dos usuários.
- **Blog/Forum**: Espaço para os usuários compartilharem resenhas de livros e discutirem temas literários.
- **Eventos e Encontros**: Ferramenta para organizar eventos e encontros entre os membros da comunidade.

## Diagrama Entidade-Relacionamento (DER)

### Principais Entidades e Relacionamentos

#### Usuário
- `id` (PK)
- `nome`
- `email`
- `senha`
- `reputação`

#### Livro
- `id` (PK)
- `título`
- `autor`
- `descrição`
- `usuário_id` (FK)

#### Troca
- `id` (PK)
- `solicitante_id` (FK)
- `receptor_id` (FK)
- `livro_solicitado_id` (FK)
- `livro_oferecido_id` (FK)
- `data_solicitação`
- `data_conclusão`
- `status`

#### Avaliação
- `id` (PK)
- `troca_id` (FK)
- `avaliador_id` (FK)
- `avaliado_id` (FK)
- `nota`
- `comentário`
- `data_avaliacao`

#### Mensagem
- `id` (PK)
- `troca_id` (FK)
- `remetente_id` (FK)
- `destinatário_id` (FK)
- `conteúdo`
- `data_envio`

#### Histórico_Troca
- `id` (PK)
- `usuario_id` (FK)
- `troca_id` (FK)

## Modelagem do Banco de Dados no PostgreSQL.

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    reputacao INTEGER DEFAULT 0
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    descricao TEXT,
    usuario_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE trocas (
    id SERIAL PRIMARY KEY,
    solicitante_id INTEGER REFERENCES usuarios(id),
    receptor_id INTEGER REFERENCES usuarios(id),
    livro_solicitado_id INTEGER REFERENCES livros(id),
    livro_oferecido_id INTEGER REFERENCES livros(id),
    data_solicitacao DATE NOT NULL,
    data_conclusao DATE,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES trocas(id),
    avaliador_id INTEGER REFERENCES usuarios(id),
    avaliado_id INTEGER REFERENCES usuarios(id),
    nota INTEGER NOT NULL,
    comentario TEXT,
    data_avaliacao DATE NOT NULL
);

CREATE TABLE mensagens (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES trocas(id),
    remetente_id INTEGER REFERENCES usuarios(id),
    destinatario_id INTEGER REFERENCES usuarios(id),
    conteudo TEXT NOT NULL,
    data_envio DATE NOT NULL
);

CREATE TABLE historico_trocas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    troca_id INTEGER REFERENCES trocas(id)
);
