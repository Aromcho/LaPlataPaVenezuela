import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Face from "./components/Face/Face.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Seguimiento from "./pages/Seguimiento/Seguimiento.jsx"; // Importa la página Seguimiento
import { Provider } from "./context/CartContext.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import StepperAdmin from "./pages/Admin/Stepper/StepperAdmin.jsx"; // Ruta corregida


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
            <Route path="/products/:productId"element={<ItemDetailContainer />}/>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/stepper" element={<StepperAdmin />} /> {/* Agrega la nueva ruta */}
            <Route path="/seguimiento" element={<Seguimiento />} /> {/* Nueva ruta para Seguimiento */}
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
