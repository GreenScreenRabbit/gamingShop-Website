import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { actions } from "../mainPage/actions and const/actions"
import "./navbar.css"



type PropsType = {
    addFilterForCatalogBrand: (arg0: string) => void
}



const Navbar = (props: PropsType) => {
    return (
        <div className="navbar-body">
            <Link to="./mainPage">
                <img className="navbar-logo" src="https://www.lbcc.edu/sites/main/files/imagecache/lightbox/main-images/rainbow-flag.jpg" />
            </Link>
            <div className="navbar-itemsContainer">
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("Razer")}>
                    <div className="navbar-itemsContainer-item">
                        <img src="https://www.ixbt.com/short/images/2017/Sep/Razer-logo.png" className="navbar-itemsContainer-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("HyperX")}>
                    <div className="navbar-itemsContainer-item">
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/f5f83b52640477.Y3JvcCwxMzg0LDEwODMsMzIxLDA.jpg" className="navbar-itemsContainer-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("SteelSeries")}>
                    <div className="navbar-itemsContainer-item" >
                        <img src="https://cdn.wccftech.com/wp-content/uploads/2018/08/Steelseries-logo.jpeg" className="navbar-itemsContainer-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("Logitech")}>
                    <div className="navbar-itemsContainer-item">
                        <img src="https://luxafor.com/wp-content/uploads/2020/01/logitech-logo-new.png" className="navbar-itemsContainer-item-img" style={{ backgroundColor: "black" }} />
                    </div>
                </Link>
            </div>
        </div>
    )
}



export default connect(null, { addFilterForCatalogBrand: actions.addFilterForCatalogBrand })(Navbar)
