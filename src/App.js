import React, { useEffect, useState } from "react";
import './App.css' ;
import Tmdb from './Tmdb';
import MovieRow from "./components/MovieRow";
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setfeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const LoadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // PEGANDO O FEATURED
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setfeaturedData(chosenInfo);
    }

     LoadAll(); 
  }, []);

  useEffect (()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener ('scroll', scrollListener)
    return  () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
          <footer>
            Feito com <span role="img" aria-aria-label="coração">❤️</span> por Jéssica Xavier <br/>
            Direitos de imagem para Netflix <br/>
            Dados pegos do site Themoviedb.org
          </footer>
    </div>
  );
}