import { connect } from "react-redux"
import './popup.css'

type PropType = {
    isInputsCorrectForPopup: boolean,
    showPopup: boolean,
    setShowPopup: (arg0: boolean) => void,
}


const Popup = (props: PropType) => {
    return (
        <>
            {props.showPopup ?
                <>
                    <div className="popup-wallpaper"></div>
                    <div className="popup-body">
                        {props.isInputsCorrectForPopup ?
                            <>
                                <div className="popup-heading">ACCEPTED</div>
                                <button className="popup-button" onClick={() => props.setShowPopup(false)}>OK</button>
                                <div>
                                    <div className="popup-imgContainer">
                                        <img src="https://w7.pngwing.com/pngs/1013/469/png-transparent-computer-icons-check-mark-symbol-ok-miscellaneous-angle-logo.png" className="popup-img" />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="popup-heading">INCORRECTS INPUTS</div>
                                <button className="popup-button" onClick={() => props.setShowPopup(false)}>OK</button>
                                <div>
                                    <div className="popup-imgContainer">

                                        <img src="https://e7.pngegg.com/pngimages/28/52/png-clipart-button-computer-icons-cancel-button-logo-sign.png" className="popup-img" />
                                    </div>
                                </div>
                            </>}
                    </div>
                </>
                : null}
        </>
    )
}


export default connect()(Popup)