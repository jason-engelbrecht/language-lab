import React, { Component } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import * as api from '../../../api';

class UploadPreview extends Component {
    state = {};
    interval;

    constructor() {
        super();
        this.getRecentData();
    }

    getRecentData = () => {
        api.fetchRecentData().then(recentData => {
            // console.log("Recent: " + recentData[0].data);
            recentData = recentData[0].data;
            this.setState({recentData});
            // console.log(recentData);
        });
    };

    componentDidMount() {
        this.interval = setInterval(this.getRecentData.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        // let lastUpload = this.state.recentData;
        // if(this.state.recentData) {
        //     let students = [];
        //     let lastUpload = this.state.recentData[0].data;
        //     console.log(lastUpload);
        //     for (let i = 0; i < lastUpload.length; i++) {
        //         console.log(lastUpload[i].first_name);
        //     }
        // }


        return (
            <MDBCard>
                <MDBCardBody>
                    <MDBTable hover>
                        <MDBTableHead color="green lighten-1">
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.state.recentData ?
                                    this.state.recentData.map(info =>
                                        <tr key={info.id}>
                                            <td>{info.id}</td>
                                            <td>{info.first_name}</td>
                                            <td>{info.last_name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.gender}</td>
                                        </tr>

                                    ) : console.log("wait2")
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>

        );
    }
}

export default UploadPreview;
