import { useEffect, useRef, useState } from "react"
import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom"
import { GamingDeviceType } from "../gamingDeviceType"
import { actions } from "../mainPage/actions and const/actions"
import './searchNavbar.css'





let useClickOutside = (handler: any) => {
    let domNode = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let maybeHandler = (e: MouseEvent) => {
            if (!domNode!.current!.contains(e.target as Node)) {
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
    addFilterForCatalogCategory: (arg0: string) => void,
    setSelectedDevice: (arg0: GamingDeviceType) => void,
    gamingDevices: GamingDeviceType[],

}



const SearchNavbar = (props: PropsType) => {

    const [showCatalog, setShowCatalog] = useState<boolean>(false)
    const [isSearchLineIsOpen, setIsSearchLineIsOpen] = useState<boolean>(false)
    const [searchNavbarValue, setSearchNavbarValue] = useState<string>()
    let regExpSearchNavbarValue = new RegExp(`${searchNavbarValue}`, `i`)

    console.log(regExpSearchNavbarValue);



    let domNodeCatalog = useClickOutside(() => {
        setShowCatalog(false)
    })
    let domNodeSearchNavbar = useClickOutside(() => {
        setIsSearchLineIsOpen(false)
    })




    return (
        <>
            <div className="sNavbar-body">
                <div className="sNavbar-containerSearchLine" ref={domNodeSearchNavbar}>
                    <input className="sNavbar-searchLine" placeholder="search something" onClick={() => setIsSearchLineIsOpen(!isSearchLineIsOpen)}
                        value={searchNavbarValue} onChange={e => setSearchNavbarValue(e.target.value)} />

                    <button className="sNavbar-searchLine-button"></button>
                    {isSearchLineIsOpen
                        ? <div className="sNavbar-searchLine-dropLineContainer">
                            {props.gamingDevices.map((gamingDevice) => {
                                if (searchNavbarValue !== "") {
                                    if (gamingDevice.name.match(regExpSearchNavbarValue) != null) {
                                        return (
                                            <>
                                                <Link to="/productPage" onClick={() => {
                                                    setIsSearchLineIsOpen(false);
                                                    props.setSelectedDevice(gamingDevice)
                                                }}>

                                                    <div className="sNavbar-searchLine-dropLine">
                                                        <img className="sNavbar-searchLine-dropLine-img" src={gamingDevice.img} />
                                                        <div className="sNavbar-searchLine-dropLine-name">{gamingDevice.name}</div>
                                                        <div className="sNavbar-searchLine-dropLine-price">price : {gamingDevice.price} $</div>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    }
                                }
                            })}
                        </div>
                        : null
                    }
                </div>
                <div className="sNavbar-catalog" onClick={() => setShowCatalog(!showCatalog)} ref={domNodeCatalog}>
                    {showCatalog ? <div className="sNavbar-catalog-menu">
                        <div className="sNavbar-catalog-menu-item">
                            <Link to="/catalog" onClick={() => props.addFilterForCatalogCategory("mouse")}>
                                <div className="sNavbar-catalog-menu-item-text">
                                    MOUSE
                                </div>

                                <img className="sNavbar-catalog-menu-item-src"
                                    src="https://wallpapercave.com/wp/wp2122194.jpg" />
                            </Link>
                        </div>
                        <div className="sNavbar-catalog-menu-item" >
                            <Link to="/catalog" onClick={() => props.addFilterForCatalogCategory("keyboard")}>
                                <div className="sNavbar-catalog-menu-item-text">
                                    KEYBOARD
                                </div>

                                <img className="sNavbar-catalog-menu-item-src"
                                    src="https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/postimages/2013/07/Razer%20Logo.jpg" />
                            </Link>

                        </div>
                        <div className="sNavbar-catalog-menu-item">
                            <Link to="/catalog" onClick={() => props.addFilterForCatalogCategory("headphone")}>
                                <div className="sNavbar-catalog-menu-item-text">
                                    HEADPHONE
                                </div>

                                <img className="sNavbar-catalog-menu-item-src"
                                    src="https://media.kingston.com/hyperx/promos/hx-promo-headset-cloud-2-wireless-keyfeatures-1-lg.jpg" />
                            </Link>
                        </div>
                        <div className="sNavbar-catalog-menu-item">
                            <Link to="/catalog" onClick={() => props.addFilterForCatalogCategory("gamingChair")}>
                                <div className="sNavbar-catalog-menu-item-text">
                                    CHAIR
                                </div>

                                <img className="sNavbar-catalog-menu-item-src"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3A0fSbhyzEWPl1TTa-DpGe5UpcE6_LDXtqgFgMq2tUTYLyDzcYN0g0qrSHMBAvae529E&usqp=CAU" />
                            </Link>

                        </div>
                    </div> : null}
                    CATALOG
                </div>
                <Link to="./cheackout">
                    <div className="sNavbar-checkout">
                        CHEACKOUT
                    </div>
                </Link>
            </div>
        </>
    )
}







let mapStateToProps = (state: RootStateOrAny) => ({
    gamingDevices: state.stateGamingDevices.gamingDevices,
})








export default connect(mapStateToProps, { addFilterForCatalogCategory: actions.addFilterForCatalogCategory, setSelectedDevice: actions.setSelectedDevice })(SearchNavbar)

