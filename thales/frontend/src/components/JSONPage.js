import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default class JSONPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: true,
            sids: []
        }
        this.handleSlackButtonPressed = this.handleSlackButtonPressed.bind(this);
    }

    componentDidMount() {
        fetch("/api/get-sids-json")
        .then((response) => response.json())
        .then((data) => {
            const sids = data;
            this.setState({ 
              sids: sids
            });
          });
        console.log(this.state.sids)
    }

    handleSIDsButtonPressed() {
        fetch("/api/get-sids-json?" + "icao=" + this.icao)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              sids: data,
              sid: true
            });
          });
      }

    handleSTARsButtonPressed() {
        fetch("/api/get-stars-json?" + "icao=" + this.icao)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              sids: data,
              sid: false
            });
          });
    }

    handleSlackButtonPressed() {
      if (this.state.sid) { 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.sids, null, 2)
        }
        fetch("/api/sids-slack-notif", requestOptions)
          .then((response) => response.json());
      } else {
          const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.sids, null, 2)
        }
        fetch("/api/stars-slack-notif", requestOptions)
          .then((response) => response.json());
      }
    }

    render(){
        return (
            <div class="json-container">
              <ul class="json-ul">
                <li class="json-li">
                  <Button variant="contained" onClick={() => this.handleSIDsButtonPressed()} color={(this.state.sid)? "primary": "default"}> SIDs JSON</Button>
                  <Button variant="contained" onClick={() => this.handleSTARsButtonPressed()} color={(this.state.sid)? "default": "primary"}> STARs JSON</Button>
                </li>
                <br></br>
                <li class="json-li-json">
                    <pre>{JSON.stringify(this.state.sids, null, 2) }</pre>
                </li>
                <br></br>
                <li class="json-li">
                <Button variant="contained" onClick={() => this.handleSlackButtonPressed()} color="secondary">SLACK BOT</Button>
                </li>
              </ul>
            </div>
        )
    }
}