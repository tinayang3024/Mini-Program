Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    searchKeyList: []
  },
  storeAndSearch: function (e) {
    let newList = this.data.searchKeyList;
    newList.push(e.detail.value);
    this.setData({
      searchKeyList: newList
    })
    wx.setStorageSync('searchKey', e.detail.value);
    console.log('search history:' + this.data.searchKeyList);
    console.log('searching:' + e.detail.value);
    wx.navigateTo({
      url: '../searchResult/searchResult'
    })
  },
  dropdownSearch: function (dropdownKey) {
    let newList = this.data.searchKeyList;
    newList.push(dropdownKey);
    this.setData({
      searchKeyList: newList
    })
    wx.setStorageSync('searchKey', dropdownKey);
    console.log('search history:' + this.data.searchKeyList);
    console.log('searching:' + dropdownKey);
    wx.navigateTo({
      url: '../searchResult/searchResult',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})