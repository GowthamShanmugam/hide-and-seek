import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import SessionManager from './sessionManager';
import Login from "./pages/login";

const App: React.FC = () => {
  return (
    <div className="App">
       <Switch>
          <Route path="/" exact component={SessionManager} />
          <Route path="/login" exact component={Login} />
        </Switch>
    </div>
  );
}

export default App;