
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    singer:'',
    picURL:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: 'Loading...',
      icon: "loading",
      duration: 1000
    });
    console.log('selected song name:' + options.name); 
    console.log('selected song singer:' + options.singer);
    console.log('selected song picURL:' + options.picURL);
    console.log('selected song ID:' + options.id);
    this.setData({
      name: options.name,
      singer: options.singer,
      picURL: options.picURL,
      id: options.id
    });
    // wx.request({
    //   url: 'https://mkblog.cn/blog/musicapi',
    //   data: {
    //     key: 'test',
    //     types: 'search',
    //     source: 'tencent',
    //     id: options.id
    //   },
    //   success: function (res) {
    //     wx.hideLoading();
    //     console.log('selected song of Result:');
    //     console.log(res);
    //     that.setData({
    //       songList: res.data
    //     });
    //     that.obtainImgURL(0);
    //   }
    // })
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