import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

let socket = null;

export function useSocket() {
  const { user } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (!user || initialized.current) return;

    socket = io("http://localhost:3000");

    socket.on("connect", () => {
      // Rejoint la room du groupe pour recevoir les événements en temps réel
      socket.emit("rejoindreGroupe", user.groupeId);
    });

    initialized.current = true;

    return () => {
      socket?.disconnect();
      socket = null;
      initialized.current = false;
    };
  }, [user]);

  return socket;
}
