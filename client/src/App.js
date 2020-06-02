import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import auth from './hoc/auth';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={auth(LandingPage, null)} />
                <Route exact path="/register" component={auth(RegisterPage, false)} />
                <Route exact path="/login" component={auth(LoginPage, false)} />
            </Switch>
        </Router>
    )
}

export default App;