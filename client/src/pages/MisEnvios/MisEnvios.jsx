"use client"

import { useEffect, useState } from "react"
import OrdersList from "./OrdersList/OrdersList"
import { useNavigate } from "react-router-dom"
import "./MisEnvios.css"

const MisEnvios = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Obtener el usuario actual
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/sessions/online")
        if (!response.ok) throw new Error("No se pudo obtener el usuario")
        const data = await response.json()

        if (data?.user_id) {
          setUserId(data.user_id)
        } else {
          throw new Error("Usuario no autenticado")
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setError("No se pudo obtener el usuario. Inicia sesión.")
      }
    }

    fetchUserId()
  }, [])

  // Obtener las órdenes del usuario
  useEffect(() => {
    if (!userId) return // Evita ejecutar el fetch con un userId inválido

    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/orders/user/${userId}`)

        if (!response.ok) throw new Error("No se pudieron obtener las órdenes")

        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setError("No se pudieron obtener las órdenes.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  const handleSendMoneyClick = () => {
    navigate("/checkout")
  }

  // Efecto para animación del botón
  useEffect(() => {
    const sendMoneyCard = document.querySelector(".send-money-card")

    if (sendMoneyCard) {
      sendMoneyCard.addEventListener("mouseover", () => {
        sendMoneyCard.classList.add("card-hover")
      })

      sendMoneyCard.addEventListener("mouseout", () => {
        sendMoneyCard.classList.remove("card-hover")
      })
    }

    return () => {
      if (sendMoneyCard) {
        sendMoneyCard.removeEventListener("mouseover", () => {})
        sendMoneyCard.removeEventListener("mouseout", () => {})
      }
    }
  }, [])

  return (
    <div className="envios-container">
      <div className="envios-header">
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h1>Mis Envíos</h1>
        <p>Gestiona tus transferencias de dinero</p>
      </div>

      <div className="envios-content">
        <div className="send-money-card" onClick={handleSendMoneyClick}>
          <div className="send-money-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h2>Enviar Dinero</h2>
          <div className="card-shine"></div>
        </div>

        <div className="orders-section">
          <h3>Historial de Envíos</h3>

          {error && (
            <div className="error-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando órdenes...</p>
            </div>
          ) : orders.length > 0 ? (
            <OrdersList orders={orders} />
          ) : (
            <div className="empty-state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
              <p>No tienes órdenes aún.</p>
              <button className="create-order-button" onClick={handleSendMoneyClick}>
                Crear tu primera orden
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MisEnvios
