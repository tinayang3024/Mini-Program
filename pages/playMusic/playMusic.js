const app = getApp()
// const backgroundAudioManager

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    singer:'',
    picURL:'',
    id:'',
    otherLangLyric:'',
    chLyric:'',
    audioURL:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

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

    // requesting lyric
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'lyric',
        source: 'tencent',
        id: this.data.id
      },
      success: function (res) {
        wx.hideToast();
        // console.log('lyric:');
        // console.log(res);
        if(res.tlyric === ''){
          that.setData({
            chLyric: res.data.lyric
          });
          console.log('CH lyric loaded only');
        }else{
          that.setData({
            otherLangLyric: res.data.lyric,
            chLyric: res.data.tlyric
          });
          console.log('other language & CH lyric loaded');
        }
      }
    });

    // requesting audio url
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'url',
        source: 'tencent',
        id: this.data.id
      },
      success: function (res) {
        wx.hideLoading();
        // console.log('audioURL:');
        // console.log(res);
        that.setData({
          audioURL: res.data.url
        });
        console.log('audio URL:' + that.data.audioURL);
        //give URL to background manager
        
        
        //??????????????????????????????????????????????????????????????????????????????????????????????????????????
        // backgroundAudioManager = wx.getBackgroundAudioManager();
        // backgroundAudioManager.src = 'res.data.url';
        
        // add song into played history
        if (app.globalData.playedHistory.length !== 0){
          //if history is not empty
          let found = false;
          for (let i = 0; i < app.globalData.playedHistory.length;i++){
            if (app.globalData.playedHistory[i].id === that.data.id){
              //delete the item
              app.globalData.playedHistory.splice(i,1);
              //push it to the end
              app.globalData.playedHistory.push({
                name: that.data.name,
                singer: that.data.singer,
                picURL: that.data.picURL,
                id: that.data.id,
              });
              found = true;
            }
          }
          if(found === false){
            //after searching through entire list-> no repeated ->push it to the end
            app.globalData.playedHistory.push({
              name: that.data.name,
              singer: that.data.singer,
              picURL: that.data.picURL,
              id: that.data.id
            });
          }
        }else{
           //if history is empty
          app.globalData.playedHistory.push({
            name: that.data.name,
            singer: that.data.singer,
            picURL: that.data.picURL,
            id: that.data.id
          });
        }
        console.log('Played History:');
        console.log(app.globalData.playedHistory);
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let audioCtx = wx.getBackgroundAudioManager();
    backgroundAudioManager.src = this.data.audioURL;
  },
  audioPlay: function () {
    console.log('audio playing...');
    audioCtx.play();
  },
  lastSong: function () {
    console.log('playing last song...');
  },
  nextSong: function () {
    console.log('playing next song...');
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