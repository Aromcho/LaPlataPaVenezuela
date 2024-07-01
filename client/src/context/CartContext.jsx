import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Context = createContext();

const Provider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const statusResponse = await axios.get('/api/sessions/online');
        if (statusResponse.data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al verificar el estado del usuario", error);
        setIsAdmin(false); // En caso de error, asumir que el usuario no es administrador
      }
    };
  
    checkIfAdmin();
    fetchItems();
  }, []);


  const fetchItems = async () => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;
      const response = await axios.get(`/api/items?user_id=${userId}`);
      const items = response.data.response;
      setItems(items);
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  };

  return (
    <Context.Provider
      value={{
        isAdmin,
      }}
    >
      {children}
      </Context.Provider>
  );
};

export { Context, Provider};