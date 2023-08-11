import MyNavbar from "./components/navbar"
import Home from "./views/home"
import Movie from "./views/movie"
import Carrito from "./views/carrito"
import MyPerfil from "./views/perfil"
import Login from "./views/login"
import Registro from "./views/registro"
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import MyContext from "./MyContext"

function App() {
  const [movies, setMovies] = useState([])
  const [price, setPrice] = useState(0)
  const [carrito, setCarrito] = useState([])
  const [cantidad, setCantidad] = useState(0)
  const [usuario, setUsuario] = useState(null)
  const [idCategoria, setIdCategoria] = useState(0);
  const [dataCateg, setDataCateg] = useState(null);
  const [titulo, setTitulo] = useState('');

  const urlServer = "http://localhost:3000"

  useEffect(() => {
    getDataMovies();
    DataCategories();
  }, [])

  const DataCategories = async () => {
    let url = `${urlServer}/categorias`;
    console.log(url)
    try {
      const res = await axios.get(url);      
      setDataCateg(res.data);
      
    } catch (error) {
      //setErrorCateg(error.message);
    } finally {
      //setLoadingCateg(false);
    }
  };
  

  const getDataMovies = async (idCategoria=0,titulo='') => {
    let url =
      `${urlServer}/peliculas?idcategoria=${idCategoria}&agno=${0}&titulo=${titulo}&director=` +
      `&limit=30&page=1&orderby=agno_DESC,titulo_ASC`;
    const resDataMovies = await fetch(url)
    const dataMovies = await resDataMovies.json()   
    setMovies(dataMovies)
  }

  // const DataMovies = async () => {
  //   const categoria = criteriosBusquedaPeliculas.idCategoria ?? 0;
  //   const year = criteriosBusquedaPeliculas.agno;
  //   const title = criteriosBusquedaPeliculas.titulo ?? "";

  //   let url =
  //     `${urlRaiz}peliculas?idcategoria=${categoria}&agno=${year}&titulo=${title}&director=` +
  //     `&limit=30&page=1&orderby=agno_DESC,titulo_ASC`;

  //   try {
  //     const res = await axios.get(url);
  //     setDataMovies(res.data);
  //   } catch (error) {
  //     setErrorMovies(error.message);
  //   } finally {
  //     setLoadingMovies(false);
  //   }    
  // };

  useEffect(() => {
    let precioTotal = 0
    let cantidadTotal = 0
    carrito.forEach(function (movie) {
      precioTotal += movie.price * movie.cantidad
      cantidadTotal += movie.cantidad
      setPrice(precioTotal)
      setCantidad(cantidadTotal)
    })
  }, [carrito])

  const movieAdd = (element) => {
    const movieCarrito = {
      id: element.id,
      img: element.img,
      name: element.name,
      price: element.price,
      cantidad: 1,
    }
    const addedMovie = carrito.find((e) => e.id === element.id)
    if (addedMovie) {
      addedMovie.cantidad += 1
      setCarrito([...carrito])
    } else setCarrito([...carrito, movieCarrito])
  }

  const movieRemove = (element, index) => {
    const removedMovie = carrito.find((e) => e.id === element.id)
    if (removedMovie.cantidad > 0) {
      removedMovie.cantidad -= 1
      setCarrito([...carrito])
    } else {
      carrito.splice(index, 1)
      setCarrito([...carrito])
    }
  }

  const sharedStates = {
    movies,
    setMovies,
    getDataMovies,
    dataCateg,
    setDataCateg,
    price,
    setPrice,
    carrito,
    setCarrito,
    cantidad,
    setCantidad,
    movieAdd,
    movieRemove,
    usuario,
    setUsuario,
    urlServer
  }

  return (
    <div>
      <MyContext.Provider value={sharedStates}>
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pelicula/:idmovie" element={<Movie />} />
            {/* <Route path="pelicula/:selectedMovie" element={<Movie />} /> */}
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/registro" element={<Registro />} />          
            <Route path="/perfil" element={<MyPerfil />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
