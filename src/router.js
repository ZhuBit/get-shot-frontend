import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPatient from './components/RegisterPatient'
import Confirmation from './components/Confirmation'
import Vaccination from './components/Vaccination'

// Pages
const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/">
                <RegisterPatient />
            </Route>
            <Route exact path="/confirm">
                <Confirmation />
            </Route>
            <Route exact path="/vaccination">
                <Vaccination />
            </Route>
        </Switch>
    );
};

export default MainRouter;
