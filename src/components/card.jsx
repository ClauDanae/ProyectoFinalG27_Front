import "../css/css-components/card.css"

import {AiOutlineShoppingCart} from "react-icons/ai"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import MyContext from "../MyContext"

const MyCard = ({categoriasMovies}) => {
  const {movieAdd} = useContext(MyContext)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const toSelectedMovie = (movieName) => {
    navigate(`/${movieName}`)
  }

  return (
    <div className="container">
      <form className="col-10 col-sm-6 m-auto mb-4 mt-4">
        <input
          className="form-control"
          placeholder="Busca tu película"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="row mt-2 mx-5">
        {categoriasMovies.map((element) => {
          const searchByName = element.name.toLowerCase()
          if (search === "" || searchByName.includes(search.toLowerCase()))
            return (
              <div
                key={element.id}
                className="col-12 col-md-6 col-lg-4 col-xxl-3 mt-3"
              >
                <Card
                  style={{width: "18rem", height: "42rem"}}
                  className="m-auto"
                >
                  <div
                    onClick={() => toSelectedMovie(element.name)}
                    className="card-img"
                  >
                    <Card.Img variant="top" src={element.img} className="img" />
                  </div>
                  <Card.Body>
                    <div onClick={() => toSelectedMovie(element.name)}>
                      <Card.Title className="text-capitalize">
                        {element.name}
                      </Card.Title>
                      <hr />
                      <Card.Subtitle className="mb-3">Género</Card.Subtitle>
                      <Card.Text className="text-capitalize mb-0">
                        {element.genre}
                      </Card.Text>
                      <hr />
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <p className="text-center fs-5">
                        ${element.price.toLocaleString("es-CL")}
                      </p>
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
