import { combineReducers } from "redux"
import { GamingDeviceType } from "./gamingDeviceType"
import { actions, ActionsTypes } from "./mainPage/actions and const/actions"
import { ADDONE_PURCHASE_COUNT, ADD_GAMING_DEVICES_FROM_SERVER, ADD_TO_CHEACKOUT, DELETE_FILTER_FOR_CATALOG, DELETE_FILTER_FOR_CATALOG_BRAND, FILTERS_FOR_CATALOG_BRAND, FILTERS_FOR_CATALOG_CATEGORY, FILTRED_BY_PRICE_DEVICE, INTOZERO_PURCHASE_COUNT, MINUSONE_PURCHASE_COUNT, SET_DRAGS_IS_ACTIVE, SET_SELECTED_DEVICE } from "./mainPage/actions and const/const"

const initialState = {
    gamingDevices: [],
    filtersForCatalogCategory: [],
    filtersForCatalogBrand: [],
    selectedDevice: null,
    cheackout: [],
    filteredByPriceDevices: [],
    dragsIsActive: false,
}



const stateReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_GAMING_DEVICES_FROM_SERVER: {
            return { ...state, gamingDevices: [...state.gamingDevices, action.gamingDevices] }
        }
        case FILTERS_FOR_CATALOG_CATEGORY: {
            return { ...state, filtersForCatalogCategory: [action.filterForCatalogCategory] }
        }
        case FILTERS_FOR_CATALOG_BRAND: {
            return { ...state, filtersForCatalogBrand: [action.filterForCatalogBrand] }
        }
        case DELETE_FILTER_FOR_CATALOG: {
            return {
                ...state, filtersForCatalogCategory: [...state.filtersForCatalogCategory.slice(0, action.indexFilterForDelete), ...state.filtersForCatalogCategory.slice(action.indexFilterForDelete + 1)]
            }
        }
        case DELETE_FILTER_FOR_CATALOG_BRAND: {
            return {
                ...state, filtersForCatalogBrand: [...state.filtersForCatalogCategory.slice(0, action.indexFilterForDeleteBrand), ...state.filtersForCatalogCategory.slice(action.indexFilterForDeleteBrand + 1)]
            }
        }
        case SET_SELECTED_DEVICE: {
            return {
                ...state, selectedDevice: action.device
            }
        }
        case ADD_TO_CHEACKOUT: {
            return {
                ...state, cheackout: [...state.cheackout, action.device]
            }
        }
        case FILTRED_BY_PRICE_DEVICE: {
            return {
                ...state,
                filteredByPriceDevices: action.filtredDevice.map((item) => item)
            }
        }

        case INTOZERO_PURCHASE_COUNT: {
            return {
                ...state, gamingDevices: state.gamingDevices.map((item: GamingDeviceType, index: number) => {
                    if (item.id == action.idDevice) {
                        item.purchaseСount = 0
                    }
                    return item
                })
            }
        }

        case ADDONE_PURCHASE_COUNT: {
            return {
                ...state, gamingDevices: state.gamingDevices.map((item: GamingDeviceType, index: number) => {
                    if (item.id == action.idDevice) {
                        item.purchaseСount = ++item.purchaseСount
                    }


                    return item
                })
            }
        }

        case MINUSONE_PURCHASE_COUNT: {
            return {
                ...state, gamingDevices: state.gamingDevices.map((item: GamingDeviceType, index: number) => {

                    if (item.id == action.idDevice) {
                        item.purchaseСount = --item.purchaseСount
                    }

                    return item



                })
            }
        }

        case SET_DRAGS_IS_ACTIVE: {
            return{
                ...state, dragsIsActive: action.isActive
            }
        }

        default:
            return state
    }
}













export const rootReducer = combineReducers({
    stateGamingDevices: stateReducer
})