/*
    Closeable message component
    TODO: adjust color: alert-info = light blue
 */
import React from 'react';
import PropTypes from 'prop-types';

// customizable message text using property
const Message = ({msg, msgType}) => {
    return (
        <div className={`alert alert-${msgType} alert-dismissible fade show`} role="alert">
            {msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};

Message.propTypes = {
    msg: PropTypes.string.isRequired
};

export default Message;