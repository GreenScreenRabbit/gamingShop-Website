import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { actions } from "../actions and const/actions"
import './chooseBrand.css'


type PropsType = {
    addFilterForCatalogBrand: (arg0: string) => void;
}

const ChooseBrand = (props: PropsType) => {
    return (

        <div className="chooseBrand-body">
            <div className="chooseBrand-itemsContainer">
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("Razer")}>
                    <div className="chooseBrand-item">
                        <img src="https://www.ixbt.com/short/images/2017/Sep/Razer-logo.png" className="chooseBrand-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("HyperX")}>
                    <div className="chooseBrand-item">
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/f5f83b52640477.Y3JvcCwxMzg0LDEwODMsMzIxLDA.jpg" className="chooseBrand-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("SteelSeries")}>
                    <div className="chooseBrand-item">
                        <img src="https://cdn.wccftech.com/wp-content/uploads/2018/08/Steelseries-logo.jpeg" className="chooseBrand-item-img" />
                    </div>
                </Link>
                <Link to="/catalog" onClick={() => props.addFilterForCatalogBrand("Logitech")}>
                    <div className="chooseBrand-item">
                        <img src="https://luxafor.com/wp-content/uploads/2020/01/logitech-logo-new.png" style={{ backgroundColor: "black" }} className="chooseBrand-item-img" />
                    </div>
                </Link>

            </div>

        </div>
    )
}



export default connect(null, { addFilterForCatalogBrand: actions.addFilterForCatalogBrand })(ChooseBrand)