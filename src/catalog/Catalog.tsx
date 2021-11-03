import React, { useEffect, useRef, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom"
import { GamingDeviceType } from "../gamingDeviceType"
import { actions } from "../mainPage/actions and const/actions"
import './catalog.css'
import DragPriceSlider from "./DragPriceSlider"

type PropsType = {
    gamingDevices: GamingDeviceType[],
    filtersForCatalogCategory: string[],
    filtersForCatalogBrand: string[],
    filteredByPriceDevices: GamingDeviceType[],
    dragsIsActive: boolean,

    addFilterForCatalogBrand: (arg0: string) => void,
    addFilterForCatalogCategory: (arg0: string) => void,
    deleteFilterForCatalogBrand: (index: number) => void,
    deleteFilterForCatalog: (index: number) => void,
    addOnePurchaseCount: (index: number) => void,
    minusOnePurchaseCount: (index: number) => void,
    addToCheackout: (device: GamingDeviceType) => void,
    setSelectedDevice: (device: GamingDeviceType) => void,
}


type GamingDeviceTypeWithCount = GamingDeviceType & { count: number }




const Catalog = (props: PropsType) => {



    const filtersLengthArray: number[] = []

    filtersLengthArray.push(props.filtersForCatalogBrand.length)
    filtersLengthArray.push(props.filtersForCatalogCategory.length)






    let filtersLengthArrays = filtersLengthArray.reduce((sum: number, number: number) => {
        return sum + number
    }, 0)




    const [isShowDropmenuBrandFilter, setIsShowDropmenuBrandFilter] = useState<boolean>(false)
    const [isShowDropmenuSelectCategory, setIsShowDropmenuSelectCategory] = useState<boolean>(false)


    const [minDragInPercent, setMinDragInPercent] = useState<number>(0)
    const [maxDragInPercent, setMaxDragInPercent] = useState<number>(0)





    let minPriceDevice: number = 0
    let maxPriceDevice: number = 0
    let priceInOnePercent: number = 0



    let gamingDevicesForRender: GamingDeviceType[] = []



    const addoneAndCheackoutToPurchaseCount = (idDevice: number, device: GamingDeviceType) => {
        props.addToCheackout(device)
        props.addOnePurchaseCount(idDevice)
    }


    const minusoneToPurchaseCount = (indexDevice: number) => {
        props.minusOnePurchaseCount(indexDevice)
    }


    const filterOfGamingDevices = (gamingDevices: GamingDeviceType[]) => {

        let max: { price: number }
        let min: { price: number }


        if (props.gamingDevices.length != 0) {
            max = props.gamingDevices!.reduce((acc, curr) => acc.price > curr.price ? acc : curr);
            min = props.gamingDevices!.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
        } else {
            max = { price: 1000 }
            min = { price: 1 }
        }





        minPriceDevice = min.price
        maxPriceDevice = max.price
        priceInOnePercent = (max.price) / 100




        // props.gamingDevices.forEach((gamindDevice) => {
        //     props.filteredByPriceDevices.forEach((filtredPriceDevice) => {
        //         if (gamindDevice.name == filtredPriceDevice.name) {
        //             //gamingDevicesForRender.push(gamindDevice)
        //         }

        //     })
        // })










        let filtersForCatalogCategoryAndBrand: string[] = []



        props.filtersForCatalogCategory.forEach((typeOfFilter) => {
            filtersForCatalogCategoryAndBrand.push(typeOfFilter)
        })


        props.filtersForCatalogBrand.forEach((brandOfFilter) => {
            filtersForCatalogCategoryAndBrand.push(brandOfFilter)
        })






        const arrayFromFiltedBrands: GamingDeviceType[] = []
        const arrayFromFiltedCategorys: GamingDeviceType[] = []
        const arrayFromFiltedPrice: GamingDeviceType[] = []


        const filtredDubDevice: GamingDeviceType[] = []


        if (gamingDevices != undefined) {


            gamingDevices.forEach((item: any) => {

                if (item.type == props.filtersForCatalogCategory) {
                    arrayFromFiltedCategorys.push(item)
                    filtredDubDevice.push(item)
                }
                if (item.brand == props.filtersForCatalogBrand) {
                    arrayFromFiltedBrands.push(item)
                    filtredDubDevice.push(item)
                }
            })
            props.filteredByPriceDevices.forEach((item) => {
                filtredDubDevice.push(item)
            })
        }













        const filtringArray = (...arrays: GamingDeviceType[][]) => {

            let countFilters: number = 0


            if (props.dragsIsActive) {
                countFilters++
            }
            if (props.filtersForCatalogBrand.length != 0) {
                countFilters++
            }
            if (props.filtersForCatalogCategory.length != 0) {
                countFilters++
            }


            let arraysForFilter: GamingDeviceType[][] = []

            arraysForFilter.push(arrays[0])



            let sortedDevicesWithDuplicates: GamingDeviceType[] = []



            arrays.forEach((arrayOfFilter: any) => {
                if (arrayOfFilter.length != 0) {
                    gamingDevices.forEach((item: GamingDeviceType) => {
                        arrayOfFilter.forEach((element: GamingDeviceType) => {
                            if (item.name == element.name) {
                                sortedDevicesWithDuplicates.push(item)
                            }
                        });
                    })

                }
            })





            const sortedDevicesWithDuplicatesAndCount1: { [key: string]: number } = filtredDubDevice.map((gamingDevice) => {
                let gamingDeviceWithCount: GamingDeviceTypeWithCount = Object.assign({ count: 1, gamingDevice: gamingDevice })
                return gamingDeviceWithCount
            })
                .reduce((a: any, b: any) => {
                    a[b.gamingDevice.name] = (a[b.gamingDevice.name] || 0) + b.count
                    return a
                }, {})


            const nameObjectDevicesForRender: string[] = []


            for (let key in sortedDevicesWithDuplicatesAndCount1) {
                if (countFilters == sortedDevicesWithDuplicatesAndCount1[key]) {
                    nameObjectDevicesForRender.push(key)
                }
            }

            gamingDevices.forEach((gamingDevice) => {
                nameObjectDevicesForRender.forEach((name) => {
                    if (gamingDevice.name == name) {
                        gamingDevicesForRender.push(gamingDevice)
                    }
                })
            })




        }


        filtringArray(arrayFromFiltedBrands, arrayFromFiltedCategorys, arrayFromFiltedPrice)






    }






    filterOfGamingDevices(props.gamingDevices)









    return (
        <>
            <div className="catalog-body">
                <Row className="catalog-heading">

                    <div style={{ fontSize: 60 }}>CATALOG</div>
                </Row>
                <Row style={{ marginLeft: "0", marginRight: "0" }}>
                    <Col lg={{ span: 2, offset: 1 }} className="catalog-sideNavbar" >


                        <div className="catalog-headingForFilters">Category filter</div>

                        <div className="catalog-filter-dropmenuZone">
                            <div className="catalog-filter-category" onClick={() => setIsShowDropmenuSelectCategory(!isShowDropmenuSelectCategory)}  >
                                CATEGORY
                            </div>

                            {isShowDropmenuSelectCategory ?
                                <div className="catalog-filter-dropmenu">
                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogCategory("keyboard")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Keyboard</div>
                                    </div>

                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogCategory("mouse")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Mouse</div>
                                    </div>


                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogCategory("headphone")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Headphone</div>
                                    </div>

                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogCategory("gamingChair")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Gaming Chair</div>
                                    </div>


                                </div>
                                : null
                            }
                        </div>


                        <div className="catalog-headingForFilters">Brand filter</div>

                        <div className="catalog-filter-dropmenuZone">

                            <div className="catalog-filter-category" onClick={() => setIsShowDropmenuBrandFilter(!isShowDropmenuBrandFilter)}  >
                                BRAND
                            </div>




                            {isShowDropmenuBrandFilter ?
                                <div className="catalog-filter-dropmenu">


                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogBrand("Razer")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Razer</div>
                                    </div>

                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogBrand("SteelSeries")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">SteelSeries</div>
                                    </div>

                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogBrand("Logitech")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">Logitech</div>
                                    </div>

                                    <div className="catalog-filter-dropmenu-item" onClick={() => props.addFilterForCatalogBrand("HyperX")}>
                                        <div className="catalog-filter-dropmenu-line"></div>
                                        <div className="catalog-filter-dropmenu-item-text">HyperX</div>
                                    </div>



                                </div>
                                : null
                            }
                        </div>

                        <div className="catalog-headingForFilters">Price filter</div>

                        <DragPriceSlider minPriceDevice={0}
                            maxPriceDevice={maxPriceDevice}
                            minDragInPercent={minDragInPercent} maxDragInPercent={maxDragInPercent}
                            priceInOnePercent={priceInOnePercent} />
                    </Col>
                    <Col lg={{ span: 8 }} className="catalog-items">
                        <div className="catalog-items-activeFilters">
                            <div className="catalog-items-activeFilterContainer">

                                {props.filtersForCatalogCategory.map((filterName, index) => {
                                    return (
                                        <div className="catalog-items-activeFilter">
                                            <div className="catalog-items-activeFilter-name">{filterName}</div>
                                            <div className="catalog-items-activeFilter-cancelButton" onClick={() => props.deleteFilterForCatalog(index)}></div>

                                        </div>
                                    )
                                })}

                                {props.filtersForCatalogBrand.map((filterName, index) => {
                                    return (
                                        <div className="catalog-items-activeFilter">
                                            <div className="catalog-items-activeFilter-name">{filterName}</div>
                                            <div className="catalog-items-activeFilter-cancelButton" onClick={() => props.deleteFilterForCatalogBrand(index)}></div>

                                        </div>
                                    )
                                })}



                            </div>
                        </div>


                        {gamingDevicesForRender.length !== 0 ?


                            gamingDevicesForRender.map((item: GamingDeviceType, index) => {

                                return (
                                    <div className="catalog-item" >
                                        <Link to="/productPage" onClick={() => props.setSelectedDevice(item)} >
                                            <div className="catalog-item-imgContainer"  >
                                                <img className="catalog-item-imgContainer-img" src={item.img} />
                                            </div>
                                        </Link>
                                        <div className="catalog-item-name" >{item.name}</div>
                                        <div className="catalog-item-type">TYPE: {item.type}</div>
                                        <div className="catalog-item-brand">BRAND: {item.brand}</div>
                                        <div className="catalog-item-price">PRICE: {item.price} $</div>
                                        {item.purchaseСount ?
                                            <button className="catalog-item-button" >

                                                <div className="catalog-item-button-minusCount" onClick={() => minusoneToPurchaseCount(item.id)}>
                                                    <div className="catalog-item-button-symbol">
                                                        -
                                                    </div>
                                                </div>
                                                <div className="catalog-item-button-count">
                                                    <div className="catalog-item-button-symbol">
                                                        {item.purchaseСount}
                                                    </div>
                                                </div>
                                                <div className="catalog-item-button-plusCount" onClick={() => props.addOnePurchaseCount(item.id)}>
                                                    <div className="catalog-item-button-symbol">
                                                        +
                                                    </div>
                                                </div>

                                            </button> :
                                            <button className="catalog-item-button" onClick={() => addoneAndCheackoutToPurchaseCount(item.id, item)}>BTN</button>
                                        }

                                    </div>
                                )
                            })



                            : filtersLengthArrays == 0 ?







                                gamingDevicesForRender.length == 0 ?







                                    props.gamingDevices.map((item: any, index) => {

                                        return (
                                            <div className="catalog-item" >
                                                <Link to="/productPage" onClick={() => props.setSelectedDevice(item)}>
                                                    <div className="catalog-item-imgContainer"  >
                                                        <img className="catalog-item-imgContainer-img" src={item.img} />
                                                    </div>
                                                </Link>
                                                <div className="catalog-item-name" >{item.name}</div>
                                                <div className="catalog-item-type">TYPE: {item.type}</div>
                                                <div className="catalog-item-brand">BRAND: {item.brand}</div>
                                                <div className="catalog-item-price">PRICE: {item.price} $</div>
                                                {item.purchaseСount ?
                                                    <button className="catalog-item-button" >

                                                        <div className="catalog-item-button-minusCount" onClick={() => minusoneToPurchaseCount(item.id)}>
                                                            <div className="catalog-item-button-symbol">
                                                                -
                                                            </div>
                                                        </div>
                                                        <div className="catalog-item-button-count">
                                                            <div className="catalog-item-button-symbol">
                                                                {item.purchaseСount}
                                                            </div>
                                                        </div>
                                                        <div className="catalog-item-button-plusCount" onClick={() => props.addOnePurchaseCount(item.id)}>
                                                            <div className="catalog-item-button-symbol">
                                                                +
                                                            </div>
                                                        </div>

                                                    </button> :
                                                    <button className="catalog-item-button" onClick={() => addoneAndCheackoutToPurchaseCount(item.id, item)}>BTN</button>
                                                }

                                            </div>
                                        )
                                    })



                                    :



                                    gamingDevicesForRender.map((item, index) => {
                                        return (
                                            <div className="catalog-item" >
                                                <Link to="/productPage" onClick={() => props.setSelectedDevice(item)}>
                                                    <div className="catalog-item-imgContainer"  >
                                                        <img className="catalog-item-imgContainer-img" src={item.img} />
                                                    </div>
                                                </Link>
                                                <div className="catalog-item-name" >{item.name}</div>
                                                <div className="catalog-item-type">TYPE: {item.type}</div>
                                                <div className="catalog-item-brand">BRAND: {item.brand}</div>
                                                <div className="catalog-item-price">PRICE: {item.price} $</div>
                                                {item.purchaseСount ?
                                                    <button className="catalog-item-button" >

                                                        <div className="catalog-item-button-minusCount" onClick={() => minusoneToPurchaseCount(item.id)}>
                                                            <div className="catalog-item-button-symbol">
                                                                -
                                                            </div>
                                                        </div>
                                                        <div className="catalog-item-button-count">
                                                            <div className="catalog-item-button-symbol">
                                                                {item.purchaseСount}
                                                            </div>
                                                        </div>
                                                        <div className="catalog-item-button-plusCount" onClick={() => props.addOnePurchaseCount(item.id)}>
                                                            <div className="catalog-item-button-symbol">
                                                                +
                                                            </div>
                                                        </div>

                                                    </button> :
                                                    <button className="catalog-item-button" onClick={() => addoneAndCheackoutToPurchaseCount(item.id, item)}>BTN</button>
                                                }

                                            </div>
                                        )
                                    })





                                : <div>404</div>


                        }





                    </Col>
                </Row>
            </div>
        </>
    )
}





let mapStateToProps = (state: RootStateOrAny) => ({
    gamingDevices: state.stateGamingDevices.gamingDevices,
    filtersForCatalogCategory: state.stateGamingDevices.filtersForCatalogCategory,
    filtersForCatalogBrand: state.stateGamingDevices.filtersForCatalogBrand,
    filteredByPriceDevices: state.stateGamingDevices.filteredByPriceDevices,
    dragsIsActive: state.stateGamingDevices.dragsIsActive,


})



export default connect(mapStateToProps, {
    addFilterForCatalogCategory: actions.addFilterForCatalogCategory, deleteFilterForCatalog: actions.deleteFilterForCatalog,
    addFilterForCatalogBrand: actions.addFilterForCatalogBrand, deleteFilterForCatalogBrand: actions.deleteFilterForCatalogBrand,
    addOnePurchaseCount: actions.addOnePurchaseCount, minusOnePurchaseCount: actions.minusOnePurchaseCount,
    addToCheackout: actions.addToCheackout, setSelectedDevice: actions.setSelectedDevice,
})(Catalog)