import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import MainMenu from './views/MainMenu/MainMenu';
import Resume from "./views/Resume/Resume";
import NoMatchPage from "./views/404/404";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}>
                    <MainMenu/>
                </Route>
                <Route path={"/resume"}>
                    <Resume/>
                </Route>
                <Route><NoMatchPage/></Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
