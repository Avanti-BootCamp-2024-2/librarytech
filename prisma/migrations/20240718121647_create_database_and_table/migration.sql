-- CreateTable
CREATE TABLE "avaliaceos" (
    "id" SERIAL NOT NULL,
    "troca_id" INTEGER,
    "avaliador_id" INTEGER,
    "avaliado_id" INTEGER,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "data_avaliacao" DATE NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hitorico_trocas" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "troca_id" INTEGER,

    CONSTRAINT "historico_trocas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livros" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "autor" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "usuario_id" INTEGER,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" SERIAL NOT NULL,
    "troca_id" INTEGER,
    "remetente_id" INTEGER,
    "destinatario_id" INTEGER,
    "conteudo" TEXT NOT NULL,
    "data_envio" DATE NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trocas" (
    "id" SERIAL NOT NULL,
    "solicitante_id" INTEGER,
    "receptor_id" INTEGER,
    "livro_solicitado_id" INTEGER,
    "livro_oferecido_id" INTEGER,
    "data_solicitacao" DATE NOT NULL,
    "data_conclusao" DATE,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "trocas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "reputacao" INTEGER DEFAULT 0,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "avaliaceos" ADD CONSTRAINT "avaliacoes_avaliado_id_fkey" FOREIGN KEY ("avaliado_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliaceos" ADD CONSTRAINT "avaliacoes_avaliador_id_fkey" FOREIGN KEY ("avaliador_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliaceos" ADD CONSTRAINT "avaliacoes_troca_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "trocas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hitorico_trocas" ADD CONSTRAINT "historico_trocas_troca_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "trocas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hitorico_trocas" ADD CONSTRAINT "historico_trocas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "livros_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_remetente_id_fkey" FOREIGN KEY ("remetente_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_troca_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "trocas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_livro_oferecido_id_fkey" FOREIGN KEY ("livro_oferecido_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_livro_solicitado_id_fkey" FOREIGN KEY ("livro_solicitado_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_solicitante_id_fkey" FOREIGN KEY ("solicitante_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
