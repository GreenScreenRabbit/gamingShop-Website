import React, { RefObject } from "react"
import { useEffect, useRef, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { GoogleMap } from "react-google-maps"
import { connect, RootStateOrAny } from "react-redux"
import { GamingDeviceType } from "../gamingDeviceType"
import { actions } from "../mainPage/actions and const/actions"
import "./cheackout.css"
import Popup from "./Popup"





let useClickOutside = (handler: any) => {


    let domNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let maybeHandler = (e: MouseEvent) => {
            if (domNode!.current && !domNode!.current!.contains(e.target as Node)) {
                handler()
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return () => {
            document.removeEventListener("mousedown", maybeHandler)
        }
    }
    )

    return domNode
}






type PropsType = {
    cheackout: GamingDeviceType[],
    gamingDevices: GamingDeviceType[],

    minusOnePurchaseCount: (arg0: number) => void,
    addOnePurchaseCount: (arg0: number) => void,
    inToZeroPurchaseCount: (arg0: number) => void,
}








const Cheackout = (props: PropsType) => {




    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const telephonNumberRef = useRef(null)
    const eMailRef = useRef(null)
    const houseAddressRef = useRef(null)
    const streetAddressRef = useRef(null)
    const timeDeliveryRef = useRef(null)
    const dayDeliveryRef = useRef(null)


    const [deliveryTypeDelivery, setDeliveryTypeDelivery] = useState<boolean>(true)
    const [deliveryTypeCarryOut, setDeliveryTypeCarryOut] = useState<boolean>(false)
    const [isDropMenuPaymentType, setIsDropMenuPaymentType] = useState<boolean>(false)
    const [paymentType, setPaymentType] = useState<string>("Credit card")


    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [telephonNumber, setTelephonNumber] = useState<string>("")
    const [eMail, setEMail] = useState<string>("")
    const [houseAddress, setHouseAddress] = useState<string>("")
    const [streetAddress, setStreetAddress] = useState<string>("")
    const [timeDelivery, setTimeDelivery] = useState<string>("")
    const [dayDelivery, setDayDelivery] = useState<string>("Today")


    const [showDropMenuHours, setShowDropMenuHours] = useState<boolean>(false)
    const [showDropMenuDay, setShowDropMenuDay] = useState<boolean>(false)

    const firstNameRegExp = new RegExp("\\w{3}")
    const lastNameRegExp = new RegExp("\\w{4}")
    const telephonNumberRegExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    const eMailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    const haveOneSymbol = new RegExp(/^\S.*$/gm)


    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [isInputsCorrectForPopup, setIsInputsCorrectForPopup] = useState<boolean>(false)

    const hoursArray: string[] = []
    const filtredDevice: GamingDeviceType[] = []

    const allRegExpForInputs: RegExp[] = [
        firstNameRegExp,
        lastNameRegExp,
        telephonNumberRegExp,
        eMailRegExp,
    ];

    const allInputs: string[] = [
        firstName,
        lastName,
        telephonNumber,
        eMail,
        houseAddress,
        streetAddress,
        timeDelivery,
        dayDelivery,
    ]


    const allRefsInputs: RefObject<HTMLInputElement>[] = [
        firstNameRef,
        lastNameRef,
        telephonNumberRef,
        eMailRef,
        houseAddressRef,
        streetAddressRef,
        timeDeliveryRef,
        dayDeliveryRef,
    ]


    let domNodeCatalog = useClickOutside(() => {
        setIsDropMenuPaymentType(false)
    })



    let domNodeHours = useClickOutside(() => {
        setShowDropMenuHours(false)
    })


    let domNodeDay = useClickOutside(() => {
        setShowDropMenuDay(false)
    })







    const getDateTime = () => {
        let date = new Date();


        let hours = date.getHours();

        let y = 0;
        for (let i = 0; i < 24; i++) {



            if (hours + i < 24) {
                hoursArray.push(`${hours + i} : 00`)
            } else {
                hoursArray.push(`${y} : 00`)
                y++
            }
        }

    }
    getDateTime()






    const filterCheackoutDevice = (gamingDevice: GamingDeviceType[]) => {

        gamingDevice.forEach((device) => {
            if (device.purchaseСount >= 1) {
                filtredDevice.push(device)
            }
        })

    }

    filterCheackoutDevice(props.gamingDevices)



    const cheackAllInputs = () => {


        let cheackedCorrect: boolean[] = []


        allInputs.forEach((inputValue, index) => {
            if (deliveryTypeCarryOut == true) {
                let result = inputValue.match(allRegExpForInputs[index])

                if (index < 4) {
                    if (result == null) {
                        allRefsInputs[index].current!.style.backgroundColor = "red";
                        cheackedCorrect.push(false)
                    } else {
                        allRefsInputs[index].current!.style.backgroundColor = "#FFFFFF";
                        cheackedCorrect.push(true)
                    }
                }
            } else {
                if (index < 4) {
                    let result = inputValue.match(allRegExpForInputs[index])
                    if (result == null) {
                        allRefsInputs[index].current!.style.backgroundColor = "red";
                        cheackedCorrect.push(false)
                    } else {
                        allRefsInputs[index].current!.style.backgroundColor = "#FFFFFF";
                        cheackedCorrect.push(true)
                    }
                } else {
                    let result = inputValue.match(haveOneSymbol)

                    if (result == null) {
                        allRefsInputs[index].current!.style.backgroundColor = "red";
                        cheackedCorrect.push(false)
                    } else {
                        allRefsInputs[index].current!.style.backgroundColor = "#FFFFFF";
                        cheackedCorrect.push(true)
                    }
                }
            }
            if (cheackedCorrect.includes(false)) {
                setIsInputsCorrectForPopup(false)
            } else {
                setIsInputsCorrectForPopup(true)
            }
            setShowPopup(true)
        })
    }



    return (
        <>
            <Popup showPopup={showPopup} isInputsCorrectForPopup={isInputsCorrectForPopup} setShowPopup={setShowPopup} />

            <div className="cheackout-body">
                <Row>
                    <Col lg={{ offset: 1, span: 6 }} className="cheackout-bodyLeft">
                        <Row>
                            <Col className="cheackout-heading">
                                Person
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="cheackout-containerInputText">
                                    <div className="cheackout-containerDomNode" >
                                        <input className="cheackout-inputTextStyle" type="text" placeholder="firstName"
                                            onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                            ref={firstNameRef}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="cheackout-containerInputText">
                                    <div className="cheackout-containerDomNode" >
                                        <input className="cheackout-inputTextStyle" type="text" placeholder="lastName"
                                            onChange={(e) => setLastName(e.target.value)} value={lastName}
                                            ref={lastNameRef} />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="cheackout-containerInputText">
                                    <div className="cheackout-containerDomNode" >
                                        <input className="cheackout-inputTextStyle" type="text" placeholder="telephone"
                                            onChange={(e) => setTelephonNumber(e.target.value)} value={telephonNumber}
                                            ref={telephonNumberRef} />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="cheackout-containerInputText">
                                    <div className="cheackout-containerDomNode" >
                                        <input className="cheackout-inputTextStyle" type="text" placeholder="eMail"
                                            onChange={(e) => setEMail(e.target.value)} value={eMail}
                                            ref={eMailRef} />
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <Col className="cheackout-heading">
                                Delivery type
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="cheackout-cheackbox-containerForTypeButton">
                                    <div className="cheackout-cheackbox-text" >Delivery</div>
                                    <div className="cheackout-cheackbox-deliveryTypeButton"
                                        style={{ backgroundColor: deliveryTypeDelivery ? "green" : "#505050" }}
                                        onClick={() => { setDeliveryTypeDelivery(!deliveryTypeDelivery); setDeliveryTypeCarryOut(false) }}></div>
                                </div>
                                <div className="cheackout-cheackbox-containerForTypeButton">
                                    <div className="cheackout-cheackbox-text" >Carry out</div>
                                    <div style={{ backgroundColor: deliveryTypeCarryOut ? "green" : "#505050" }}
                                        onClick={() => { setDeliveryTypeCarryOut(!deliveryTypeCarryOut); setDeliveryTypeDelivery(false) }}
                                        className="cheackout-cheackbox-deliveryTypeButton"></div>
                                </div>



                            </Col>
                        </Row>

                        {deliveryTypeDelivery ?

                            <>
                                <Row>
                                    <Col>




                                        <div className="cheackout-containerInputText">
                                            <div className="cheackout-containerDomNode" >
                                                <input className="cheackout-inputTextStyle" type="text" placeholder="houseNumber"
                                                    onChange={(e) => setHouseAddress(e.target.value)} value={houseAddress}
                                                    ref={houseAddressRef} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="cheackout-containerInputText">
                                            <div className="cheackout-containerDomNode" >
                                                <input className="cheackout-inputTextStyle" type="text" placeholder="street"
                                                    onChange={(e) => setStreetAddress(e.target.value)} value={streetAddress}
                                                    ref={streetAddressRef}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="cheackout-containerInputText" >
                                            <div className="cheackout-containerDomNode"
                                                ref={domNodeHours}
                                            >
                                                <input className="cheackout-inputTextStyle" type="text" placeholder="timeDelivery"
                                                    //onChange={(e) => setTimeDelivery(e.target.value)}
                                                    value={timeDelivery}
                                                    onClick={() => setShowDropMenuHours(!showDropMenuHours)}
                                                    ref={timeDeliveryRef}
                                                />

                                                {showDropMenuHours ?
                                                    <div className="cheackout-paymentType-dropItemsContainerWithScroll"  >
                                                        <div className="cheackout-paymentType-dropItemsContainer">

                                                            {hoursArray.map((hour) => {
                                                                return (
                                                                    <>
                                                                        <div className="cheackout-paymentType-dropItem" onClick={() => { setTimeDelivery(hour); setShowDropMenuHours(false) }}>
                                                                            {hour}
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>

                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="cheackout-containerInputText" >
                                            <div className="cheackout-containerDomNode"
                                                ref={domNodeDay}
                                            >
                                                <input className="cheackout-inputTextStyle" type="text" placeholder="day"
                                                    //onChange={(e) => setDayDelivery(e.target.value)} 
                                                    value={dayDelivery}
                                                    onClick={() => setShowDropMenuDay(!showDropMenuDay)}
                                                    ref={dayDeliveryRef}
                                                />
                                                {
                                                    showDropMenuDay ?
                                                        <div className="cheackout-paymentType-dropItemsContainer">
                                                            <div className="cheackout-paymentType-dropItem" onClick={() => {
                                                                setDayDelivery("Today")
                                                                setShowDropMenuDay(false)
                                                            }}>Today</div>
                                                            <div className="cheackout-paymentType-dropItem" onClick={() => {
                                                                setDayDelivery("Tomorrow")
                                                                setShowDropMenuDay(false)
                                                            }}>Tomorrow</div>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </>

                            :
                            <>
                                <div className="cheackout-map">MAP
                                    use your imagination </div>

                            </>
                        }



                        <Row>
                            <Col className="cheackout-heading">
                                Payment type
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <div className="cheackout-containerInputText">
                                    <div className="cheackout-containerDomNode"
                                        ref={domNodeCatalog}
                                    >

                                        <div className="cheackout-paymentType" onClick={() => setIsDropMenuPaymentType(!isDropMenuPaymentType)}
                                        >
                                            {paymentType}
                                        </div>
                                        {isDropMenuPaymentType ? <>
                                            <div className="cheackout-paymentType-dropItem" onClick={() => { setPaymentType("Credit card"); setIsDropMenuPaymentType(!isDropMenuPaymentType) }}>Credit card</div>
                                            <div className="cheackout-paymentType-dropItem" onClick={() => { setPaymentType("Cash"); setIsDropMenuPaymentType(!isDropMenuPaymentType) }}>Cash</div>
                                        </> : null
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col>
                            </Col>
                        </Row>




                        <Row>
                            <Col className="cheackout-heading">
                                Total

                            </Col>
                        </Row>






                        <Row>
                            <Col style={{ height: "50px" }}>
                                <div className="cheackout-totalPrice">Total price:{filtredDevice.reduce((sum, item) => {
                                    return sum + item.price
                                }, 0)} $</div>

                            </Col>
                        </Row>



                        <Row>
                            <Col style={{ height: "200px" }}>
                                <button className="cheackout-submitButton"
                                    onClick={() => cheackAllInputs()}
                                    disabled={filtredDevice.length ? false : true}> Submit</button>
                            </Col>
                        </Row>





                    </Col>
                    <Col lg={{ span: 4 }} >
                        <div className="cheackout-itemsContainer">
                            {/* {props.cheackout ? props.gamingDevices.map((device) => { */}
                            {filtredDevice.map((device, index) => {
                                return (
                                    <div className="cheackout-itemContainer">
                                        <div className="cheackout-itemContainer-item-imgContainer">
                                            <img className="cheackout-itemContainer-item-imgContainer-img" src={device.img} />
                                        </div>
                                        <div className="cheackout-itemContainer-item-name">{device.name}</div>
                                        <div className="cheackout-itemContainer-item-cancelButton"
                                            onClick={() => props.inToZeroPurchaseCount(device.id)}></div>
                                        <div className="cheackout-itemContainer-item-price">PRICE: {device.price} $</div>
                                        <div className="cheackout-itemContainer-item-purchaseСount">
                                            <div className="cheackout-itemContainer-item-purchaseСount-minusContainer"
                                                onClick={() => props.minusOnePurchaseCount(device.id)}>
                                                <div className="cheackout-itemContainer-item-purchaseСount-minusContainer-symbol">
                                                    -
                                                </div>
                                            </div>
                                            <div className="cheackout-itemContainer-item-purchaseСount-symbolContainer">
                                                <div className="cheackout-itemContainer-item-purchaseСount-symbolContainer-symbol">
                                                    {device.purchaseСount}
                                                </div>
                                            </div>
                                            <div className="cheackout-itemContainer-item-purchaseСount-plusContainer"
                                                onClick={() => props.addOnePurchaseCount(device.id)}>
                                                <div className="cheackout-itemContainer-item-purchaseСount-plusContainer-symbol">
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}





let mapStateToProps = (state: RootStateOrAny) => ({
    cheackout: state.stateGamingDevices.cheackout,
    gamingDevices: state.stateGamingDevices.gamingDevices,

})



export default connect(mapStateToProps, {
    minusOnePurchaseCount: actions.minusOnePurchaseCount,
    addOnePurchaseCount: actions.addOnePurchaseCount,
    inToZeroPurchaseCount: actions.inToZeroPurchaseCount,
})(Cheackout)