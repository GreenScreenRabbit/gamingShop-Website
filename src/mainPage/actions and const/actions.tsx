import { GamingDeviceType } from "../../gamingDeviceType";
import { ADDONE_PURCHASE_COUNT, ADD_GAMING_DEVICES_FROM_SERVER, ADD_TO_CHEACKOUT, DELETE_FILTER_FOR_CATALOG, DELETE_FILTER_FOR_CATALOG_BRAND, FILTERS_FOR_CATALOG_BRAND, FILTERS_FOR_CATALOG_CATEGORY, FILTRED_BY_PRICE_DEVICE, INTOZERO_PURCHASE_COUNT, MINUSONE_PURCHASE_COUNT, SET_DRAGS_IS_ACTIVE, SET_SELECTED_DEVICE } from "./const";

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export const actions = {
    addGamingDevicesFromServer: (gamingDevices: GamingDeviceType) => ({ type: ADD_GAMING_DEVICES_FROM_SERVER, gamingDevices } as const),
    addFilterForCatalogCategory: (filterForCatalogCategory: string) => ({ type: FILTERS_FOR_CATALOG_CATEGORY, filterForCatalogCategory } as const),
    addFilterForCatalogBrand: (filterForCatalogBrand: string) => ({ type: FILTERS_FOR_CATALOG_BRAND, filterForCatalogBrand } as const),
    deleteFilterForCatalog: (indexFilterForDelete: number) => ({ type: DELETE_FILTER_FOR_CATALOG, indexFilterForDelete } as const),
    deleteFilterForCatalogBrand: (indexFilterForDeleteBrand: number) => ({ type: DELETE_FILTER_FOR_CATALOG_BRAND, indexFilterForDeleteBrand } as const),
    setSelectedDevice: (device: GamingDeviceType) => ({ type: SET_SELECTED_DEVICE, device } as const),
    addToCheackout: (device: GamingDeviceType) => ({ type: ADD_TO_CHEACKOUT, device } as const),
    filteredByPriceDevice: (filtredDevice: GamingDeviceType[]) => ({ type: FILTRED_BY_PRICE_DEVICE, filtredDevice } as const),
    addOnePurchaseCount: (idDevice: number) => ({ type: ADDONE_PURCHASE_COUNT, idDevice } as const),
    minusOnePurchaseCount: (idDevice: number) => ({ type: MINUSONE_PURCHASE_COUNT, idDevice } as const),
    inToZeroPurchaseCount: (idDevice: number) => ({ type: INTOZERO_PURCHASE_COUNT, idDevice } as const),
    setDragsIsActive: (isActive: boolean) => ({type: SET_DRAGS_IS_ACTIVE, isActive} as const),
};

export type ActionsTypes = GetActionsTypes<typeof actions>;