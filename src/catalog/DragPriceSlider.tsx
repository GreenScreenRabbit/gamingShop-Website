import { useEffect, useRef, useState } from "react"
import { connect, RootStateOrAny } from "react-redux"
import { GamingDeviceType } from "../gamingDeviceType"
import { actions } from "../mainPage/actions and const/actions"
import './catalog.css'



type PropsType = {
    gamingDevices?: GamingDeviceType[],
    maxDragInPercent: number,
    minDragInPercent: number,
    maxPriceDevice: number,
    minPriceDevice: number,
    priceInOnePercent: number,
    filteredByPriceDevice: (arg0: GamingDeviceType[]) => void,
    setDragsIsActive: (arg0: boolean) => void,
}






const DragPriceSlider = (props: PropsType) => {



    useEffect(() => {
        setPriceSliderRefWidth(+priceSliderRef.current!.getBoundingClientRect().width)
    }, [])

    const [minDragTransformTranslate, setMinDragTransformTranslate] = useState<number>(0)

    const [maxDragTransformTranslate, setMaxDragTransformTranslate] = useState<number>(0)
    const [differenceBetweenMouseAndDiv, setDifferenceBetweenMouseAndDiv] = useState<number>()
    const [priceSliderRefWidth, setPriceSliderRefWidth] = useState<number>()


    const [filtredMinPrice, setFiltredMinPrice] = useState<number>(0)
    const [filtredMaxPrice, setFiltredMaxPrice] = useState<number>(666)





    const priceSliderRef = useRef<HTMLDivElement>(null)
    const minDragRef = useRef<HTMLDivElement>(null)
    const maxDragRef = useRef<HTMLDivElement>(null)



    const onDragFun = (e: React.DragEvent<HTMLDivElement>, isMinDrag: boolean) => {




        let minPrc = filtredMinPrice?.toString() ? filtredMinPrice : props.minPriceDevice
        let maxPrc = filtredMaxPrice?.toString() ? filtredMaxPrice : props.maxPriceDevice










        e.dataTransfer.setDragImage(new Image(), 0, 0);


        if (isMinDrag) {
            if (e.pageX != 0) {
                if (minDragTransformTranslate! >= 0 || e.pageX - differenceBetweenMouseAndDiv! + 24 - priceSliderRef.current!.getBoundingClientRect().x >= 0) {
                    if (minPrc + 1! < maxPrc) {
                        setFiltredMinPrice(+(+(Math.abs(minDragTransformTranslate! / (priceSliderRefWidth! / 100)).toFixed(0)) * props.priceInOnePercent).toFixed(0))
                        setMinDragTransformTranslate(e.pageX - differenceBetweenMouseAndDiv! + 24 - priceSliderRef.current!.getBoundingClientRect().x)
                    } else {
                        if (e.pageX - differenceBetweenMouseAndDiv! + 24 - priceSliderRef.current!.getBoundingClientRect().x < minDragTransformTranslate) {
                            setFiltredMinPrice(+(+(Math.abs(minDragTransformTranslate! / (priceSliderRefWidth! / 100)).toFixed(0)) * props.priceInOnePercent).toFixed(0))
                            setMinDragTransformTranslate(e.pageX - differenceBetweenMouseAndDiv! - priceSliderRef.current!.getBoundingClientRect().x    + 24)
                        }
                    }
                }
            }
        } else {
            if (e.pageX != 0) {
                if (e.pageX - priceSliderRef.current!.getBoundingClientRect().x + priceSliderRef.current!.getBoundingClientRect().width >= 0) {
                    if (e.pageX - differenceBetweenMouseAndDiv! - 18 - priceSliderRef.current!.getBoundingClientRect().x - priceSliderRef.current!.getBoundingClientRect().x <= 0) {
                        if (minPrc + 1! < maxPrc) {
                            setFiltredMaxPrice(props.maxPriceDevice - +(+(Math.abs(maxDragTransformTranslate! / (priceSliderRefWidth! / 100)).toFixed(0)) * props.priceInOnePercent).toFixed(0))
                            setMaxDragTransformTranslate(e.pageX - differenceBetweenMouseAndDiv! - 18 - priceSliderRef.current!.getBoundingClientRect().x - priceSliderRef.current!.getBoundingClientRect().x)
                        } else {
                            if (e.pageX - differenceBetweenMouseAndDiv! - 18 - priceSliderRef.current!.getBoundingClientRect().x - priceSliderRef.current!.getBoundingClientRect().x > maxDragTransformTranslate) {
                                setFiltredMaxPrice(props.maxPriceDevice - +(+(Math.abs(maxDragTransformTranslate! / (priceSliderRefWidth! / 100)).toFixed(0)) * props.priceInOnePercent).toFixed(0))
                                setMaxDragTransformTranslate(e.pageX - differenceBetweenMouseAndDiv! - 18 - priceSliderRef.current!.getBoundingClientRect().x - priceSliderRef.current!.getBoundingClientRect().x)
                            }
                        }
                    } else {
                        setFiltredMaxPrice(666)
                    }
                }
            }
        }


    }


    const funDifferenceBetweenMouseAndDiv = (e: React.DragEvent<HTMLDivElement>, inMinDrag: boolean) => {




        e.dataTransfer.setDragImage(new Image(), 0, 0);

        if (inMinDrag == true) {
            setDifferenceBetweenMouseAndDiv(+e.pageX - +minDragRef.current!.getBoundingClientRect().x)

        } else {
            setDifferenceBetweenMouseAndDiv(+e.pageX - +maxDragRef.current!.getBoundingClientRect().x)

        }


    }



    const filterPriceDevice = (e: React.DragEvent<HTMLDivElement>) => {

        props.setDragsIsActive(true)

        const filteredPricesDevice = props.gamingDevices!.filter((device) => {
            return device.price >= filtredMinPrice! && device.price <= filtredMaxPrice!
        })


        console.log(filteredPricesDevice);
        props.filteredByPriceDevice(filteredPricesDevice)



    }

















    return (



        <>



            <div className="catalog-filter-dropmenuZone">
                <div className="catalog-filterPrice-container">




                    <div className="catalog-filter-minPrice">
                        <div className="catalog-filter-minPrice-text">
                            {filtredMinPrice?.toString() ? filtredMinPrice : props.minPriceDevice}
                        </div>
                    </div>






                    <div className="catalog-filter-maxPrice">
                        <div className="catalog-filter-maxPrice-text">
                            {filtredMaxPrice?.toString() ? filtredMaxPrice : props.maxPriceDevice}
                        </div>
                    </div>











                    <div className="catalog-filter-priceSlider" ref={priceSliderRef}


                    >
                        <div className="catalog-filter-priceSlider-divRadiusBetweenDragsRef" style={{
                            left: `${minDragTransformTranslate}px`,
                            width: `${priceSliderRefWidth! - minDragTransformTranslate! - Math.abs(maxDragTransformTranslate!)}px`


                        }}></div>

                        <div className="catalog-filter-dragContainer">

                            <div className="catalog-filter-priceSlider-minDrag"
                                draggable={true}
                                ref={minDragRef}
                                style={{
                                    cursor: "auto",
                                    marginLeft: `+${minDragTransformTranslate}px`
                                }}


                                onDrag={e => onDragFun(e, true)}
                                onDragStart={e => funDifferenceBetweenMouseAndDiv(e, true)}
                                onDragEnd={e => filterPriceDevice(e)}

                            ></div>
                            <div className="catalog-filter-priceSlider-maxDrag"
                                draggable={true}
                                ref={maxDragRef}
                                style={{
                                    cursor: "auto",
                                    marginLeft: `${maxDragTransformTranslate}px`
                                    // marginLeft: `-${50}%`
                                    //left: `${maxDragTransformTranslate}%`
                                }}

                                onDragStart={e => { funDifferenceBetweenMouseAndDiv(e, false) }}
                                onDrag={e => onDragFun(e, false)}
                                onDragEnd={e => filterPriceDevice(e)}


                            ></div>

                        </div>

                    </div>








                </div>
            </div>


        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    gamingDevices: state.stateGamingDevices.gamingDevices,


})



export default connect(mapStateToProps, { filteredByPriceDevice: actions.filteredByPriceDevice, setDragsIsActive: actions.setDragsIsActive })(DragPriceSlider)