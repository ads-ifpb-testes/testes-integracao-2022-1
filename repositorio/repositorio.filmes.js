import Knex from "knex";

export class RepositorioFilmes {
  constructor(knex) {
    this.knex = knex;
  }

  async inserir(filme) {
    return this.knex("filme").insert(filme);
  }

  async getQtdeFilmes() {
    return this.knex.from("filme").count().first();
  }

  async consultar(filme) {
    return this.knex
      .from("filme")
      .where("nome", filme.nome)
      .where("ano", filme.ano)
      .first();
  }
}
