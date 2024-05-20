"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const IndexPage = (params: any) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(true)

  const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
  const divStyle = "bg-gray-200 relative top-28 right-5 border-2 border-gray-700 rounded-lg mb-2 px-2 py-0.5"
  const msg = "Carregando..."

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${params.searchParams.pokeData}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do Pokémon');
        }
        const data = await response.json();
        setPokemonData(data);
        setImg(data.sprites.versions['generation-v']["black-white"].animated.front_default);
        setLoading(false)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-cyan-500 to-white-500">
      <div className="flex flex-col items-center justify-center h-screen bg-center bg-no-repeat bg-[url('../public/pokedex.png')]">
        <img className="h-28 relative top-8 right-5" src={img}/>
        <div className='relative top-20 right-5 text-2xl font-bold'>{pokemonData.name}</div>
        {loading  ? 
         <div className='relative top-12 right-5 text-xl font-bold'>{error ?? msg}</div>
        :
        <div>
          <div className='flex'>
            <div className={`w-28 ${divStyle} mr-8`}>Altura: {pokemonData.height}</div>
            <div className={`w-28 ${divStyle}`}>Peso: {pokemonData.weight}</div>
          </div>
          <div className={`w-64 ${divStyle}`}>Tipo(s): {pokemonData.types.map((item) => {return " " + item.type.name}).toString()}</div>
          <div className={`w-64 ${divStyle}`}>Habilidades: {pokemonData.abilities.map((item) => {return " " + item.ability.name}).toString()}</div>
          <button className={`w-64 h-8 relative top-28 right-5 ${btnStyle}`} >
            <Link href={'/'}>Voltar</Link> 
          </button>
        </div>  
        }   
      </div>
    </div>
  );
};

export default IndexPage;
