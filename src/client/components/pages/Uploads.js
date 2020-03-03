import React, {Fragment} from 'react'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon
} from 'mdbreact';
import UploadPreview from './upload_sections/UploadPreview';
import RecentUploads from './upload_sections/RecentUploads';
import Radio from './upload_sections/Radio';

const Uploads =  () => {
  return (
    <Fragment>

            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-7 mt-2 d-flex">
                    <div class="card flex-fill">
                        <MDBCardHeader color="green">
                            <h5 className="mb-1 font-weight-normal"><MDBIcon icon="cloud-upload-alt" className="mr-2" />New Upload</h5>
                        </MDBCardHeader>
                        <div class="card-body">
                            <Radio/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5 mt-2 d-flex">
                    <div class="card flex-fill">
                        <RecentUploads/>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-sm-12 col-m-6">
                    <div class="card">
                        <UploadPreview/>
                    </div>
                </div>
            </div>


        <div className="empty"> </div>

    </Fragment>
  )
};

export default Uploads;
