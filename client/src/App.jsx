import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Face from "./components/Face/Face.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import MisEnvios from "./pages/MisEnvios/MisEnvios.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx"; // Importa el nuevo componente
import { Provider } from "./context/CartContext.jsx";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Face />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/products/real" element={<ItemListContainer />} />
          <Route path="/products/:productId" element={<ItemDetailContainer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/envios" element={<MisEnvios />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta para CheckoutForm */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
