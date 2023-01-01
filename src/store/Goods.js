import {defineStore} from 'pinia'

export const useGoodsStore = defineStore('goods', {
  state: () => ({
    rowData: {},
    title: '添加'
  }),
  getters: {

  },
  actions: {
    // 设置数据
    changeTitle(payload) {
      this.title = payload
    },
    changeRowData(payload) {
      this.rowData = payload
    },
    // 清空数据
    clearGoods() {
      this.title = '添加',
      this.rowdata = {}
    }
  }
})