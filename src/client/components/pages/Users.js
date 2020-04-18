import React, {useEffect, useState} from 'react'
import {
    MDBCard,
    MDBCol,
    MDBRow,
    MDBView,
    MDBMask,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn,
    MDBIcon,
    MDBModal, MDBModalHeader, MDBModalBody
} from 'mdbreact';
import {Link} from "react-router-dom";
import Message from "./upload_sections/Message";
import * as api from "../../api";

const Users = () => {
    const [newEmail, setEmail] = useState();
    const [newPW, setPW] = useState();
    const [msgType, setMsgType] = useState("success");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [delModal, showDelModal] = useState(false);
    const [delEmail, setDeleteEmail] = useState();

    useEffect( () => {
        getUsers();


        // console.log(users);
    }, []);

    const getUsers = () => {
        api.getUsers().then(res => {
            // console.log(res.data);
            setUsers(res.data.users);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(newEmail && newEmail !== '' && newPW && newPW !== '') {
            api.registerUser(newEmail, newPW).then(res => {
                console.log("response: " + res);
                if(res === 'user added') {
                    setMsgType("success");
                    setMessage("New user successfully added!");
                    getUsers();
                } else {
                    setMessage(res);
                    setMsgType("danger");
                    setRecentRegister(false);
                }

            });
        }
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };

    const pwChange = (e) => {
        setPW(e.target.value);
    };

    const onDelClick = (e) => {
        e.preventDefault();
        setDeleteEmail(e.target.previousSibling.innerHTML);
        showDelModal(true);
        $("#modal").modal('show');
        console.log("delModal: " + delModal);
    };

    // const hideModal = (e) => {
    //     e.preventDefault();
    //     showDelModal(false);
    // };

    const deleteEmail = (e) => {
        e.preventDefault();
        // console.log("email: " + email);
        if(delEmail && delEmail !== '') {
            api.deleteUser(delEmail).then(res => {
                console.log("delete response: " + res);
                setMessage(res);
                setMsgType("primary");
            });
            getUsers();
            $("#modal").modal('hide');
        }
        // setMessage(`${email} deleted.`);
    };


    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <div className="column">
                    <div className="container">
                        <div className="card mx-auto" style={{width: "22rem"}}>
                            <form className="p-5" onSubmit={handleSubmit} autoComplete="on">

                                <h4 className="mb-4 text-center">Add New User</h4>

                                <div className="md-form mb-3">
                                    <input type="email"
                                           id="email"
                                           className="form-control"
                                           name="email"
                                           autoComplete="email"
                                           onChange={emailChange}/>
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="md-form">
                                    <input type="password"
                                           id="password"
                                           className="form-control"
                                           name="password"
                                           autoComplete="new-password"
                                           onChange={pwChange}/>
                                    <label htmlFor="password">Password</label>
                                    <small id="password-helper" className="form-text text-muted">
                                        Must be at least 8 characters long
                                    </small>
                                </div>

                                <button className="btn btn-outline-success btn-block my-5" type="submit">Submit</button>
                                {message ? <Message msg={message} msgType={msgType}/> : null}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users ?
                                users.map(user =>
                                    <tr key={user.email}>
                                        <td>{user.email}</td>
                                        <td className="text-center text-danger font-weight-bold" onClick={onDelClick}>x</td>
                                    </tr>

                                )
                                :
                                <tr>
                                    <td>Users</td>
                                    <td>Loading</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" tabIndex="-1" role="dialog" id="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {delEmail}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={deleteEmail}>Delete</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Users;
