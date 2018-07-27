const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    searchKeyList: [],
    currentPicURL: '',
    currentName: '',
    currentSinger: '',
    currentStatus: false,
    buttonURL: ''
  },
  pauseOrPlay: function () {
    // console.log('switch pause/play function');
    // console.log('before switching buttonURL:' + this.data.buttonURL);
    app.pauseOrPlay();
    // console.log('after switching buttonURL:' + this.data.buttonURL);
    if (app.globalData.playedHistory.length > 0) {
      this.setData({
        buttonURL: app.globalData.buttonSrc
      });
    }
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
    // if (app.globalData.playedHistory.length > 0) {
    //   this.setData({
    //     buttonURL: app.globalData.buttonSrc
    //   });
    // }
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
    if (app.globalData.playedHistory.length > 0){
      console.log('passing current song info');
      this.setData({
        currentPicURL: app.globalData.playedHistory[app.globalData.playedHistory.length - 1].picURL,
        currentName: app.globalData.playedHistory[app.globalData.playedHistory.length - 1].name,
        currentSinger: app.globalData.playedHistory[app.globalData.playedHistory.length - 1].singer,
        currentStatus: app.globalData.BGMstatus,
        buttonURL: app.globalData.buttonSrc
      });
      // console.log('from onShow search.js: buttonSrc' + app.globalData.buttonSrc + 'buttonURL' + this.data.buttonURL);
    }

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