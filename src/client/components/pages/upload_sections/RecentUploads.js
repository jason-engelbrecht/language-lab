import React, { Component } from 'react';
import * as api from '../../../api';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon, MDBRow,
  MDBTableBody,
} from 'mdbreact';

//exports clicked row data
export let clickedTR = {
  clickedFile: ''
};

class RecentUploads extends Component {
  state = {};
  // interval;

  //useful for setting initial state
  constructor(props) {
    super(props);
    this.getRecentUploads();
    this.state = { quarter: ''};
  }

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = () => {
    var recentUploads = [];
    api.fetchProficiencyUploads().then(recentProciency => {
      recentProciency.map(function(file) {
        let date = new Date(file.date);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        file.date = month + "/" + day + "/" + year;
        recentUploads.push(file);
        console.log("prof file: " + file.date);
      })
    });
    api.fetchRecentUploads().then(recentUp => {
      recentUp.map(function(file) {
        let date = new Date(file.date);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        file.date = month + "/" + day + "/" + year;
        recentUploads.push(file);
        console.log("recent file: " + file.date);
      });

      console.log("Uploads: " + recentUploads);
      this.setState({recentUploads});
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.getRecentUploads.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showRow(file) {
    //shows table once a row is clicked
    var NAME = document.getElementById("hide");
    NAME.className="show";

    //sends data from row clicked to table
    let id = file._id;
    clickedTR = {
      clickedFile: id
    };
  }

  quarterHandler = (quarter) => {
    this.setState({quarter});
  };

  render() {

    const quarterChange = (e) => {
      this.quarterHandler(e.target.value);
    };

    return (
        <MDBCard className="flex-fill">
          <MDBCardHeader color="green">
            <MDBRow className="pr-1">
              <h5 className="mb-1 mt-1 font-weight-normal col-8"><MDBIcon icon="list-ul" className="mr-2"/>Recent Uploads</h5>
              <select className="custom-select browser-default col-3" onChange={quarterChange}>
                <option>Quarter</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </MDBRow>

          </MDBCardHeader>
          <MDBCardBody id="cardTable">
            <table className="table table-wrapper-scroll-y my-custom-scrollbar" id="table">
              <MDBTableBody>
                {
                  this.state.recentUploads ?
                      this.state.recentUploads.map(recentUpload =>
                          <tr key={recentUpload._id} onClick={(e) => this.showRow(recentUpload, e)}>
                            <td>
                              <MDBIcon icon="check" className="mr-3 text-success"/>
                              {recentUpload.filename}
                            </td>
                            <td>
                              {recentUpload.date}
                            </td>
                          </tr>)
                      : console.log('wait')
                }
              </MDBTableBody>
            </table>
          </MDBCardBody>
        </MDBCard>
    );
  }
}

export default RecentUploads;

