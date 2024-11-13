import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children, user }) => {
  const [songData, setSongData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket !== null) return;

    const newSocket = io(import.meta.env.VITE_SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user == null) return;
    if (socket) return;
    socket.emit("join-rehearsal", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [user]);

  const updateCurrentSong = useCallback(async (song) => {
    setSongData(song);
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.on("adminSelectSong", (data) => {
      setSongData(data);
      navigate("/live");
    });

    return () => {
      socket.off("adminSelectSong");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("adminQuit", (data) => {
      navigate("/");
    });

    return () => {
      socket.off("adminQuit");
    };
  }, [socket]);

  useEffect(() => {
    const getSelectedSong = async () => {};
    getSelectedSong();
    if (socket === null) return;
    socket.on("adminQuit", (data) => {
      navigate("/");
    });

    return () => {
      socket.off("adminQuit");
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        songData,
        setSongData,
        onlineUsers,
        updateCurrentSong,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
