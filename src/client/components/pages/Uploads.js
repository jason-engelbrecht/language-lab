import React, {Fragment} from 'react'
import {
  MDBCardHeader,
  MDBIcon
} from 'mdbreact';
import UploadPreview from './upload_sections/UploadPreview';
import RecentUploads from './upload_sections/RecentUploads';
import Radio from './upload_sections/Radio';

const Uploads =  () => {
  return (
    <Fragment>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-7 mt-2 d-flex">
                <div className="card flex-fill">
                    <MDBCardHeader color="green">
                        <h5 className="mb-1 font-weight-normal"><MDBIcon icon="cloud-upload-alt" className="mr-2" />New Upload</h5>
                    </MDBCardHeader>
                    <div className="card-body">
                        <Radio/>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-5 mt-2 d-flex" id="uploads">
                <div className="card flex-fill">
                    <RecentUploads/>
                </div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-sm-12 col-m-6">
                <div className="card">
                    <UploadPreview/>
                </div>
            </div>
        </div>

        <div className="empty"> </div>
    </Fragment>
  )
};

export default Uploads;
