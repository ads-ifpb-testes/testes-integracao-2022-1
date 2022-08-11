import Knex from "knex";
import { RepositorioFilmes } from "../repositorio/repositorio.filmes";
import { ServicoFilmes } from "./servico.filmes";
import { PostgreSqlContainer } from "testcontainers";

describe("Inserir filmes", () => {
  let knex;
  let servicoFilmes;
  let repositorioFilmes;
  let container;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    knex = Knex({
      client: "pg",
      connection: {
        host: container.getHost(),
        port: container.getPort(),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
      },
    });
    await knex.migrate.latest();
    await knex.seed.run();
    repositorioFilmes = new RepositorioFilmes(knex);
    servicoFilmes = new ServicoFilmes(repositorioFilmes);
  });

  test("Deve permitir inserir um filme", async () => {
    const { count: qtdeFilmesExistentes } = await servicoFilmes.getQtdeFilmes();
    const novoFilme = { nome: "As tranças do Rei Careca", ano: 2002 };
    const { count: resultado } = await servicoFilmes.inserirFilme(novoFilme);
    expect(parseInt(resultado)).toBe(parseInt(qtdeFilmesExistentes) + 1);
  });

  afterAll(async () => {
    await knex.destroy();
    await container.stop();
  });
});
