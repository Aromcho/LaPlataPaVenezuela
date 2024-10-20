import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

const Provider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(null);

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
        setIsAdmin(false); 
      }
    };
  
    checkIfAdmin();
    fetchItems();
  }, []);

  useEffect(() => {
    const checkIfUser = async () => {
      try {
        const response = await axios.get('/api/sessions/online');
        const userId = response.data.user_id;
        setIsUser(userId); 
      } catch (error) {
        console.error("Error al verificar el estado del usuario", error);
        setIsUser(null); 
      }
    };
  
    checkIfUser();
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

  const adminAction = () => {
    if (isAdmin) {
      console.log("Acción especial del administrador");
    } else {
      console.log("Acceso denegado. Solo los administradores pueden realizar esta acción.");
    }
  };

  const getUserId = async () => {
    try {
      const response = await axios.get('/api/sessions/online');
      const userId = response.data.user_id;
      return userId;
    } catch (error) {
      console.error("Error al obtener el user_id", error);
      return null;
    }
  };

  return (
    <Context.Provider
      value={{
        isAdmin,
        isUser,
        adminAction,
        getUserId, // Exponemos la función getUserId en el contexto
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
