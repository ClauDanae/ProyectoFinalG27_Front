import "../css/css-components/card.css"

import { AiOutlineShoppingCart } from "react-icons/ai"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import { useContext,useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MyContext from "../MyContext"

const MyCard = () => {
  const { movies, movieAdd } = useContext(MyContext)
  const navigate = useNavigate()
  const [idPeli,setIdPeli]=useState(0);

  const detallePelicula = () => {
    try {
     if(idPeli===0) return;
   navigate(`pelicula/${idPeli}`);
   } catch (error) {
     console.log(error);
   }

 };


  const toSelectedMovie = (movieName) => {
    navigate(`pelicula/${movieName}`)
  }

  const changeOrder = (event) => {
    console.log(event.target.value)
  }
 useEffect(() => {
  detallePelicula(idPeli);
 }, [idPeli]);
  return (
    <div className="container">
      <div className="row mt-3 mx-5">
        <div className="">
          <span className="text-center">Ordenar por: </span>
        </div>
        <div onChange={changeOrder} className="col">
          <input type="radio" className="btn-check" name="options" value="sell" id="option1" autoComplete="off" />
          <label className="btn btn-outline-success-subtle mr-5" htmlFor="option1">Mas vendidas</label>

          <input type="radio" className="btn-check" name="options" value="comment" id="option2" autoComplete="off" />
          <label className="btn btn-outline-success-subtle" htmlFor="option2">Mas comentadas</label>

          <input type="radio" className="btn-check" name="options" value="rate" id="option3" autoComplete="off" />
          <label className="btn btn-outline-success-subtle" htmlFor="option3">Mejor Puntuación</label>
        </div>
      </div>
      <div className="row mt-2 mx-5">
        {movies.map((element) => {
          let img = `../assets/img/${element.id}.jpg`;
          return (
            <div
              key={element.id}
              className="col-12 col-md-6 col-lg-4 col-xxl-3 mt-3"
            >
              <Card style={{ width: "18rem", height: "42rem" }} className="m-auto">
                <div onClick={() => toSelectedMovie(element.id)} className="card-img customBtn">
                  <Card.Img variant="top" src={img} className="img" onClick={()=>{setIdPeli(element.id)}}
/>
                </div>
                <Card.Body>
                  <div onClick={() => toSelectedMovie(element.id)}>
                    <Card.Title className="text-capitalize">
                      {element.titulo}
                    </Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-3">Género</Card.Subtitle>
                    <Card.Text className="text-capitalize mb-0">
                      {element.genero}
                    </Card.Text>
                    <hr />
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <p className="text-center fs-5">${element.precio.toLocaleString('es-CL')}</p>
                    <Button
                      onClick={() => movieAdd(element)}
                      variant="success"
                      className="text-light btn-flex"
                    >
                      Añadir
                      <AiOutlineShoppingCart className="btn-icon" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyCard
