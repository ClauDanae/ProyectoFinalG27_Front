import "../css/css-views/home.css"

import MyCard from "../components/card"

import { useContext,useState, useEffect } from "react"
import MyContext from "../MyContext"
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const Home = () => {
  
  let {generos, setTitulo,setAgno,idGenero,setIdGenero,getDataMovies } = useContext(MyContext)
  
  useEffect(() => {
    getDataMovies();    
  }, [idGenero]);
  return (
    <>
      <div className="d-block d-xl-flex mx-5">
        <div>
          <div className="d-flex d-xl-none justify-content-evenly">
            <p className="fw-bold fs-4 me-4">Categorías</p>
            <select>
              {generos&&generos.map((element, index) => {
                return (
                  <option key={index} className="mb-1" value={element.categoria}>
                    {element.categoria}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="d-none d-lg-block mx-2 col-2">
          <p className="fw-bold fs-4 mt-3 my-3">Categorías</p>
          <hr />
          <div>
            <ListGroup>
              {generos&&generos.map((element, index) => {
                return (
                  <ListGroup.Item key={index}  as="button" id={element.id} variant="secondary"
                  onClick={() => setIdGenero(element.id)} active={element.activo}
                  >
                    
                    <div className="ms-2 me-auto">
                      <div className="fw-bold d-flex justify-content-between">
                        <span>{element.categoria}</span>
                        {/* <Badge bg="primary" pill>
                          1
                        </Badge> */}
                      </div>

                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </div>
        </div>
        <MyCard />
      </div>
    </>
  )
}

export default Home
