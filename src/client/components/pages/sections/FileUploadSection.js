import React, {Component} from "react";
import {MDBRow} from "mdbreact";

class FileUploadSection extends Component {
    render(){
        return(
            <MDBRow class="mb-4">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="upload-label">Upload</span>
                    </div>
                    <div className="custom-file">
                        <form action="">
                            <input type="file" className="file-upload" id="xlsx-upload"/>
                            <label className="custom-file-label" htmlFor="xlsx-upload">Choose file</label>
                            <input type="submit" name="Upload"/>
                        </form>

                    </div>
                </div>
            </MDBRow>
        )
    }
}

export default FileUploadSection;

