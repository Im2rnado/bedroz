export default interface PosterOptions{
  id: string;
  title: string;
  name: string;
  image: string;
  poster_path: string;
  media_type: "movie"|"tv";
  type: "movie"|"tv"
}