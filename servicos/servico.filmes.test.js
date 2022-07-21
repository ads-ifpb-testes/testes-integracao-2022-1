import { inserirFilme, limpar } from "./servico.filmes";
import repositorio from "../repositorio/repositorio.filmes";

jest.mock("../repositorio/repositorio.filmes", () => ({
  inserir: jest.fn(),
  getQtdeFilmes: jest.fn().mockReturnValue(0),
  verificarFilme: jest.fn().mockReturnValue(false),
}));

describe("Inserir filmes", () => {
  test("Deve permitir inserir um filme", () => {
    repositorio.getQtdeFilmes.mockReturnValue(1);
    const resultado = inserirFilme({
      nome: "As tranças do Rei Careca",
      ano: 2002,
    });
    expect(resultado).toBe(1);
  });

  test("Não deve permitir um filme vazio", () => {
    const filme = {};

    expect(() => {
      const resultado = inserirFilme(filme);
    }).toThrow();
  });

  test("Deve permitir inserir vários filmes", () => {
    const filme1 = {
      nome: "As Branquelas",
      ano: 2004,
    };
    const filme2 = {
      nome: "Top Gun",
      ano: 1986,
    };
    repositorio.getQtdeFilmes.mockReturnValue(2);
    const resultado = inserirFilme(filme1, filme2);
    expect(resultado).toBe(2);
  });

  test("Não deve permitir filmes ainda não lançados", () => {
    expect(() => {
      inserirFilme({
        nome: "John Wick",
        ano: 2023,
      });
    }).toThrow();
  });

  test("Não deve permitir filmes duplicados", () => {
    repositorio.verificarFilme.mockReturnValue(true);
    expect(() => {
      inserirFilme({
        nome: "Piratas do Caribe",
        ano: 2003,
      });
    }).toThrow();
  });
});
