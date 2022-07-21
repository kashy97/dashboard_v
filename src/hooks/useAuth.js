import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  return {
    authed,
    login() {
      return new Promise((res) => {
        localStorage.getItem("refresh_token");
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        localStorage.removeItem("refresh_token");
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
