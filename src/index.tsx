import React from "react";
import * as ReactDOM from "react-dom";
import { HomePage } from "./pages/HomePage";
import { UnderConstructionPage } from "./pages/UnderConstructionPage";
import { BlogHomePage } from "./pages/BlogHomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

class App extends React.Component {
    render()
    {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/blog" component={BlogHomePage}/>
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
