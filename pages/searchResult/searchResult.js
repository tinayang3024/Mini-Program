// pages/searchResult/searchResult.js
let search = require("../search/search.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    songList: [],
    picID: [],
    picURL: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  obtainImgURL: function (index) {
    let that = this;
    if(index < this.data.songList.length){
      wx.request({
        url: 'https://mkblog.cn/blog/musicapi',
        data: {
          key: 'test',
          types: 'pic',
          source: 'tencent',
          id: that.data.songList[index].pic_id
        },
        success: function (res) {
          let tempList = that.data.songList;
          tempList[index].picURL = res.data.url;
          that.setData({
            songList: tempList
          });
          // console.log('stored image for song[' + index + ']');
          that.obtainImgURL(index+1);
        }
      })
    }
  },

  onLoad: function (options) {
    let searching = wx.getStorageSync('searchKey');
    let that = this;
    this.setData({
      searchKey: searching
    });
    wx.showToast({
      title: 'Loading...',
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'search',
        source: 'tencent',
        name: that.data.searchKey
      },
      success: function (res) {
        wx.hideLoading();
        console.log('Search Result:');
        console.log(res);
        that.setData({
          songList: res.data
        });
        that.obtainImgURL(0);
      }
    });
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