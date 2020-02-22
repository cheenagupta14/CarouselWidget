import * as React from "react";
import PropTypes from "prop-types";

import CarouselItem from "../CarouselItem/index";

const Slider = React.memo((props) => {
    const { activeIndexs, items } = props;
    return (
        <div>
            {
                items.length > 0 && activeIndexs.map((activeIndex) => {
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
    activeIndexs: PropTypes.arrayOf(PropTypes.number).isRequired,
    items: PropTypes.object.isRequired
}


export default Slider;