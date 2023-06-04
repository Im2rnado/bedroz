import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import conf from "../config";

import PosterOptions from "../types/PosterOptions";

import PosterSection from "../components/PosterSection";

import Error from "./Error";
import Loading from "./Loading";
import { Helmet } from "react-helmet";

interface Hero{
  id: number|string;
  backdrop: string;
  logo: string;
}

interface Collection{
  title: string;
  data: PosterOptions[]
}

export default function Index(){
  const [error, setError] = useState<string>();
  const [hero, setHero] = useState<Hero>();
  const [collections, setCollections] = useState<Collection[]>();

  async function loadData(){
    const req = await fetch("https://raw.githubusercontent.com/Im2rnado/bedroz/main/api.json");
    const res = await req.json();

    if(!res.success){
      setError("Unable to load server data");
      return;
    }

    const data = res;

    setHero(data['hero']);
    setCollections(data['collections']);
  }

  useEffect(() => {
    loadData();
  }, []);

  if(error){
    return <Error message={error} />
  }

  if(!hero || !collections || !collections.length){
    return <Loading />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>{conf.SITE_TITLE}</title>
      </Helmet>

       <div className='home-alert-wrap'>
        <div className='home-alert'>
            <center><p>Support us by sharing Bedroz.lol with friends and family! Made with ❤️ by Bedro</p></center>
        </div>
      </div>

      <div className='hero-container'>
        <Link className='hero' to={`/movie/${hero.id}`} style={{backgroundImage: `url('${hero.backdrop}')`}}>
          <img className='logo' src={hero.logo} draggable="false" />
        </Link>
      </div>

      {
        collections.map((v:Collection, i) => {
          return <PosterSection key={i} title={v.title} posters={v.data} />;
        })
      }
    </Fragment>
  )
}