import * as React from "react";
import SliderButton from "./SliderButton/index";
import Slider from "./Slider/index";
import "./carousel.css";

const noOFItemsVisible = (itemSize, windowWidth) => {
    const showItems = Math.floor(windowWidth / itemSize);
    return showItems;
}

class Carousel extends React.PureComponent {
    onSliderButtonClick = (buttonType) => {
        const { noOfItemsInCarousel, showItems } = this.state;
        if (buttonType === "Next") {
            this.setState((previousState) => {
                const activeIndexes = [...previousState.activeIndexes];
                for (let i = 0; i < showItems; i++) {
                    if (activeIndexes[i] !== noOfItemsInCarousel - 1)
                        activeIndexes[i] += 1;
                    else
                        activeIndexes[i] = 0;
                }
                return { activeIndexes: activeIndexes }
            });
        }
        else {
            this.setState((previousState) => {
                const activeIndexes = [...previousState.activeIndexes];
                for (let i = 0; i < showItems; i++) {
                    if (activeIndexes[i] !== 0)
                        activeIndexes[i] -= 1;
                    else
                        activeIndexes[i] = noOfItemsInCarousel - 1;
                }
                return { activeIndexes: activeIndexes }
            });
        }
    }

   // This method is used to update the windowWidth and  items visible in the carousel when screen size changes
      updateCarouselItems = () => {
        let itemSize = 240;
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let showItems = noOFItemsVisible(itemSize,windowWidth);
        let activeIndexes = []
       for (let i = 0; i < showItems; i++) // initiate the array of active indexes 
            activeIndexes.push(i);
        
        this.setState({ windowWidth , showItems, activeIndexes});
      }

    constructor(props) {
        super(props);

        this.state = {
            items: [], // list of carousel items
            isLoaded: false, // state to show of data is loaded or not
            activeIndexes: [], // array containing indexes of items(images) visible in carousel
            noOfItemsInCarousel: 6, 
            showItems: 0, // number of active items to be shown in carousel depending on screen size
            windowWidth:0, 
            error: null
        }
        this.updateCarouselItems = this.updateCarouselItems.bind(this);
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
                  ,
                  (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                  }
            )

            this.updateCarouselItems();
            window.addEventListener("resize", this.updateCarouselItems);
            
    }

      componentWillUnmount() {
        window.removeEventListener("resize", this.updateCarouselItems.bind(this));
      }

    render() {

        const { activeIndexes, items , windowWidth} = this.state;
        return (
            <>
                {
                   windowWidth > 480 ? // Placement of buttons and slider changes for mobile and desktop
                        <>
                            <Slider items={items} activeIndexes={activeIndexes} />
                            <div className="sliderBtnContainer">
                                <SliderButton buttonType="Prev" showText={true} sliderButtonClick={this.onSliderButtonClick} />
                                <SliderButton buttonType="Next" showText={true} sliderButtonClick={this.onSliderButtonClick} />
                            </div>
                        </> :
                        <div style={{ display: "flex" }}>
                            <SliderButton buttonType="Prev" showText={false} sliderButtonClick={this.onSliderButtonClick} />
                            <Slider items={items} activeIndexes={activeIndexes} />
                            <SliderButton buttonType="Next" showText={false} sliderButtonClick={this.onSliderButtonClick} />
                        </div>
                }

            </>
        );
    }

}

export default Carousel;
