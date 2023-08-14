import "../css/css-components/card_details.css"

import {AiOutlineShoppingCart} from "react-icons/ai"
import Button from "react-bootstrap/Button"

import {useParams} from "react-router-dom"
import {useState, useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import MyContext from "../MyContext"
import axios from "axios"

const CardDetails = () => {
  const {movies, movieAdd, urlServer, usuario, getDataMovies} = useContext(MyContext)
  const navigate = useNavigate()
  const {selectedMovie} = useParams()
  const [comment, setComment] = useState("")
  const [movieComments, setMovieComments] = useState([])

  useEffect(() => {
    getcomments()
  }, [])

  const getcomments = async () => {
    const endpoint = `/pelicula/${selectedMovie}`
    const resDataComments = await fetch(urlServer + endpoint)
    const dataComments = await resDataComments.json()
    setMovieComments(dataComments)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleAddComment = async () => {
    const endpoint = "/pelicula"
    const selectedMovieData = movies.find(
      (element) => element.name === selectedMovie
    )

    if (selectedMovieData) {
      const commentData = {
        idpelicula: selectedMovieData.id,
        idusuario: usuario.id,
        comentario: comment,
      }

      try {
        await axios.post(urlServer + endpoint, commentData)
        alert("comentario agregado con éxito")
      } catch (error) {
        console.log(error)
        alert("Algo salió mal ...")
      }
    }
    getcomments()
  }

  const deleteMovie = async() => {
    console.log(selectedMovie)
    const endpoint = `/pelicula/${selectedMovie}`
    try {
      await axios.delete(urlServer + endpoint)
      alert("Pelicula eliminada con éxito")
      navigate("/")
      getDataMovies()
    } catch (error) {
      alert("Algo salió mal ...")
    }
  }
  

  return (
    <div>
      {movies.map((element) => {
        if (selectedMovie === element.name)
          return (
            <div>
              <div key={element.id} className="details-card-flex">
                <div className="img-details">
                  <img src={element.img} alt="" />
                </div>
                <div className="m-3">
                  <div className="d-flex justify-content-between">
                    <h2>{element.name}</h2>
                    <h2></h2>
                  </div>
                  <hr />
                  <p>{element.sinopsis}</p>
                  <hr />
                  <p className="fw-bold">Género</p>
                  <p>{element.genre}</p>
                  <hr />
                  <div className="price-add">
                    <p className="fw-bold">
                      Precio: $<span>{element.price}</span>
                    </p>
                    <div className="w-50">
                      <Button
                        onClick={() => movieAdd(element)}
                        variant="success"
                        className="text-light btn-flex ms-auto"
                      >
                        Añadir
                        <AiOutlineShoppingCart className="btn-icon" />
                      </Button>
                      {usuario && usuario.admin === true ? (
                        <Button
                        onClick={() => deleteMovie()}
                          variant="warning"
                          className="btn-flex ms-auto mt-5"
                        >
                          Eliminar película
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 coments">
                <p>Comentarios</p>
                {movieComments.map((element) => {
                  return (
                    <div>
                      <hr />
                      <p>{element.comentario} </p>
                    </div>
                  )
                })}
              </div>
              {usuario ? (
                <div className="mt-3 mb-5 p-3 coments">
                  <div className="d-flex justify-content-between">
                    <p>Valora y/o deja tu comentario</p>
                    <p></p>
                  </div>
                  <hr />
                  <div className="d-flex flex-column align-items-end">
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Escribe tu comentario aquí..."
                      className="w-100"
                    />
                    <Button
                      onClick={handleAddComment}
                      variant="success"
                      className="mt-3 w-25"
                    >
                      Comentar
                    </Button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )
      })}
    </div>
  )
}

export default CardDetails
