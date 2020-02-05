import React, {Component, Fragment, useState } from "react";
import axios from "axios";

import {MDBCol, MDBRow} from "mdbreact";

const FileUploadSection = () => {
    // react hooks => generates methods?
    const [file, setFile] = useState(''); // sets default
    // sets the starting filename to "choose file"
    const [filename, setFilename] = useState('Choose File');
    const[uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        // html file input allows multiples so stores as an array
        setFile(e.target.files[0]);
        // get the name property of the file
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        // constant was created on server.js 'file', setting it with the hook setFile
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName, filePath} = res.data;
            setUploadedFile( {fileName, filePath });
        } catch(err) {
            console.log(err);
        }
    };

    return(
        <Fragment>
            <MDBRow className="mb-4">
                <form className="input-group mb-3" onSubmit={onSubmit}>
                    <div className="custom-file">
                        {/*runs the 'onchange' function onchange*/}
                        <input type="file" className="custom-file-input" id="inputGroupFile" onChange={onChange}/>
                        {/* sets filename to the state of 'filename' variable */}
                        <label className="custom-file-label" htmlFor="inputGroupFile"
                               aria-describedby="inputGroupFileAddon">{filename}</label>
                    </div>
                    <div className="input-group-append">
                        <input type="submit" value="Upload"
                               className="input-group-text btn-success" id="inputGroupFileAddon" />
                    </div>
                </form>
            </MDBRow>
        </Fragment>
    )

};

export default FileUploadSection;