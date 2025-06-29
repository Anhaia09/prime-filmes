import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from "../../services/api";
import { toast } from "react-toastify";




function Filme() {
   const { id } = useParams();
   const navigate = useNavigate();

   const[filme, setFilme] = useState({});
   const[loading, setLoading] = useState(true);


   useEffect(() =>{

    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '4347e84dcfba8e6f1ae2e133e4de613b', 
          language: 'pt-BR',
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Filme não encontrado");
         console.log("Redirecionando para a página inicial...");
        navigate("/", { replace: true });
        return;
      });
    }

    loadFilme();

    return () => {
      console.log("Componente desmontado");
    }
   }, [navigate,id])


   function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if(hasFilme){
      toast.warn("Você já possui esse filme salvo!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
    navigate("/");
   }


   if(loading){
    return (
      <div className="filme-info">
        <h2>Carregando detalhes do filme...</h2>
      </div>
    );
   }

  
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
    
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
          Trailer
          </a>
        </button>

      </div>
    
    </div>
  );
}

export default Filme;