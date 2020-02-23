import * as React from "react";
import PropTypes from "prop-types";

const ErrorDailog = (props) => (<div>{props.error["msg"]}</div>);

ErrorDailog.prototypes = {
    error: PropTypes.object.isRequired
    
}

export default ErrorDailog;