import "../css/css-components/table_carrito.css"

import {Button} from "react-bootstrap"

import {useContext} from "react"
import {useNavigate, Link} from "react-router-dom"
import MyContext from "../MyContext"
import axios from "axios"

const TableCarrito = () => {
  const {carrito, setCarrito, price, setPrice, setCantidad, movieAdd, movieRemove, urlServer, usuario} =
    useContext(MyContext)
  const navigate = useNavigate()

  const historialCompras = async () => {
    if (usuario) {
      const endpoint = "/historial"
      const fechaCompra = new Date()
      const dia = fechaCompra.getDate()
      const mes = fechaCompra.getMonth() + 1
      const año = fechaCompra.getFullYear()
      const fechaFormato = `${dia}/${mes}/${año}`
      const data = {usuario, carrito, fechaCompra: fechaFormato}
      try {
        await axios.post(urlServer + endpoint, data)
        alert("Compra realizada con éxito")
        setCarrito([])
        setPrice(0)
        setCantidad(0)
        navigate("/perfil")
      } catch (error) {
        alert("Algo salió mal ...")
      }
    } else {
      navigate("/login")
    }
  }

  if (price > 0)
    return (
      <div className="carrito">
        <h3>Detalles del pedido:</h3>
        <div className="items">
          {carrito.map((element, index) => {
            return (
              <div key={index}>
                <div className="item">
                  <div className="d-flex align-items-center">
                    <img src={element.img} alt={element.name} />
                    <p className="ms-2 me-3">X{element.cantidad}</p>
                    <p>{element.name}</p>
                  </div>
                  <div className="price-section">
                    <div className="me-3">
                      <p className="text-end">
                        Valor unitario
                        <span className="ms-2">${element.price}</span>
                      </p>
                      <p className="text-end">
                        Total unitario:
                        <span className="ms-2">
                          ${element.cantidad * element.price}
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() => movieAdd(element)}
                      variant="success"
                      className="add-remove"
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => movieRemove(element, index)}
                      variant="danger"
                      className="add-remove"
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="buy">
            <p className="total-price">
              Total: $<span>{price}</span>
            </p>
            <Button
              variant="success"
              className="buy-btn"
              onClick={historialCompras}
            >
              Pagar
            </Button>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className="carrito-vacio">
        <h3>El carrito está vacío</h3>
        <p>
          ¡Haz click{" "}
          <Link to="/" className="link-carrito-vacio">
            aquí
          </Link>{" "}
          para comprar tus péliculas favoritas!
        </p>
      </div>
    )
}

export default TableCarrito
