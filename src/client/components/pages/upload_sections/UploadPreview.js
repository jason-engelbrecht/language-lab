import React, { Component } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import * as api from '../../../api';
import {clickedTR} from "./RecentUploads";

class UploadPreview extends Component {
    state = {};
    interval;

    constructor() {
        super();
        this.getRecentTRData();
    }

    getRecentTRData = () => {
        if (clickedTR.clickedFile !== '') {
            api.fetchRecentTRData(clickedTR.clickedFile).then(recentData => {
                // console.log("Recent: " + recentData[0].data);
                recentData = recentData[0].data;
                this.setState({recentData});
                console.log("clicked: " + clickedTR);
            });
        }
    };

    componentDidMount() {
        this.interval = setInterval(this.getRecentTRData.bind(this), 500);
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
            <MDBCard className="hide" id="hide">
            <MDBCardBody>
            <MDBTable scrollY hover responsive>
        <MDBTableHead color="green lighten-1">
            <tr>
            <th>#</th>
            <th>First Name</th>
        <th>Last Name</th>
        <th>Hours</th>
        </tr>
        </MDBTableHead>
        <MDBTableBody>
        {
            this.state.recentData ?
                this.state.recentData.map(info =>
                <tr key={info._id}>
                    <td>{info._id}</td>
                    <td>{info.first_name}</td>
                    <td>{info.last_name}</td>
                    <td>{info.hours}</td>
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

