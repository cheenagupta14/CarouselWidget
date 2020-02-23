import * as React from "react";
import PropTypes from "prop-types";

import "./carouselItem.css";

const CarouselItem = React.memo((props) => {
    const {user, likes, imageInfo} = props;
    return (
        <div className="itemDiv">
            <div className="imageHolder">
            <img src={imageInfo.url} className="image" alt={imageInfo.tags}></img>
            </div>
            <div>
            <label style={{float:"left"}} >{user}</label>
            <label style={{float:"right"}}>{likes}</label>
            </div>
        </div>
    )
});

CarouselItem.propTypes = {
    "imageInfo": PropTypes.object.isRequired,
    "user": PropTypes.string.isRequired, 
    "likes": PropTypes.number.isRequired
};

export default CarouselItem;