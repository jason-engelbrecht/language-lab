import React, {Component} from 'react';
import * as api from '../../../api';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead,} from 'mdbreact';

//exports clicked row data
export let clickedTR = {
  clickedFile: ''
};

class RecentUploads extends Component {
  state = {};

  //useful for setting initial state
  constructor(props) {
    super(props);
    this.getRecentUploads();
    this.state = { quarter: ''};
  }

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = (quarter) => {
    // array to hold both types of files
    var recentUploads = [];
    //arrays to hold quarters
    var fall = [];
    var winter = [];
    var spring = [];
    var summer = [];
    //sort files by quarter
    function sortQuarter(file) {
      if (file.quarter === 'Fall') {
        fall.push(file);
      }
      else if (file.quarter === 'Winter') {
        winter.push(file);
      }
      else if (file.quarter === 'Spring') {
        spring.push(file);
      }
      else {
        summer.push(file);
      }
    }
    // format date
    function formatDate(file) {
      let date = new Date(file.date);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      file.date = month + "/" + day + "/" + year;
    }
    // get proficiency data files
    api.fetchProficiencyUploads().then(recentProciency => {
      recentProciency.map(function(file) {
        formatDate(file);
        sortQuarter(file);
        recentUploads.push(file);
      })
    });
    // get lab hour files
    api.fetchRecentUploads().then(recentUp => {
      recentUp.map(function(file) {
        formatDate(file);
        sortQuarter(file);
        recentUploads.push(file);
      });
      //sort all uploaded files by date
      recentUploads = recentUploads.slice().sort((a, b) => b.date - a.date);
      // change table based on quarter
      if (quarter === 'Fall') {
        recentUploads = fall;
      }
      if (quarter === 'Winter') {
        recentUploads = winter;
      }
      if (quarter === 'Spring') {
        recentUploads = spring;
      }
      if (quarter === 'Summer') {
        recentUploads = summer;
      }
      this.setState({recentUploads});
    });
  };

  componentDidMount() {
    this.getRecentUploads.bind(this);
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

  render() {

    const quarterChange = (e) => {
      this.getRecentUploads(e.target.value);
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
            <MDBTable scrollY maxHeight="250px" id="table">
              <MDBTableHead >
                <tr>
                  <th>File</th>
                  <th>Quarter</th>
                  <th>Date</th>
                </tr>
              </MDBTableHead>
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
                              {recentUpload.quarter}
                            </td>
                            <td>
                              {recentUpload.date}
                            </td>
                          </tr>)
                      : console.log('wait')
                }
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
    );
  }
}

export default RecentUploads;

