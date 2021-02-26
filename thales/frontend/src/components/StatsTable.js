import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default class StatsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sid: true,
            table_data: []
        }
    }

    componentDidMount(){
        fetch("/api/sids-table")
        .then((response) => response.json())
        .then((data) => {
            const table_data = data;
            this.setState({
              sid: true, 
              table_data: table_data
            });
          });
    }

    handleSIDsButtonPressed() {
        fetch("/api/sids-table")
          .then((response) => response.json())
          .then((data) => {
            const table_data = data;
            this.setState({
                sid: true,
                table_data: table_data
            });
          });
      }

    handleSTARsButtonPressed() {
        fetch("/api/stars-table")
          .then((response) => response.json())
          .then((data) => {
            const table_data = data;
            this.setState({
                sid: false,
                table_data: table_data
            });
          });
    }
    
    render(){ 
        const classes = useStyles;
        return (
            <div>
                <div class="table-buttons-container">
                    <Button variant="contained" onClick={() => this.handleSIDsButtonPressed()} color={(this.state.sid)? "primary": "default"}> SIDs Statistics</Button>
                    <Button variant="contained" onClick={() => this.handleSTARsButtonPressed()} color={(this.state.sid)? "default": "primary"}> STARs Statistics</Button>
                </div>
            <div class="table-container">
                <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Airport &nbsp; &nbsp; &nbsp; Waypoint &nbsp; &nbsp; &nbsp; Count</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.table_data.map((row) => (
                        <div>
                            <TableCell >
                                {row.airport}
                            </TableCell>
                            <TableCell align="left">
                                {row.waypoint}
                            </TableCell>
                            <TableCell align="left">
                                {row.count}
                            </TableCell>
                        </div>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            </div>
        );
    }
}