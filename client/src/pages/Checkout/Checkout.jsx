"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Checkout.css"

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Obtener datos de la ubicación si existen
  const { fromAmount, toAmount, fromCurrency, toCurrency } = location.state || {}

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombreReceptor: "",
    dni: "",
    comprobante: null,
    fromAmount: fromAmount || "",
    toAmount: toAmount || "",
    fromCurrency: fromCurrency || "USD",
    toCurrency: toCurrency || "USD",
    userId: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Simular la obtención del ID de usuario
  useEffect(() => {
    // Simulación de obtener el ID de usuario (reemplazar con tu lógica real)
    const fetchUserId = () => {
      setTimeout(() => {
        setFormData((prevData) => ({
          ...prevData,
          userId: "user123",
        }))
      }, 500)
    }

    fetchUserId()
  }, [])

  // Manejador para cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Manejador para cambios en el archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prevData) => ({
        ...prevData,
        comprobante: file,
      }))
      setFileName(file.name)

      // Mostrar vista previa del nombre del archivo
      const fileNameElement = document.getElementById("file-name")
      if (fileNameElement) {
        fileNameElement.textContent = file.name
        fileNameElement.classList.add("file-selected")
      }
    }
  }

  // Manejador para envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validación básica
    if (!formData.userId || !formData.nombreReceptor || !formData.fromAmount || !formData.toAmount) {
      setError("Por favor, completa todos los campos obligatorios.")
      setLoading(false)
      return
    }

    const orderData = {
      user_id: formData.userId,
      nameReceiver: formData.nombreReceptor,
      fromAmount: formData.fromAmount,
      toAmount: formData.toAmount,
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      userReceipt: formData.comprobante,
    }

    try {
      // Simulamos una llamada a API con un timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mostrar mensaje de éxito
      setShowSuccessMessage(true)

      // Simulación de SweetAlert con un timeout
      setTimeout(() => {
        // Aquí podrías usar SweetAlert como en tu código original
        // Por ahora solo redirigimos
        navigate("/envios")
      }, 2000)
    } catch (err) {
      setError("Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Efecto para animaciones de botones
  useEffect(() => {
    // Animación para el botón de envío
    const submitButton = document.querySelector(".submit-button")
    if (submitButton) {
      submitButton.addEventListener("mouseover", () => {
        submitButton.classList.add("button-hover")
      })

      submitButton.addEventListener("mouseout", () => {
        submitButton.classList.remove("button-hover")
      })
    }

    // Animación para el botón de subir archivo
    const uploadButton = document.querySelector(".file-upload-button")
    if (uploadButton) {
      uploadButton.addEventListener("mouseover", () => {
        uploadButton.classList.add("upload-button-hover")
      })

      uploadButton.addEventListener("mouseout", () => {
        uploadButton.classList.remove("upload-button-hover")
      })
    }

    return () => {
      // Limpieza de event listeners
      if (submitButton) {
        submitButton.removeEventListener("mouseover", () => {})
        submitButton.removeEventListener("mouseout", () => {})
      }

      if (uploadButton) {
        uploadButton.removeEventListener("mouseover", () => {})
        uploadButton.removeEventListener("mouseout", () => {})
      }
    }
  }, [])

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-header">
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
          <h1>Crear Orden</h1>
          <p>Complete los detalles para su transferencia</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="nombreReceptor">Nombre y apellido del que recibe</label>
            <input
              type="text"
              id="nombreReceptor"
              name="nombreReceptor"
              value={formData.nombreReceptor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI o cédula del que recibe</label>
            <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fromAmount">Monto Enviado</label>
              <div className="input-with-prefix">
                <span className="currency-prefix">{formData.fromCurrency}</span>
                <input
                  type="text"
                  id="fromAmount"
                  name="fromAmount"
                  value={formData.fromAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="currency-label">
                <span>{formData.fromCurrency}</span>
                <span className="currency-name">
                  {formData.fromCurrency === "USD"
                    ? "Dólares"
                    : formData.fromCurrency === "EUR"
                      ? "Euros"
                      : formData.fromCurrency === "ARS"
                        ? "Pesos Argentinos"
                        : ""}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="toAmount">Monto Recibido</label>
              <div className="input-with-prefix">
                <span className="currency-prefix">{formData.toCurrency}</span>
                <input
                  type="text"
                  id="toAmount"
                  name="toAmount"
                  value={formData.toAmount}
                  readOnly
                  className="disabled-input"
                />
              </div>
              <div className="currency-label">
                <span>{formData.toCurrency}</span>
                <span className="currency-name">
                  {formData.toCurrency === "USD"
                    ? "Dólares"
                    : formData.toCurrency === "EUR"
                      ? "Euros"
                      : formData.toCurrency === "ARS"
                        ? "Pesos Argentinos"
                        : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comprobante">Comprobante de Pago</label>
            <div className="file-upload-container">
              <button
                type="button"
                className="file-upload-button"
                onClick={() => document.getElementById("comprobante").click()}
              >
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Subir Comprobante
              </button>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                onChange={handleFileChange}
                className="hidden-file-input"
              />
              <span id="file-name" className="file-name">
                {fileName ? fileName : "Ningún archivo seleccionado"}
              </span>
            </div>
          </div>

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

          {showSuccessMessage && (
            <div className="success-message">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              ¡Orden creada con éxito! Redirigiendo...
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creando Orden..." : "Crear Orden"}
          </button>
        </form>

        <div className="checkout-footer">
          <p>Al crear la orden, acepta nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
