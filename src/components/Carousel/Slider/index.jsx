import * as React from "react";
import PropTypes from "prop-types";
import CarouselItem from "../CarouselItem/index";
import "./slider.css";

const Slider = React.memo((props) => {
    const { activeIndexes, items } = props;
    return (
        <div className={"carouselItemContainer "}>    
        {
                items.length > 0 && activeIndexes.map((activeIndex) => {
                    const item = items[activeIndex];
                    const imageInfo = {
                        url: item.webformatURL
                    }
                    return <CarouselItem key={item.id} imageInfo={imageInfo} user={item.user} likes={item.likes} />;
                })
            }
        </div>
    )
});

Slider.prototypes = {
    activeIndexes: PropTypes.arrayOf(PropTypes.number).isRequired,
    items: PropTypes.object.isRequired,
}


export default Slider;