//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  pushSongToPlayedHistory: function (name, singer, picURL, id, audioURL) {
    // add song into played history
    if (this.globalData.playedHistory.length !== 0) {
      //if history is not empty
      let found = false;
      for (let i = 0; i < this.globalData.playedHistory.length; i++) {
        if (this.globalData.playedHistory[i].id === id) {
          //delete the item
          this.globalData.playedHistory.splice(i, 1);
          //push it to the end
          this.globalData.playedHistory.push({
            name: name,
            singer: singer,
            picURL: picURL,
            id: id,
            audioURL: audioURL
          });
          found = true;
        }
      }
      if (found === false) {
        //after searching through entire list-> no repeated ->push it to the end
        this.globalData.playedHistory.push({
          name: name,
          singer: singer,
          picURL: picURL,
          id: id,
          audioURL: audioURL
        });
      }
    } else {
      //if history is empty
      this.globalData.playedHistory.push({
        name: name,
        singer: singer,
        picURL: picURL,
        id: id,
        audioURL: audioURL
      });
    }
    console.log('Played History Update:');
    console.log(this.globalData.playedHistory);
  },


  globalData: {
    userInfo: null,
    playedHistory: [],
    back: wx.getBackgroundAudioManager()
  }
})