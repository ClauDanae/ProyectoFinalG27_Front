import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import NavDropdown from "react-bootstrap/NavDropdown"
import "../css/css-components/navbar.css"
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai"

import {NavLink} from "react-router-dom"
import {useContext} from "react"
import MyContext from "../MyContext"

const MyNavbar = () => {
  const setActiveClass = ({isActive}) => (isActive ? "active" : undefined)
  const {price, cantidad, usuario, setUsuario} = useContext(MyContext)
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("token")
  }

  return (
    <>
      <Navbar expand="sm" className="bg-success-subtle">
        <Container fluid>
          <Navbar.Toggle />
          <NavLink
            to="/login"
            className={`navlink ${setActiveClass} d-block d-sm-none`}
          >
            <AiOutlineUser className="icon" />
          </NavLink>
          <Navbar.Offcanvas className="bg-success-subtle">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Películas G27</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink
                  to="/"
                  className={`navlink ${setActiveClass} p-2 d-flex align-items-center`}
                >
                  <AiOutlineHome className="icon" />
                  <p>Inicio</p>
                </NavLink>
                <NavLink
                  to="/carrito"
                  className={`navlink ${setActiveClass} d-flex d-sm-none p-2 align-items-center`}
                >
                  <AiOutlineShoppingCart className="icon" />
                  <p>Carrito</p>
                </NavLink>
                {!usuario ? (
                  <NavLink
                    to="/login"
                    className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                  >
                    <AiOutlineUser className="icon" />
                    <p>Iniciar Sesión</p>
                  </NavLink>
                ) : (
                  <div className="d-flex">
                    <NavLink
                      to="/perfil"
                      className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                    >
                      <AiOutlineUser className="icon" />
                      <p>Mi perfil</p>
                    </NavLink>
                    <NavLink
                      to="/"
                      onClick={logout}
                      className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                    >
                      <AiOutlineLogout className="icon" />
                    </NavLink>
                  </div>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="p-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-6 col-md-3">
              <NavLink
                to="/"
                className={`navlink ${setActiveClass} ms-3 text-decoration-none text-success fs-2 fw-bold`}
              >
                Películas G27
              </NavLink>
            </div>
            <form className="d-none d-md-flex col-6 align-items-center">
              <input className="form-control" placeholder="Buscar productos" />
            </form>
            <div className="col col-6 col-md-3 d-flex align-items-center justify-content-end">
              <NavLink
                to="/carrito"
                className={`navlink ${setActiveClass} me-3 fw-bold text-success`}
              >
                <div className="d-flex border border-1 rounded-3">
                  <div className="ps-2 d-flex align-items-center">
                    <AiOutlineShoppingCart className="icon" />
                    <span className="ms-2">{cantidad}</span>
                  </div>
                  <div className="p-3">
                    <span>Carrito</span>
                    <span className="ms-2">
                      ${price.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
            <form className="d-flex d-md-none py-3 align-items-center">
              <input className="form-control" placeholder="Buscar productos" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNavbar
