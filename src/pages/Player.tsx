import { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom"

import conf from "../config";

export default function Player(){
  const { id } = useParams();
  const [s] = useSearchParams();

  const [loaded, setLoaded] = useState<boolean>(false);

  const [type, setType] = useState<"tv"|"movie">();

  const [season, setSeason] = useState<number>();
  const [episode, setEpisode] = useState<number>();

  const [maxSeasons, setMaxSeasons] = useState<number>();
  const [maxEpisodes, setMaxEpisodes] = useState<number>();

  function showNext(){
    if(!season || !episode || !maxSeasons || !maxEpisodes){
      return false;
    }

    if(season < maxSeasons || episode < maxEpisodes){
      return true;
    }

    return false;
  }

  function getNext(){
    if(!season || !episode || !maxSeasons || !maxEpisodes){
      return "";
    }

    if(episode < maxEpisodes){
      return `?s=${season}&e=${episode+1}&ms=${maxSeasons}&me=${maxEpisodes}`;
    }

    if(season < maxSeasons){
      return `?s=${season+1}&e=1&ms=${maxSeasons}&me=${maxEpisodes}`;
    }

    return "";
  }

  function onNextClick(){
    setType(undefined);
  }

  useEffect(() => {
    setLoaded(false);

    if(s.has("s") && s.has("e")){
      let nSeason = parseInt(s.get("s")!);
      let nEpisode = parseInt(s.get("e")!);

      if(!nSeason || !nEpisode){
        return;
      }

      if(nSeason < 1) nSeason = 1;
      if(nEpisode < 1) nEpisode = 1;
      
      setType("tv");
      setSeason(nSeason);
      setEpisode(nEpisode);

      if(s.has("ms") && s.has("me")){
        let mSeasons = parseInt(s.get("ms")!);
        let mEpisodes = parseInt(s.get("me")!);
  
        if(!mSeasons || !mEpisodes){
          return;
        }
  
        if(mSeasons < 1) mSeasons = 1;
        if(mEpisodes < 1) mEpisodes = 1;

        setMaxSeasons(mSeasons);
        setMaxEpisodes(mEpisodes);
      }
    }
    else{
      setType("movie");
    }
  }, [id, s]);

  return (
    <Fragment>
      <Helmet>
        <title>Player - {conf.SITE_TITLE}</title>
      </Helmet>

      {
        !loaded && 
        <div className="loading">
          <div className="spinner">
            <i className="fa-solid fa-spinner-third"></i>
          </div>
        </div>
      }

      <div className="player">
        {
          typeof type !== "undefined" &&
          <iframe
          allowFullScreen
          onLoad={() => setLoaded(true)}
          sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
          src={`https://vidsrc.me/embed/${id}${season ? "/"+season : ""}${episode ? "-"+episode : ""}`}></iframe>
          // src={`https://autoembed.to/${type}/tmdb/${id}${season ? "-" + season : ""}${episode ? "-" + episode : ""}?server=2`}></iframe>
	  // src={`${conf.RIPPER_API}/v2/embed/${type}?id=${id}${season ? "&s="+season : ""}${episode ? "&e="+episode : ""}`}></iframe>
        }

        {
          loaded &&
	<script>
            {`
		Object.defineProperty(document.querySelector('iframe').contentWindow.navigator, 'user-agent', "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1");
	       //var frames = document.getElementsByTagName('iframe');
	       //    for (var frame of frames) {
	       //        frame.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");
	       //    }
            `}
          </script>
         }

        {
          loaded && 
          <div className="overlay">
            <Link to="/">
              <i className="fa-solid fa-home"></i>
            </Link>

            {
              (type && type === "tv" && showNext()) &&
              <Link to={getNext()} onClick={() => onNextClick()}>
                <i className="fa-solid fa-forward-step"></i>
              </Link>
            }

            <Link to={`/${type}/${id}`}>
              <i className="fa-solid fa-close"></i>
            </Link>
          </div>
        }
      </div>
    </Fragment>
  ) 
}
