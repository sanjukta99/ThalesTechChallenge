import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Button, colors, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Map from './Map';

const cardStyleTop = {
  title: {
    fontSize: 32,
    fontFamily: 'Lato'
  },
  content: {
    fontSize: 22,
    fontFamily: 'Lato'
  },
  root: {
    minHeight: 130,
    maxWidth: 400,
    marginBottom: 30,
  },
};

const cardStyleBottom = {
  root: {
    maxWidth: 400,
    minHeight: 320,
    marginBottom: 25,
    maxHeight: 320,
    overflow: 'auto',
  },
};

const cardStyleLeft = {
  root: {
    minHeight: 500,
    maxHeight: 500,
    maxWidth: 700,
    marginBottom: 20,
    borderColor: 'red'
  },
};

const typoStyle = {
  content: {
    fontFamily: "Lato",
    fontSize: "24"
  }
};


export default class AirportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            name: '',
            latitude: '',
            longitude: '',
            altitude: '',
            sids: [],
            sid: true
        }
        this.icao = this.props.match.params.icao;
    }

    componentDidMount() {
        fetch("/api/get-airport" + "?icao=" + this.icao)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            uid: data.uid,
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            altitude: data.altitude
          });
        });
    }

    handleSIDsButtonPressed() {
        fetch("/api/get-sids-icao?" + "icao=" + this.icao)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              sids: data,
              sid: true
            });
          });
      }

      handleSTARsButtonPressed() {
        fetch("/api/get-stars-icao?" + "icao=" + this.icao)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              sids: data,
              sid: false
            });
          });
      }

    render(){
      const card_class_top = cardStyleTop;
      const card_class_bottom = cardStyleBottom;
      const card_class_left = cardStyleLeft;
      const typo_class = typoStyle;

        return (
            <div class="map-container">
              <ul>
                <div class="div-left">
                  <Card style={card_class_left.root} variant="outlined">
                    <CardContent>
                      <Map name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude}/>
                    </CardContent>
                  </Card>
                </div>
                <div class="div-right">
                  <Card style={card_class_top.root}>
                      <CardContent>
                          <Typography style={card_class_top.title}>{this.state.name}</Typography>
                          <Typography style={card_class_top.content}> UID: {this.state.uid}</Typography>
                          <Typography style={card_class_top.content}> ICAO: {this.icao}</Typography>
                      </CardContent>
                  </Card>
                  <Card style={card_class_bottom.root}>
                      <div class="buttons-center">
                        <Button variant="contained" onClick={() => this.handleSIDsButtonPressed()} color={(this.state.sid)? "primary": "default"}>SIDs</Button>
                        <Button variant="contained" onClick={() => this.handleSTARsButtonPressed()} color={(this.state.sid)? "default": "primary"}>STARs</Button>
                      </div>
                      <CardContent>
                        <Typography style={typo_class.content}> List of {this.state.sid ? "SIDs" : "STARs"} </Typography>
                        <Typography style={typo_class.content}>
                          <List>
                              { this.state.sids.map(sid =>
                                  <ListItem>
                                      <ListItemText style={typo_class.content}> {sid.name}</ListItemText>
                                  </ListItem>
                              )}
                          </List>
                          </Typography>
                      </CardContent>
                    </Card>
                </div>
              </ul>
            </div>
        )
    }
}