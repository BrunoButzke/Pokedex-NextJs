"use client"
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

const IndexPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [itens, setItens] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [genData, setGenData] = useState(1)
  const [error, setError] = useState();
  const [info, setInfo] = useState("Carregando...");
  const [link, setLink] = useState();

  const rangeGen = [[0,151],[151,100],[251,135],[386,107],[494,155]];
  const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offset,limit] = rangeGen[genData-1]
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar Pokémons');
        }
        const data = await response.json();
        setPokemonData(data.results);
        setItens(data.results);
        setCurrentIndex(0);
        setInfo("Talvez em outra geração");
        setLink(data.results[0].url)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [genData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLink(itens[currentIndex].url)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [currentIndex, itens]);

  function handleInput(e: { target: { value: any; }; }) {
    const inputValue = e.target.value; 
    setItens(searchTable(inputValue)); 
   }

  function searchTable(value: string) {
    const filteredData: never[] = [];
  
    if (value.length === 0) {
      return pokemonData; 
    }
   
    for (let i = 0; i < pokemonData.length; ++i) {
     const newValue = value.toLowerCase();
   
     const user = pokemonData[i].name.toLowerCase();
   
     if (user.includes(newValue)) {
       filteredData.push(pokemonData[i]);
     }
    }  
    return filteredData;
   }

  const handleNext = () => {
    setCurrentIndex((index) => (index === itens.length - 1 ? 0 : index + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((index) => (index === 0 ? itens.length - 1 : index - 1)); 
  };

  const renderItems = () => {
    return itens.slice(currentIndex - (currentIndex === 0 ? 0 : 1) , currentIndex + (currentIndex === 0 ? 3 : 2)).map((item, index) => {
      let fontSize = "text-xs";
      let cardSize = "w-52 h-9";
      if ((currentIndex == 0 && index == 0) || (currentIndex != 0 && index == 1)) {
        fontSize = "text-xl font-bold";
        cardSize = "w-60 h-11";
      }
      return (
        <div key={index} id={`item-${index}`} className={`py-2 my-1 bg-slate-100 text-center rounded-md  ${fontSize} ${cardSize}`}>
          {item.name}
        </div>
      );
    });
  };

  const renderButtons = () => {
    return [1,2,3,4,5].map((item) => {
      return (
        <button className={`mr-1 ${btnStyle} px-2 ${genData==item? "font-black": "font-light"}`} onClick={() => {setGenData(item); document.getElementById('filter')!.value='';}}>
          {item}
        </button>
      );
    });
  };

  return (
    <div className="bg-gradient-to-b from-cyan-500 to-white-500">
      <div className="flex flex-col items-center justify-center h-screen bg-center bg-no-repeat bg-[url('../public/pokedexAlt.png')]">
        <div className="relative bottom-0 right-5">
          <div className="h-40 w-60">
            <div className="flex flex-col justify-center items-center">
              {renderItems().length ? renderItems() : (error ?? info)}
            </div>
          </div>
          <div className="flex relative top-3 left-10">
            <input id="filter" className="px-2 w-52 border-2 border-gray-700 rounded-md" onChange={handleInput} placeholder="Filtre seus pokémons"/>
          </div>
          <div>
            <button className={`${btnStyle} py-2 px-4 w-52 float-right relative top-16 right-3`}>
              <Link href={{
                  pathname: '/pokeInfo',
                  query: { pokeData: link},
                }}>
                  Mais Informações
              </Link>
            </button>
          </div>
          <div className="flex relative top-28 left-6">
            <button className={`mr-2 ${btnStyle} py-2 px-4`} onClick={handlePrevious}>
              Anterior
            </button>
            <button className={`${btnStyle} py-2 px-4`} onClick={handleNext}>
              Próximo
            </button>
          </div>
          <div className="flex relative top-36 left-4 mt-2 w-40 mx-auto pb-2">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
