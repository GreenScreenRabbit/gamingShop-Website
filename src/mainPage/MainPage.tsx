import { connect, RootStateOrAny } from "react-redux"
import BestOffers from "./bestOffers/BestOffers"
import ChooseBrand from "./chooseBrand/ChooseBrand"
import './mainPage.css'
import MainSlider from "./mainSlider/MainSlider"
import React from "react"
import { actions } from "./actions and const/actions"


 
class MainPage extends React.Component {





    render() {

        return (
            <>
                <div className="mainPage-body">
                    <MainSlider />
                    <ChooseBrand />
                    <BestOffers  />

                </div>
            </>
        )
    }
}




export default connect(null, { addGamingDevicesFromServer: actions.addGamingDevicesFromServer })(MainPage)