

//log.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentPicURL: '',
    currentName: '',
    currentSinger: '',
    currentStatus: false,
    buttonURL: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    if (app.globalData.playedHistory.length > 0) {
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
})
