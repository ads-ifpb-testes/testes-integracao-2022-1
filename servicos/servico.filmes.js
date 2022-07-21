import repositorio from "../repositorio/repositorio.filmes";

const inserirFilme = (...filmes) => {
  filmes.forEach((filme) => {
    if (filme && "nome" in filme && "ano" in filme) {
      const anoCorrente = new Date().getFullYear();
      if (filme.ano > anoCorrente) throw Error();
      if (repositorio.verificarFilme(filme)) {
        throw Error();
      }
      repositorio.inserir(filme);
    } else {
      throw Error();
    }
  });
  return repositorio.getQtdeFilmes();
};

export { inserirFilme };
