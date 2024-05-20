"use client"

import { useRef, useEffect, useState } from 'react';


const IndexPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [items, setItens] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const [genData, setGenData] = useState(1)
  const [error, setError] = useState(null);

  const rangeGen = [[0,151],[151,100],[251,135],[386,107],[494,155]];

  let btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offset,limit] = rangeGen[genData-1]
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do Pokémon');
        }
        const data = await response.json();
        setPokemonData(data);
        setItens(data.results)
        setCurrentIndex(0)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [genData]);

  function handleInput(e) {
    const inputValue = e.target.value; 
    setItens(searchTable(inputValue));  
   }

  function searchTable(value) {
    const filteredData = [];
  
    if (value.length === 0) {
      return pokemonData.results; 
    }
   
    for (let i = 0; i < pokemonData.results.length; ++i) {
     const newValue = value.toLowerCase();
   
     const user = pokemonData.results[i].name.toLowerCase();
   
     if (user.includes(newValue)) {
       filteredData.push(pokemonData.results[i]);
     }
    }
    return filteredData;
   }
   

  const handleNext = () => {
    setCurrentIndex((index) => (index === items.length - 1 ? 0 : index + 1)); 
  };

  const handlePrevious = () => {
    setCurrentIndex((index) => (index === 0 ? items.length - 1 : index - 1)); 
  };

  const renderItems = () => {
    return items.slice(currentIndex - (currentIndex === 0 ? 0 : 1) , currentIndex + (currentIndex === 0 ? 3 : 2)).map((item, index) => {
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
        <button className={`mr-1 ${btnStyle} px-2 ${genData==item? "font-black": "font-light"}`} onClick={() => setGenData(item)}>
          {item}
        </button>
      );
    });
  };

  return (
    <div className="bg-gradient-to-b from-cyan-500 to-white-500">
      <div className="flex flex-col items-center justify-center h-screen bg-center bg-no-repeat bg-[url('../public/pokedexAlt.png')] min-h-96 min-w-96">
        <div className="relative right-5">
          <div className="h-40 w-60">
            <div className="flex flex-col justify-center items-center">
              {renderItems().length ? renderItems() : (error ?? <p>Talvez em outra geração</p>)}
            </div>
          </div>
          <div className="flex relative top-3 left-10">
            <input className="px-2 w-52 border-2 border-gray-700 rounded-md" onChange={handleInput} placeholder="Filtre seus pokémons"/>
          </div>
          <div className="flex relative top-40 left-5">
            <button className={`mr-4 ${btnStyle} py-2 px-4`} onClick={handlePrevious}>
              Anterior
            </button>
            <button className={`${btnStyle} py-2 px-4`} onClick={handleNext}>
              Próximo
            </button>
          </div>
          <div className="flex relative top-40 left-3.5 mt-3 w-40 mx-auto pb-2">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
