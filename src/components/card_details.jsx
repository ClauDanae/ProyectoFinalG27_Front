import "../css/css-components/card_details.css"

import {AiOutlineShoppingCart} from "react-icons/ai"

import Button from "react-bootstrap/Button"

import {useParams} from "react-router-dom"
import {useContext,useState,useEffect} from "react"
import MyContext from "../MyContext"
import axios from "axios";


const CardDetails = () => {
  const {movies, movieAdd,urlServer} = useContext(MyContext)
  const {selectedMovie} = useParams()
  const [pelicula, setPelicula] = useState([]);
  const { idmovie } = useParams();


  const detallePelicula = async () => {
    let url = `${urlServer}/pelicula/${idmovie}`;    
    try {
      const res = await axios.get(url);

      setPelicula(res.data);
    } catch (error) {
      //setErrorMovies(error.message);
    } finally {
      //setLoadingMovies(false);
    }
  };
  useEffect(() => {
    detallePelicula();
  }, []);


  return (
    <div>
      {pelicula.map((element) => {
        let img = `../assets/img/${element.id}.jpg`;
          return (
            <div>
              <div key={element.id} className="details-card-flex">
                <div className="img-details">
                  <img src={img} alt="" />
                </div>
                <div className="m-3">
                  <div className="d-flex justify-content-between">
                    <h2>{element.titulo}</h2>
                    <h2>Puntuación</h2>
                  </div>
                  <hr />
                  <p>{element.sinopsis}</p>
                  <hr />
                  <p className="fw-bold">Género</p>
                  <p>{element.genero}</p>
                  <hr />
                  <div className="price-add">
                    <p className="fw-bold">
                      Precio: $<span>{element.precio}</span>
                    </p>
                    <Button
                      onClick={() => movieAdd(element)}
                      variant="success"
                      className="add text-light btn-flex"
                    >
                      Añadir
                      <AiOutlineShoppingCart className="btn-icon" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3 coments">
                <p>Comentarios</p>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  voluptates? Fugiat necessitatibus nostrum ea natus enim animi
                  sint odit eius dolores.
                </p>
              </div>
              <div className="mt-3 mb-5 p-3 coments">
                <div className="d-flex justify-content-between">
                  <p>Valora y/o deja tu comentario</p>
                  <p>Puntúa *insertar estrellitas"*</p>
                </div>
                <hr />
                <input type="text" className="user-coment" />
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default CardDetails
