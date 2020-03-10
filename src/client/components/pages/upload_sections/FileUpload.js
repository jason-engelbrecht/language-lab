import React, {Fragment, useState } from "react";
import axios from "axios";
import Message from './Message';
import Progress from "./ProgressBar";

const FileUpload = (props) => {
    // set the input tag id in component props
    let inputID = props.inputID;
    console.log("input id: " + props.inputID);
    console.log("updated staffing? " + props.staffing);
    console.log("updated language? " + props.language);
    // TODO: inputID file1 = first type,  file2 = second type?
    // react hooks => generates methods?
    const [file, setFile] = useState(''); // sets default
    // sets the starting filename to "choose file"
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [msgType, setMsgType] = useState('');

    const fileChange = e => {
        // html file input allows multiples so stores as an array
        setFile(e.target.files[0]);
        // get the name property of the file
        setFilename(e.target.files[0].name);
    };


    const onSubmit = async e => {
        e.preventDefault();
        let reportType = 'proficiency';
        const formData = new FormData();
        // constant was created on server.js 'file', setting it with the hook setFile
        formData.append('file', file);
        formData.append('quarter', props.quarter);
        formData.append('year', props.year);
        if(props.language) {
            formData.append('language', props.language);
            reportType = 'lab';
        }
        if(props.staffing) {
            formData.append('support', props.staffing);
        }

        try {
            const res = await axios.post(`/upload/${reportType}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setMsgType('warning');
                    setMessage('Securing Student IDs');
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    // Clear after 10 seconds
                }
            });
            const {filename, filePath} = res.data;
            setUploadedFile( { filename, filePath });
            setMsgType('success');
            setMessage('File Uploaded: ' + filename);
            setTimeout(() => {
                setUploadPercentage(0);
                setFilename('');
            }, 10000);
            console.log(res.data);
        } catch(err) {
            setMsgType('danger');
            if(err.response.status === 500) {
                setMessage('There was a problem with the server.');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };

    return(
        <Fragment>
            { message ? <Message msg={message} msgType={msgType}/> : null }
            <form className="input-group" onSubmit={onSubmit}>
                <div className="custom-file">
                    {/*runs the 'onchange' function onchange*/}
                    <input type="file" className="custom-file-input"
                           accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                           id={inputID} onChange={fileChange}/>
                    {/* sets filename to the state of 'filename' variable */}
                    <label className="custom-file-label" htmlFor="inputGroupFile"
                           aria-describedby="inputGroupFileAddon">{filename}</label>
                </div>
                <div className="input-group-append">
                    <input type="submit" value="Upload"
                           className="input-group-text btn-success" id={inputID + "FileAddon"} />
                </div>

            </form>
            { uploadPercentage !== 0 ?
                <div className="row mt-2">
                    <div className="col m-auto">
                        <Progress percentage={uploadPercentage} />
                    </div>
                </div>
                : null
            }
        </Fragment>
    )
};

export default FileUpload;
