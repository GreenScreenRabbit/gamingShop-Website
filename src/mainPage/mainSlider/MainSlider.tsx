import { connect } from "react-redux"
import './mainSlider.css'
import slider1 from '../../sliders/slider1.jpg'
import slider2 from '../../sliders/slider2.jpg'
import slider3 from '../../sliders/slider3.jpg'
import slider4 from '../../sliders/slider4.jpg'
import { useRef, useState } from "react"



const MainSlider = () => {

    const sliderImgContainerRef = useRef<HTMLDivElement>(null)
    const [sliderOffsetWidth, setSliderOffsetWidth] = useState<number>(0)






    const slidersImg: string[] = []

    slidersImg.push(slider1, slider2, slider3, slider4)


    const changeSliderLinePosition = (isNextSlider: boolean) => {





        let sliderContainerOffsetWidth = sliderImgContainerRef.current?.offsetWidth




        const totalWidth = sliderContainerOffsetWidth! * slidersImg.length





        if (isNextSlider == true) {
            if (totalWidth == sliderOffsetWidth + sliderContainerOffsetWidth!) {
                setSliderOffsetWidth(0)
            } else {
                setSliderOffsetWidth(sliderOffsetWidth + sliderImgContainerRef.current?.offsetWidth!);
            }
        } else {
            if (sliderOffsetWidth == 0) {
                setSliderOffsetWidth(totalWidth - sliderContainerOffsetWidth!)
            } else {
                setSliderOffsetWidth(sliderOffsetWidth - sliderImgContainerRef.current?.offsetWidth!);
            }
        }
    }


    return (
        <>
            <div className="mainSlider-body">

                <div className="mainSlider-sliderContainer">
                    <div className="mainSlider-sliderPosition">
                        <div className="mainSlider-slider" >
                            <div className="mainSlider-sliders-container" ref={sliderImgContainerRef}
                                style={{
                                    transform: `translate(-${sliderOffsetWidth}px)`,
                                    transition: 'transform 2s',


                                }}
                            >
                                <div className="mainSlider-sliders-imgInLine">

                                    {slidersImg.map((img) => {
                                        return <img src={img} className="mainSlider-sliders-img" />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mainSlider-leftButton" onClick={() => changeSliderLinePosition(false)}></div>
                        <div className="mainSlider-rightButton" onClick={() => changeSliderLinePosition(true)}></div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default connect(null, null)(MainSlider)