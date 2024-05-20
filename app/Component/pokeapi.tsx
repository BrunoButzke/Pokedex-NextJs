
import { useEffect, useState } from 'react';

const pokeApi = (setItens) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do Pokémon');
        }
        const data = await response.json();
        setPokemonData(data);
        setItens(data)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  
  return pokemonData!.results
};

export default pokeApi;
