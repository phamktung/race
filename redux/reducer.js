import { actionTypes, dataPin, dataUserRegister, testRedux } from './actions';
import { defaultColumnsOrder, localStorageKey } from '../src/containers/priceboard/components/SettingModal/contants';
import { saveGetLocalstorage } from '../src/containers/priceboard/components/SettingModal/utils';

const initialState = {
	screenWidth: 0,
	testRedux: 0,
	dataUserRegister: [],
	dataPin: JSON.stringify([]),
	// dataAccount:[],
	accountsData: null,
	userInfo: null,
	infoAllStock: null,
	infoListBond: null,
	smartView: false,
	isLoading: false,
	handleChart: null,
	handleMatch: false,
	handleTotal: false,
	handleDTNN: false,
	isCallApi: false,
	isAddItemSuccess: false,
	handleChangeColor: typeof window !== 'undefined' ? localStorage.getItem('stateColor') == 'true' ? true : false : true,
	statusFooter: false,
	handleUpDow: typeof window !== 'undefined' ? parseInt(localStorage.getItem('handleBntUpDow')) ? parseInt(localStorage.getItem('handleBntUpDow')) : 0 : 0,
	disSocket: 0,
	isHideAsset:true,
	dataEventList: null,
	addedList: [],
	priceboardColumnsOrder: saveGetLocalstorage(localStorageKey.PRICEBOARD_COLUMNS_ORDER) || defaultColumnsOrder,
	priceboardHiddenFields: saveGetLocalstorage(localStorageKey.PRICEBOARD_HIDDEN_FIELDS) || [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FAILURE:
			return {
				...state,
				...{ error: action.error },
			};
		case actionTypes.EVENT_LIST:
			return {
				...state,
				...{ dataEventList: action.dataEventList },
			};

		case actionTypes.LOAD_DATA_SUCCESS:
			return {
				...state,
				...{ placeholderData: action.data },
			};

		case actionTypes.SCREEN_WIDTH:
			return {
				...state,
				screenWidth: action.payload
			};
		case actionTypes.TEST_REDUX:
			return {
				...state,
				testRedux: action.testRedux
			};
		case actionTypes.DATA_USER_REGISTER:
			return {
				...state,
				dataUserRegister: action.dataUserRegister
			};
		case actionTypes.DATA_PIN:
			return {
				...state,
				dataPin: action.dataPin
			};
		case actionTypes.SMART_VIEW:
			return {
				...state,
				smartView: action.smartView
			};
		// case actionTypes.SAVE_DATA_ACCOUNT:
		// 	return {
		// 		...state,
		// 		dataAccount:action.payload
		// 	}
		case actionTypes.ACCOUNT_DATA:
			return {
				...state,
				accountsData: action.accountsData
			};
		case actionTypes.USER_INFO:
			return {
				...state,
				userInfo: action.userInfo
			};
		case actionTypes.SAVE_INFO_ALL_STOCK:
			return {
				...state,
				infoAllStock: action.payload
			}
		case actionTypes.SAVE_INFO_LIST_BOND:
			return {
				...state,
				infoListBond: action.payload
			}
		case actionTypes.ISLOADING:
			return {
				...state,
				isLoading: action.isLoading
			}
		case actionTypes.HANDLE_CHART:
			return {
				...state,
				handleChart: action.handleChart
			}
		case actionTypes.HANDLE_MATCH:
			return {
				...state,
				handleMatch: action.handleMatch
			}
		case actionTypes.HANDLE_TOTAL:
			return {
				...state,
				handleTotal: action.handleTotal
			}
		case actionTypes.HANDLE_DTNN:
			return {
				...state,
				handleDTNN: action.handleDTNN
			}
		case actionTypes.IS_CALL_API:
			return {
				...state,
				isCallApi: action.payload
			}
		case actionTypes.UPDATE_AVATAR:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					presignedUrl: action.payload
				}
			}
		case actionTypes.IS_ADD_ITEM_SUCSESS:
			return {
				...state,
				isAddItemSuccess: action.payload
			}
		case actionTypes.COLOR_PRICE:
			return {
				...state,
				handleChangeColor: action.handleChangeColor
			}
		case actionTypes.STATUS_FOOTER:
			return {
				...state,
				statusFooter: action.statusFooter
			}
		case actionTypes.HANDLE_UPDOW:
			return {
				...state,
				handleUpDow: action.handleUpDow
			}
		case actionTypes.DIS_SOCKET:
			return {
				...state,
				disSocket: action.disSocket
			}
		case actionTypes.SET_HIDE_ASSSET:
			return {
				...state,
				isHideAsset:!state.isHideAsset
			}
		case actionTypes.ADD_ADDED_LIST:
			return {
				...state,
				addedList: action.data
			}
		case actionTypes.REMOVE_ADDED_LIST:
			return {
				...state,
				addedList: []
			}
		case actionTypes.SET_PRICEBOARD_COLUMNS_ORDER:
			return {
				...state,
				priceboardColumnsOrder: action.data
			}
		case actionTypes.SET_PRICEBOARD_HIDDEN_FIELDS:
			return {
				...state,
				priceboardHiddenFields: action.data
			}
		default:
			return state;
	}
}

export default reducer;
