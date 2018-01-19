/**
 * action creators
 */
import * as types from './action-types'

// action creator
// 修改左侧菜单索引
export const changeMenuIndex = (index, subIndex, isOpened) => ({
	type: types.CHANGE_MENU_INDEX,
	index,
  subIndex,
	isOpened
})

// 获取菜单索引
export const getMenuIndex = () => ({
	type: types.GET_MENU_INDEX,
})

// 重置菜单索引
export const resetMenuIndex = () => ({
	type: types.RESET_MENU_IDNEX,
})

