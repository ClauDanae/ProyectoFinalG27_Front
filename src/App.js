import MyNavbar from "./components/navbar";
import Home from "./views/home";
import Movie from "./views/movie";
import Carrito from "./views/carrito";
import MyPerfil from "./views/perfil";
import Login from "./views/login";
import Registro from "./views/registro";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [pelicula, setPelicula] = useState([]);
  const [errorMovies, setErrorMovies] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const [generos, setGeneros] = useState(null);

  const [errorGenero, setErrorGenero] = useState(null);
  const [loadingGeneros, setLoadingGeneros] = useState(true);

  const [price, setPrice] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  //Criterios busqueda peliculas
  const [titulo, setTitulo] = useState('');
  const [agno, setAgno] = useState(0);
  const [idGenero, setIdGenero] = useState(0);
  const [idMovie, setIdMovie] = useState(0);
  const urlServer = "http://localhost:3000";

  const getDataGeneros = async () => {
    let url = `${urlServer}/categorias`;
    try {
      const res = await axios.get(url);
      setGeneros(res.data);
      
    } catch (error) {
      setErrorGenero(error.message);
    } finally {
      setErrorGenero(false);
    }
  };

  const getDataMovies = async () => {       
   
    let url =
      `${urlServer}/peliculas?idcategoria=${idGenero}&agno=${agno}&titulo=${titulo}&director=` +
      `&limit=30&page=1&orderby=agno_DESC,titulo_ASC`;
      
    try {
      const res = await axios.get(url);
      setMovies(res.data);
    } catch (error) {
      setErrorMovies(error.message);
    } finally {
      setLoadingMovies(false);
    }    
  };

  
  const getDataMovie2s = async () => {
    const resDataMovies = await fetch(urlServer + "/peliculas");
    const dataMovies = await resDataMovies.json();
    
    setMovies(dataMovies);
  };

  const movieAdd = (element) => {
    const movieCarrito = {
      id: element.id,
      img: element.img,
      name: element.name,
      price: element.price,
      cantidad: 1,
    };
    const addedMovie = carrito.find((e) => e.id === element.id);
    if (addedMovie) {
      addedMovie.cantidad += 1;
      setCarrito([...carrito]);
    } else setCarrito([...carrito, movieCarrito]);
  };

  const movieRemove = (element, index) => {
    const removedMovie = carrito.find((e) => e.id === element.id);
    if (removedMovie.cantidad > 0) {
      removedMovie.cantidad -= 1;
      setCarrito([...carrito]);
    } else {
      carrito.splice(index, 1);
      setCarrito([...carrito]);
    }
  };
  useEffect(() => {
    let precioTotal = 0;
    let cantidadTotal = 0;
    carrito.forEach(function (movie) {
      precioTotal += movie.price * movie.cantidad;
      cantidadTotal += movie.cantidad;
      setPrice(precioTotal);
      setCantidad(cantidadTotal);
    });
  }, [carrito]);
  useEffect(() => {
    getDataMovies();
    getDataGeneros();
  }, []);

  
  const sharedStates = {
    movies,
    setMovies,
    price,
    setPrice,
    carrito,
    setCarrito,
    cantidad,
    setCantidad,
    movieAdd,
    movieRemove,idMovie, setIdMovie,pelicula,setPelicula,
    generos, setGeneros,idGenero,setIdGenero,getDataMovies
  };

  // console.log(movies);
  // console.log(generos);
  
  return (
    <div>
      <MyContext.Provider value={sharedStates}>
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:selectedMovie" element={<Movie />} />
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
