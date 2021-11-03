import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Catalog from './catalog/Catalog';
import Cheackout from './cheackout/Cheackout';
import Footer from './footer/Footer';
import { GamingDeviceType, GamingDeviceTypeFromData } from './gamingDeviceType';
import { actions } from './mainPage/actions and const/actions';
import MainPage from './mainPage/MainPage';
import Navbar from './navbar/Navbar';
import ProductPage from './productPage/ProductPage';
import SearchNavbar from './searchNavbar/SearchNavbar';




type GamingDevicesDataType = {
  gamingChairs: [],
  mouse: [],
  keyboards: [],
  headphones: []

}





type PropsType = {
  addGamingDevicesFromServer: (arg0: GamingDeviceType) => void,

}









//function App() {
class App extends React.Component<PropsType> {

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/GreenScreenRabbit/gamingShop-server/gamingDevices')
      .then((response) => {

        this.preparingGamingDevicesDataForState(response.data)

      })
  }





  preparingGamingDevicesDataForState = (data: GamingDevicesDataType) => {
    let gamingDevicesForReturn: GamingDeviceType[] = []

    for (let prop in data) {
      let gamingDevices: GamingDeviceType[] = (data as any)[prop];



      gamingDevices.map((item: GamingDeviceTypeFromData) => {
        let newItem = Object.assign(item)
        newItem.purchaseСount = 0


        gamingDevicesForReturn.push(newItem)

        this.props.addGamingDevicesFromServer(newItem)
      })
    }
    return data
  }





  render() {
    return (

      <>

        <Router>



          <Navbar />
          <SearchNavbar />


          <Switch>


            <Route exact path='/' component={MainPage} />
            <Route path='/mainPage' component={MainPage} />
            <Route path='/catalog' component={Catalog} />
            <Route path="/productPage" component={ProductPage} />
            <Route path="/cheackout" component={Cheackout} />


          </Switch>


          <Footer />


        </Router>
      </>

    );
  }
}


export default connect(null, {addGamingDevicesFromServer: actions.addGamingDevicesFromServer})(App)