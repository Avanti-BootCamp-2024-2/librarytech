-- Usuário
INSERT INTO Usuario (nome, email, senha, reputacao) VALUES
('Alice', 'alice@example.com', 'senha123', 5),
('Bob', 'bob@example.com', 'senha456', 3),
('Charlie', 'charlie@example.com', 'senha789', 4);

-- Livro
INSERT INTO Livro (titulo, autor, descricao, usuario_id) VALUES
('1984', 'George Orwell', 'Distopia futurista', 1),
('To Kill a Mockingbird', 'Harper Lee', 'Romance sobre justiça e racismo', 2),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Clássico da literatura americana', 3);

-- Troca
INSERT INTO Troca (solicitante_id, receptor_id, livro_solicitado_id, livro_oferecido_id, data_solicitacao, data_conclusao, status) VALUES
(1, 2, 2, 1, '2024-07-01', '2024-07-05', 'concluída'),
(3, 1, 1, 3, '2024-07-03', NULL, 'pendente');

-- Avaliação
INSERT INTO Avaliacao (troca_id, avaliador_id, avaliado_id, nota, comentario, data_avaliacao) VALUES
(1, 1, 2, 4, 'Troca rápida e eficiente', '2024-07-06'),
(1, 2, 1, 5, 'Livro em excelente estado', '2024-07-06');

-- Mensagem
INSERT INTO Mensagem (troca_id, remetente_id, destinatario_id, conteudo, data_envio) VALUES
(1, 1, 2, 'Gostaria de trocar o livro 1984 pelo seu To Kill a Mockingbird', '2024-07-01'),
(1, 2, 1, 'Perfeito, podemos fazer a troca amanhã', '2024-07-02');

-- Histórico_Troca
INSERT INTO Historico_Troca (usuario_id, troca_id) VALUES
(1, 1),
(2, 1),
(3, 2);
