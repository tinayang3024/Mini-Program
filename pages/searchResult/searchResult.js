// pages/searchResult/searchResult.js
let search = require("../search/search.js")
const app = getApp()

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
        wx.hideToast();
        console.log('Search Result:');
        console.log(res);
        that.setData({
          songList: res.data
        });
        that.obtainImgURL(0);
      }
    });
  },

  //start to play BGM
  bindback: function (e) {
    // console.log(e.currentTarget.dataset.name);
    let audioURL = '';
    let song = e;
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'url',
        source: 'tencent',
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        wx.hideLoading();
        app.BGMonPlay();
        // console.log('audioURL:');
        // console.log(res);
        audioURL = res.data.url;
        console.log(song);

        let name = song.currentTarget.dataset.name;
        let singer = song.currentTarget.dataset.singer;
        let picURL = song.currentTarget.dataset.picurl;
        let id = song.currentTarget.dataset.id

        // const back = wx.getBackgroundAudioManager();
        app.globalData.back.src = audioURL;
        app.globalData.back.title = name;
        app.globalData.back.coverImgUrl = picURL;
        app.globalData.back.play();
        
        //give info to played history and music bar
        app.globalData.BGMstatus = true;
        app.pushSongToPlayedHistory(name, singer, picURL, id, audioURL);
      }
    });
    // back.onPlay(() => {
    //   console.log("Audio starts playing...");
    // })
    // back.onEnded(() => {
    //   console.log("Audio ends playing...");
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