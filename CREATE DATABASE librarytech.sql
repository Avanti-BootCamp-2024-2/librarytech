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
    usuario_id INTEGER REFERENCES Usuario(id)
);

CREATE TABLE trocas (
    id SERIAL PRIMARY KEY,
    solicitante_id INTEGER REFERENCES Usuario(id),
    receptor_id INTEGER REFERENCES Usuario(id),
    livro_solicitado_id INTEGER REFERENCES Livro(id),
    livro_oferecido_id INTEGER REFERENCES Livro(id),
    data_solicitacao DATE NOT NULL,
    data_conclusao DATE,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES Troca(id),
    avaliador_id INTEGER REFERENCES Usuario(id),
    avaliado_id INTEGER REFERENCES Usuario(id),
    nota INTEGER NOT NULL,
    comentario TEXT,
    data_avaliacao DATE NOT NULL
);

CREATE TABLE mensagens (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES Troca(id),
    remetente_id INTEGER REFERENCES Usuario(id),
    destinatario_id INTEGER REFERENCES Usuario(id),
    conteudo TEXT NOT NULL,
    data_envio DATE NOT NULL
);

CREATE TABLE historico_trocas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuario(id),
    troca_id INTEGER REFERENCES Troca(id)
);

