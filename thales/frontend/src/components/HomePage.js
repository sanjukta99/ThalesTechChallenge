import React, { Component } from "react";
import AirportListPage from "./AirportListPage";
import AirportPage from "./AirportPage";
import JSONPage from "./JSONPage";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import HomePageLogo from "./plane.png";
import Button from '@material-ui/core/Button';
import StatsTable from './StatsTable';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <Router>
            <Switch>
                <Route exact path='/'>
                <div class="container">
                    <div class="logo">
                        <h2 class="homepage-title"> AIRLAB Tech Challenge </h2>
                        <img src={HomePageLogo} alt="logo" width="450" height="400"/>
                    </div>
                    <div class="homepage-buttons">
                    <Button variant="contained"  to="/airport-list" component={Link}> Airports </Button>
                    <Button variant="contained" to="/table" component={Link}> Statistics </Button>
                    <Button variant="contained" to="/json" component={Link}> JSON </Button>
                    </div>
                </div> 
                </Route>
                <Route exact path='/airport-list' component={AirportListPage}></Route>
                <Route exact path='/airport/:icao' component={AirportPage} />
                <Route exact path='/json' component={JSONPage} />
                <Route exact path='/table' component={StatsTable} />
            </Switch>
        </Router>
    }
}