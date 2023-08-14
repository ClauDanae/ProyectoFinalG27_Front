import React, {useState, useContext} from "react"
import "../css/css-views/home.css"
import MyCard from "../components/card"
import MyContext from "../MyContext"
import ListGroup from "react-bootstrap/ListGroup"
import Badge from "react-bootstrap/Badge"

const Home = () => {
  let {movies, setMovies} = useContext(MyContext)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const selectGenre = (genre) => {
    setSelectedGenre(genre)
  }

  const genreCounts = {}
  movies.forEach((element) => {
    if (genreCounts[element.genre]) {
      genreCounts[element.genre]++
    } else {
      genreCounts[element.genre] = 1
    }
  })

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre === selectedGenre)
    : movies

  return (
    <>
      <div className="d-block d-xl-flex mx-5">
        <div>
          <div className="d-flex d-xl-none justify-content-evenly">
            <p className="fw-bold fs-4 me-4">Categorías</p>
            <select onChange={(e) => selectGenre(e.target.value)}>
              <option value="">Todas</option>
              {Object.keys(genreCounts).map((genre, index) => (
                <option key={index} className="mb-1" value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-none d-xl-block mx-2 col-2">
          <p className="fw-bold fs-4 mt-3 my-3">Categorías</p>
          <hr />
          <div>
            <ListGroup>
              <ListGroup.Item
                onClick={() => selectGenre("")}
                active={selectedGenre === ""}
                variant="secondary"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold d-flex justify-content-between">
                    <p>Todas</p>
                    <span>
                      <Badge bg="success" pill>
                        {movies.length}
                      </Badge>
                    </span>
                  </div>
                </div>
              </ListGroup.Item>
              {Object.keys(genreCounts).map((genre, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => selectGenre(genre)}
                  active={selectedGenre === genre}
                  variant="secondary"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold d-flex justify-content-between">
                      <p>{genre} </p>
                      <span>
                        {genreCounts[genre] > 0 && (
                          <Badge bg="success" pill>
                            {genreCounts[genre]}
                          </Badge>
                        )}
                      </span>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <MyCard categoriasMovies={filteredMovies} />
      </div>
    </>
  )
}

export default Home
