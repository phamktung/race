export const actionTypes = {
	FAILURE: 'FAILURE',
	LOAD_DATA: 'LOAD_DATA',
	LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
	SCREEN_WIDTH: 'SCREEN_WIDTH',
	TEST_REDUX: 'TEST_REDUX',
	DATA_USER_REGISTER: 'DATA_USER_REGISTER',
	DATA_PIN: 'DATA_PIN',
	SAVE_DATA_ACCOUNT : 'SAVE_DATA_ACCOUNT',
	ACCOUNT_DATA: 'ACCOUNT_DATA',
	USER_INFO: 'USER_INFO',
	SAVE_INFO_ALL_STOCK: 'SAVE_INFO_ALL_STOCK',
	SAVE_INFO_LIST_BOND: 'SAVE_INFO_LIST_BOND',
	SMART_VIEW: 'SMART_VIEW',
	ISLOADING:'ISLOADING',
	HANDLE_CHART: 'ADD_DELETE_CHART',
	HANDLE_MATCH: 'HANDLE_MATCH',
	HANDLE_TOTAL: 'HANDLE_TOTAL',
	HANDLE_DTNN: 'HANDLE_DTNN',
	UPDATE_AVATAR: 'UPDATE_AVATAR',
	IS_CALL_API:'IS_CALL_API',
	IS_ADD_ITEM_SUCSESS:'IS_ADD_ITEM_SUCSESS',
	COLOR_PRICE: 'COLOR_PRICE',
	STATUS_FOOTER: 'STATUS_FOOTER',
	HANDLE_UPDOW: 'HANDLE_UPDOW',
	DIS_SOCKET: 'DIS_SOCKET',
	SET_HIDE_ASSSET:'SET_HIDE_ASSSET',
	EVENT_LIST: 'EVENT_LIST',
	ADD_ADDED_LIST: 'ADD_ADDED_LIST',
	REMOVE_ADDED_LIST: 'REMOVE_ADDED_LIST',
	SET_PRICEBOARD_COLUMNS_ORDER: 'SET_PRICEBOARD_COLUMNS_ORDER',
	SET_PRICEBOARD_HIDDEN_FIELDS: 'SET_PRICEBOARD_HIDDEN_FIELDS'
};

export function setScreenWidth(width){
	return{
		type: actionTypes.SCREEN_WIDTH,
		payload: width
	}
}

export function failure(error) {
	return {
		type: actionTypes.FAILURE,
		error,
	};
}

export function loadData() {
	return { type: actionTypes.LOAD_DATA };
}

export function loadDataSuccess(data) {
	return {
		type: actionTypes.LOAD_DATA_SUCCESS,
		data,
	};
}
export function testRedux(data) {
	return {
		type: actionTypes.TEST_REDUX,
		testRedux:data,
	};
}
export function dataUserRegister(data) {
	return {
		type: actionTypes.DATA_USER_REGISTER,
		dataUserRegister:data,
	};
}
export function dataPin(data) {
	return {
		type: actionTypes.DATA_PIN,
		dataPin:data,
	};
}
export function smartView(data) {
	return {
		type: actionTypes.SMART_VIEW,
		smartView:data,
	};
}

export function handleChart(data) {
	return {
		type: actionTypes.HANDLE_CHART,
		handleChart: data,
	};
}

export function handleChangeMatch(data) {
	return {
		type: actionTypes.HANDLE_MATCH,
		handleMatch: data,
	};
}

export function handleChangeTotal(data) {
	return {
		type: actionTypes.HANDLE_TOTAL,
		handleTotal: data,
	};
}

export function handleChangeDTNN(data) {
	return {
		type: actionTypes.HANDLE_DTNN,
		handleDTNN: data,
	};
}
// export function saveDataAccount(data){
// 	return {
// 		type: actionTypes.SAVE_DATA_ACCOUNT,
// 		payload:data
// 	}
// }
export function accountsData(data) {
	return {
		type: actionTypes.ACCOUNT_DATA,
		accountsData:data,
	};
}
export function userInfo(data) {
	return {
		type: actionTypes.USER_INFO,
		userInfo:data,
	};
}

export function saveInfoAllStock(data){
	return {
		type: actionTypes.SAVE_INFO_ALL_STOCK,
		payload:data,
	}
}

export function saveInfoListBond(data){
	return{
		type:actionTypes.SAVE_INFO_LIST_BOND,
		payload:data
	}
}


export function isLoading(data){
	return{
		type:actionTypes.ISLOADING,
		isLoading:data
	}
}

export function isSetCallApi(status){
	return {
		type:actionTypes.IS_CALL_API,
		payload:status
	}
}	
export function updateAvatar(data) {
	return {
		type: actionTypes.UPDATE_AVATAR,
		payload:data,
	};
}

export function isAddItemSuccsess(data) {
	return {
		type: actionTypes.IS_ADD_ITEM_SUCSESS,
		payload:data,
	};
}

export function handleColorPrice(data) {
	return {
		type: actionTypes.COLOR_PRICE,
		handleChangeColor:data,
	};
}

export function handleStatusFooter(data) {
	return {
		type: actionTypes.STATUS_FOOTER,
		statusFooter:data,
	};
}

export function handleUpDow(data) {
	return {
		type: actionTypes.HANDLE_UPDOW,
		handleUpDow:data,
	};
}

export function handleReloadSocket(data) {
	return {
		type: actionTypes.DIS_SOCKET,
		disSocket: data,
	};
}

export function setIsHideAsset(){
	return {
		type:actionTypes.SET_HIDE_ASSSET,
	}
}

export function dataEventList(data) {
	return {
		type: actionTypes.EVENT_LIST,
		dataEventList: data,
	};
}

export function addAddedList(data) {
	return {
		type: actionTypes.ADD_ADDED_LIST,
		data
	}
}

export function removeAddedList() {
	return {
		type: actionTypes.REMOVE_ADDED_LIST
	}
}

export function setPriceboardColumnsOrder(data) {
	return {
		type: actionTypes.SET_PRICEBOARD_COLUMNS_ORDER,
		data
	}
}

export function setPriceboardHiddenFields(data) {
	return {
		type: actionTypes.SET_PRICEBOARD_HIDDEN_FIELDS,
		data
	}
}
