import * as React from "react";
import PropTypes from "prop-types";
import  "./sliderButton.css";

const SliderButton = React.memo((props) => {
    const {buttonType, showText} = props; // Prev or next
      return (
          <div className={buttonType+"Btn " + "vertical-center"} onClick={() => props.sliderButtonClick(buttonType)}>
            {showText && buttonType}
          </div>
      )
});

SliderButton.propTypes = {
 buttonType: PropTypes.oneOf(['Prev', 'Next']), // This limites the value of buttonType prop to specific values
 sliderButtonClick: PropTypes.func.isRequired,
 showText: PropTypes.bool
};

export default SliderButton;
