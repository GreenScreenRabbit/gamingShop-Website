import { useState } from "react";
import { Col, Row } from "react-bootstrap"
import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom";
import { GamingDeviceType } from "../gamingDeviceType";
import { actions } from "../mainPage/actions and const/actions";
import './productPage.css'


type PropsType = {
    selectedDevice: GamingDeviceType,
    gamingDevices: GamingDeviceType[],
    setSelectedDevice: (arg0: GamingDeviceType) => void,
    addToCheackout: (arg0: GamingDeviceType) => void,
    addOnePurchaseCount: (id: number) => void,
    minusOnePurchaseCount: (id: number) => void,
    filteredByPriceDevices: any,

}



const ProductPage = (props: PropsType) => {


    const gamingDevice = props.selectedDevice




    return (
        <>
            <div className="productPage-body">
                <Row className="productPage-productTitle">

                    <Col><div className="productPage-productTitle-text">{gamingDevice.name}</div>
                    </Col>
                    
                </Row>
                <Row style={{ position: "relative" }}>
                    <Col lg={{ span: 4, offset: 1 }} style={{ backgroundColor: "#353535", height: "600px" }}>
                        <div className="productPage-leftColContainer">
                            <div className="productPage-imgContainer">
                                <img className="productPage-img" src={gamingDevice.img} />
                            </div>
                        </div>


                    </Col>
                    <Col lg={{ span: 6, offset: 0 }} style={{ backgroundColor: "#333333", height: "500px" }}>
                        <div className="productPage-priceContainer">
                            <Row>
                                <Col>
                                    <div className="productPage-priceContainer-price">{gamingDevice.price} $</div>
                                </Col>
                                <Col>

                                    {gamingDevice.purchaseСount ?
                                        <div className="productPage-priceContainer-buttonCountContainer">
                                            <div className="productPage-priceContainer-buttonCountContainer-minusContainer"
                                                onClick={() => props.minusOnePurchaseCount(gamingDevice.id)}>
                                                <div className="productPage-priceContainer-buttonCountContainer-symbol">
                                                    -
                                                </div>
                                            </div>
                                            <div className="productPage-priceContainer-buttonCountContainer-countContainer">
                                                <div className="productPage-priceContainer-buttonCountContainer-symbol">
                                                    {gamingDevice.purchaseСount}
                                                </div>
                                            </div>
                                            <div className="productPage-priceContainer-buttonCountContainer-plusContainer"
                                                onClick={() => props.addOnePurchaseCount(gamingDevice.id)}>
                                                <div className="productPage-priceContainer-buttonCountContainer-symbol">
                                                    +
                                                </div>
                                            </div>
                                        </div>

                                        :
                                        <button className="productPage-priceContainer-buyButton" onClick={() => props.addOnePurchaseCount(gamingDevice.id)}>BUY</button>}
                                </Col>
                            </Row>
                        </div>



                        <div className="productPage-information">
                            VERY GOOD DEVICE
                        </div>


                    </Col>
                </Row>

                <Row>
                    <div className="productPage-similarProductsSliderContainer">
                        <Col lg={{ offset: 1, span: 10 }}>
                            <div className="productPage-similarProductsSliderContainer-similarProductsSlider">
                                <Row style={{ height: "100%" }}>
                                    <Col lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }} >
                                        <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content">
                                            <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content-inLine">

                                                {props.gamingDevices.map((device) => {
                                                    if (device.id != gamingDevice.id)
                                                        if (device.type === gamingDevice.type) {
                                                            return (








                                                                <Link to="/productPage" onClick={() => {
                                                                    props.setSelectedDevice(device)
                                                                }}>
                                                                    <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content-item">

                                                                        <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content-item-imgContainer">
                                                                            <img className="productPage-similarProductsSliderContainer-similarProductsSlider-content-item-img"
                                                                                src={device.img} />
                                                                        </div>
                                                                        <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content-item-name">
                                                                            {device.name}
                                                                        </div>
                                                                        <div className="productPage-similarProductsSliderContainer-similarProductsSlider-content-item-price">
                                                                            {device.price} $
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        }

                                                })}

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                    </div>
                </Row>

            </div>
        </>
    )
}


let mapStateToProps = (state: RootStateOrAny) => ({
    selectedDevice: state.stateGamingDevices.selectedDevice,
    gamingDevices: state.stateGamingDevices.gamingDevices,
})



export default connect(mapStateToProps, {
    setSelectedDevice: actions.setSelectedDevice, addToCheackout: actions.addToCheackout,
    addOnePurchaseCount: actions.addOnePurchaseCount, minusOnePurchaseCount: actions.minusOnePurchaseCount
})(ProductPage)