import "../css/css-views/home.css"

import MyCard from "../components/card"

import { useContext } from "react"
import MyContext from "../MyContext"
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => {
  let { dataCateg, getDataMovies } = useContext(MyContext)
  const selectGenre = (id) => {
    getDataMovies(id);    
  }
 
  return (
    <>
      <div className="d-block d-xl-flex mx-5">
        <div>
          <div className="d-flex d-xl-none justify-content-evenly">
            <p className="fw-bold fs-4 me-4">Categorías</p>
            <select>            
              {dataCateg && dataCateg.map((element, index) => {
                 
                return (
                  <option key={index} className="mb-1" value={element.categoria}>
                    {element.categoria}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="d-none d-xl-block mx-2 col-2">
          <p className="fw-bold fs-4 mt-3 my-3">Categorías</p>
          <hr />
          <div>
            <ListGroup>
              {dataCateg && dataCateg.map((element, index) => {
                return (
                  <ListGroup.Item key={index} onClick={() => selectGenre(element.id)} 
                  active={element.active} variant="secondary" as="button">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold d-flex justify-content-between">
                        <span>{element.categoria}</span>                        
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
