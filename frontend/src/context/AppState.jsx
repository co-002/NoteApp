import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "https://noteapp-backend-tki3.onrender.com/api";

  const [allNotes, setAllNotes] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verify();
    getAllNotes();
  }, [allNotes]);

  const getAllNotes = async () => {
    const res = await axios.get(`${url}/note/allNotes`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    if (res.data.success) {
      setAllNotes(res.data.notes);
    }
  };

  const verify = async () => {
    const res = await axios.get(`${url}/user/verify`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    if (res.data.success) {
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(res.data.user);
    } else {
      setIsLoggedIn(false);
      setIsLoggedIn(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res.data.success) {
        setIsLoggedIn(true);
        setIsLoading(false);
      }
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post(
        `${url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createNote = async ({ title, content }) => {
    try {
      const res = await axios.post(
        `${url}/note/create`,
        { title, content },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res.data.success) {
        getAllNotes();
      }
      // return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(`${url}/user/logout`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res.data.success) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(`${url}/note/deleteNote/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateNote = async ({ title, content, noteId }) => {
    try {
      const res = await axios.put(
        `${url}/note/updateNote/${noteId}`,
        { title, content },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res.data.success) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const shareNote = async ({ noteId, email, permission }) => {
    try {
      const res = await axios.post(
        `${url}/note/shareNote/${noteId}`,
        { email, permission },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res.data.success) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        login,
        isLoggedIn,
        logout,
        user,
        allNotes,
        isLoading,
        deleteNote,
        register,
        createNote,
        shareNote,
        updateNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
