import React, {Component} from 'react';
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
            api.fetchLabTRData(clickedTR.clickedFile).then(labData => {
                if(labData.hasOwnProperty(0)){
                    labData = labData[0];
                    labData.students = labData.data.length;
                    delete labData.data;
                    delete labData._id;
                }
                return({result: labData});
            }).then(query => {
                if(query.result.length === 0) {
                    api.fetchProfTRData(clickedTR.clickedFile).then(profData => {
                        profData = profData[0];
                        profData.students = profData.data.length;
                        delete profData.data;
                        delete profData._id;
                        let recentData = Array.from(profData);
                        this.setState({recentData});
                        // console.log("prof: " + profData);
                        // for(let i in profData) {
                        //     console.log(i + ": " + profData[i]);
                        // }
                    });
                } else {
                    // console.log("query: " + query.result);
                    // for(let i in query.result) {
                    //     console.log(i + ": " + query.result[i]);
                    // }
                    let recentData = query.result;
                    let test = query.result;
                    // Object.entries(test).map((a, b) => {
                    //     console.log(a + " - " + b);
                    // });
                    this.setState({test});
                    this.setState({recentData});
                }
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
                            {/*<tr>*/}
                            {/*    <th>#</th>*/}
                            {/*    <th>First Name</th>*/}
                            {/*    <th>Last Name</th>*/}
                            {/*    <th>Hours</th>*/}
                            {/*</tr>*/}
                            <tr>
                                {
                                    this.state.recentData ?
                                        Object.keys(this.state.recentData).map((key) => {
                                            return <td key={key}>{key.substr(0,1).toUpperCase() + key.substr(1)}</td>
                                        })
                                        : console.log("no header loaded")
                                }
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.state.recentData?
                                    // this.state.recentData.map(info =>
                                    //     <tr key={info._id}>
                                    //         <td>{info._id}</td>
                                    //         <td>{info.first_name}</td>
                                    //         <td>{info.last_name}</td>
                                    //         <td>{info.hours}</td>
                                    //     </tr>
                                    // )
                                    <tr>
                                        {Object.keys(this.state.recentData).map((value) => {
                                            return <td key={value}>{this.state.recentData[value]}</td>
                                        })}
                                    </tr>
                                    : console.log("wait2")
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        );
    }
}

export default UploadPreview;

