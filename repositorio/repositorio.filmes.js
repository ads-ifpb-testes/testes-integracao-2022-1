const repositorioFilmes = [];

const inserir = (filme) => {
  repositorioFilmes.push(filme);
};

const verificarFilme = (filme) => {
  return (
    repositorioFilmes.findIndex(
      (filmeBanco) =>
        filmeBanco.ano === filme.ano && filmeBanco.nome === filme.nome
    ) >= 0
  );
};

const getQtdeFilmes = () => repositorioFilmes.length;

export default { inserir, getQtdeFilmes, verificarFilme };
