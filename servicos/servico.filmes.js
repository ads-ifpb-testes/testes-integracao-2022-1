import { RepositorioFilmes } from "../repositorio/repositorio.filmes";

export class ServicoFilmes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  async inserirFilme(...filmes) {
    for (const filme of filmes) {
      if (filme && "nome" in filme && "ano" in filme) {
        const anoCorrente = new Date().getFullYear();
        if (filme.ano > anoCorrente) throw Error();
        const filmeExiste = await this.repositorio.consultar(filme);
        if (filmeExiste) {
          throw Error();
        }
        this.repositorio.inserir(filme);
      } else {
        throw Error();
      }
    }
    return this.repositorio.getQtdeFilmes();
  }

  async getQtdeFilmes() {
    return this.repositorio.getQtdeFilmes();
  }
}
