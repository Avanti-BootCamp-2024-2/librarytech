CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    reputacao INTEGER DEFAULT 0
);

CREATE TABLE livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    descricao TEXT,
    usuario_id INTEGER REFERENCES usuario(id)
);

CREATE TABLE troca (
    id SERIAL PRIMARY KEY,
    solicitante_id INTEGER REFERENCES usuario(id),
    receptor_id INTEGER REFERENCES usuario(id),
    livro_solicitado_id INTEGER REFERENCES livro(id),
    livro_oferecido_id INTEGER REFERENCES livro(id),
    data_solicitacao DATE NOT NULL,
    data_conclusao DATE,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE avaliacao (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES troca(id),
    avaliador_id INTEGER REFERENCES usuario(id),
    avaliado_id INTEGER REFERENCES usuario(id),
    nota INTEGER NOT NULL,
    comentario TEXT,
    data_avaliacao DATE NOT NULL
);

CREATE TABLE mensagem (
    id SERIAL PRIMARY KEY,
    troca_id INTEGER REFERENCES troca(id),
    remetente_id INTEGER REFERENCES usuario(id),
    destinatario_id INTEGER REFERENCES usuario(id),
    conteudo TEXT NOT NULL,
    data_envio DATE NOT NULL
);

CREATE TABLE historico_troca (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    troca_id INTEGER REFERENCES troca(id)
);

