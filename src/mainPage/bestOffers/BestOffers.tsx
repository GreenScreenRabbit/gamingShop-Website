import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom"
import { GamingDeviceType } from "../../gamingDeviceType"
import { actions } from "../actions and const/actions"
import './bestOffers.css'



type PropsType = {
    gamingDevices?: GamingDeviceType[],
    addOnePurchaseCount: (arg0: number) => void,
    minusOnePurchaseCount: (arg0: number) => void,
    setSelectedDevice: (arg0: GamingDeviceType) => void,
}


const BestOffers = (props: PropsType) => {
    return (
        <>
            <div className="bestOffers-body">
                <div className="bestOffers-heading">BestOffers</div>
                <div className="bestOffers-positionContainer">
                    <div className="bestOffers-itemsContainer">
                        {props.gamingDevices!.map((gamingDevice, index) => {
                            if (index < 8) {
                                return (
                                    <>

                                        <div className="bestOffers-item">
                                            <div className="bestOffers-item-imgContainer">
                                                <Link to="/productPage" onClick={() => props.setSelectedDevice(gamingDevice)}>
                                                    <img className="bestOffers-item-img" src={gamingDevice.img} />
                                                </Link>
                                            </div>
                                            <div className="bestOffers-item-name">{gamingDevice.name}</div>
                                            <div className="bestOffers-item-price">{gamingDevice.price} $</div>
                                            {gamingDevice.purchaseСount ? <div className="bestOffers-item-buyButtonCountContainer">
                                                <div className="bestOffers-item-buyButtonCountContainer-minusContainer"
                                                    onClick={() => props.minusOnePurchaseCount(gamingDevice.id)}>-</div>
                                                <div className="bestOffers-item-buyButtonCountContainer-countContainer">{gamingDevice.purchaseСount}</div>
                                                <div className="bestOffers-item-buyButtonCountContainer-plusContainer"
                                                    onClick={() => props.addOnePurchaseCount(gamingDevice.id)}>+</div>
                                            </div> :
                                                <button className="bestOffers-item-buyButton" onClick={() => props.addOnePurchaseCount(gamingDevice.id)}>Buy</button>}

                                        </div>
                                    </>
                                )
                            }
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state: RootStateOrAny) => ({
    gamingDevices: state.stateGamingDevices.gamingDevices
})



export default connect(mapStateToProps, {
    addOnePurchaseCount: actions.addOnePurchaseCount, minusOnePurchaseCount: actions.minusOnePurchaseCount,
    setSelectedDevice: actions.setSelectedDevice,
})(BestOffers)