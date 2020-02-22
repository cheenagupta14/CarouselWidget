import * as React from "react";
import SliderButton from "./SliderButton/index";
import Slider from "./Slider/index";
import "./carousel.css";

const noOFItemsVisible = (itemSize) => {
    const showItems = Math.floor(window.innerWidth / itemSize);
    return showItems;
}

class Carousel extends React.PureComponent {
    onSliderButtonClick = (buttonType) => {
        const { noOfItemsInCarousel, showItems } = this.state;
        if (buttonType === "Next") {
            this.setState((previousState) => {
                const activeIndexs = [...previousState.activeIndexs];
                for (let i = 0; i < showItems; i++) {
                    if (activeIndexs[i] !== noOfItemsInCarousel - 1)
                        activeIndexs[i] += 1;
                    else
                        activeIndexs[i] = 0;
                }
                return { activeIndexs: activeIndexs }
            });
        }
        else {
            this.setState((previousState) => {
                const activeIndexs = [...previousState.activeIndexs];
                for (let i = 0; i < showItems; i++) {
                    if (activeIndexs[i] !== 0)
                        activeIndexs[i] -= 1;
                    else
                        activeIndexs[i] = noOfItemsInCarousel - 1;
                }
                return { activeIndexs: activeIndexs }
            });
        }
    }

    constructor(props) {
        super(props);
        const showItems = noOFItemsVisible(240);
        const activeIndexs = [];

        for (let i = 0; i < showItems; i++) // initiate the array of active indexes 
            activeIndexs.push(i);

        this.state = {
            items: [],
            isLoaded: false,
            activeIndexs: activeIndexs,
            noOfItemsInCarousel: 6,
            showItems: showItems
        }
    }

    componentDidMount() {
        fetch("https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo")
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.hits.slice(0, this.state.noOfItemsInCarousel)
                    });
                }
                //   ,
                //   // Note: it's important to handle errors here
                //   // instead of a catch() block so that we don't swallow
                //   // exceptions from actual bugs in components.
                //   (error) => {
                //     this.setState({
                //       isLoaded: true,
                //       error
                //     });
                //   }
            )
    }

    render() {

        const { activeIndexs, items } = this.state;
        return (
            <>
                {
                    window.innerWidth > 480 ? // Placement of buttons and slider changes for mobile and desktop
                        <>
                            <Slider items={items} activeIndexs={activeIndexs} />
                            <div className="sliderBtnContainer">
                                <SliderButton buttonType="Prev" showText={true} sliderButtonClick={this.onSliderButtonClick} />
                                <SliderButton buttonType="Next" showText={true} sliderButtonClick={this.onSliderButtonClick} />
                            </div>
                        </> :
                        <div style={{ display: "flex" }}>
                            <SliderButton buttonType="Prev" showText={false} sliderButtonClick={this.onSliderButtonClick} />
                            <Slider items={items} activeIndexs={activeIndexs} />
                            <SliderButton buttonType="Next" showText={false} sliderButtonClick={this.onSliderButtonClick} />
                        </div>
                }

            </>
        );
    }

}

export default Carousel;
