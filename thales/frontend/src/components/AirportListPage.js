import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const cardStyle = {
    title: {
      fontSize: 32,
      fontFamily: 'Lato'
    },
    content: {
      fontSize: 22,
      fontFamily: 'Lato'
    },
    root: {
      minWidth: 400,
      marginBottom: 25
    },
};

export default class AirportListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airport_list: []
        }
        this.handleAirportProfileButtonPressed = this.handleAirportProfileButtonPressed.bind(this);
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/airport-list`)
          .then(res => {
            const airport_list = res.data;
            this.setState({ 
              airport_list: airport_list
            });
          });

    }

    handleAirportProfileButtonPressed(icao) {
        fetch("/api/get-airport?icao=" + icao)
          .then((response) => response.json())
          .then((data) => this.props.history.push("/airport/" + data.icao));
      }

    render(){
        const card_class = cardStyle;

        return (
            <div class="list-container">
                <ul class="list-ul">
                    <h2 class="homepage-title"> List of Airports </h2>
                    { this.state.airport_list.map(airport =>
                    <div class="list-li">
                        <Card style={card_class.root}>
                            <CardContent>
                                <Typography style={card_class.title}> {airport.name}</Typography>
                                <Typography style={card_class.content}> UID: {airport.uid}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => this.handleAirportProfileButtonPressed(airport.icao)}>Go to Profile</Button>
                            </CardActions>
                        </Card>
                    </div>
                    )}
                </ul>
            </div>
        )
    }
}