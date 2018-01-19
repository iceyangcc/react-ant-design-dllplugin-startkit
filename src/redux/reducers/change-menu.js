import {
	CHANGE_MENU_INDEX,
	GET_MENU_INDEX,
	RESET_MENU_IDNEX
} from '../actions/action-types'

const initialState = {
	index: 0,
	subIndex: 0,
	isOpened: true
}

// 修改菜单状态
export default function menuIndex(state = initialState, action) {
	switch (action.type) {
		case CHANGE_MENU_INDEX:
		case GET_MENU_INDEX:
			return {
				...action
			}
		case RESET_MENU_IDNEX:
			return {
				index: 0,
				subIndex: 0,
				isOpened: true
			}
		default:
			return initialState
	}
}
