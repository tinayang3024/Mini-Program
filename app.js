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


//must use whenever you starts to play a song
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


    //assign values to music bar elements
    // let tempName = this.globalData.playedHistory[playedHistory.length - 1].name;
    // let tempSinger = this.globalData.playedHistory[playedHistory.length - 1].singer;
    // let tempPicURL = this.globalData.playedHistory[playedHistory.length - 1].picURL;
    // this.globalData.currentName = tempName;
    // this.globalData.currentSinger = tempSinger;
    // this.globalData.currentpicURL = tempPicURL;
    // console.log('current song' + this.globalData.currentName);
    // console.log('current singer' + this.globalData.currentSinger);
    // console.log('current picURL' + this.globalData.currentpicURL);

  },

//must use whenever you starts to play a song

  pauseOrPlay: function () {
    // console.log('status before switch:' + this.globalData.BGMstatus);
    if (this.globalData.BGMstatus === true){
      // pasue if music is playing
      this.globalData.back.pause();
      console.log("Playing");
      // from the perspection of single js page 
      this.globalData.buttonSrc = '../../asserts/pictures/play.png';
      this.globalData.BGMstatus = false;
    }else{
      // play if music is pause
      this.globalData.back.play();
      console.log("Paused");
      // from the perspection of single js page 
      this.globalData.buttonSrc = '../../asserts/pictures/pause.png';
      this.globalData.BGMstatus = true;
    }
    // console.log('status after switch:' + this.globalData.BGMstatus);
  },
  globalData: {
    userInfo: null,
    playedHistory: [],
    back: wx.getBackgroundAudioManager(),
    BGMstatus: false,
    buttonSrc: '../../asserts/pictures/pause.png'
  }
})