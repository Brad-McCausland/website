import React from "react";
import * as ReactDOM from "react-dom";
import { HomePage } from './pages/HomePage';
import { UnderConstructionPage } from './pages/UnderConstructionPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends React.Component {
    render()
    {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/blog" component={UnderConstructionPage}/>
                    <Route exact path="/resume" component={UnderConstructionPage}/>
                    <Route exact path="/travel" component={UnderConstructionPage}/>
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render (
    <App/>,
    document.getElementById("webpage_wrapper")
);
