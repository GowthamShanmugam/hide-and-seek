import * as React from "react";
import { useHistory } from "react-router-dom";

const SessionManager: React.FC = () => {
  const history = useHistory();
  const getSession = () => {
    const session = localStorage.getItem("hideandseek");
    if (!session) {
      history.push("/login");
    } else {
      history.push("/events");
    }
  };

  return <> {getSession()}</>;
};

export default SessionManager;
