const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    singer:'',
    picURL:'',
    id:'',
    otherLangLyric: [],//array of lyric
    chLyric: [],//array of lyric
    lyricSet: [],//array of objects that contain lyric and time
    audioURL: '',
    playButtonURL: '',
    lyricType: 'other',//chinese or other
    lyricToView: ''
  },

  // lyricScroll: function () {
  //   console.log('lyricScroll');
  //   this.setData({
  //     lyricToView: app.globalData.lyricPosition
  //   })
  // },
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

        //check if there's lyric for the song
        // if (!res.data.lyric) {
        //   console.log('No lyric')
        //   return false;
        // }


        //write more for no lyric song!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //assign lyric to data
        if(res.data.tlyric === ''){
          //chinese lyric only
          //spliting lyric
          let lyric = res.data.lyric;
          let timearr = lyric.split('[');
          let timeArray = [];
          let lyricArray = [];
          let timeLyricArray = [];
          timearr.forEach((item) => {
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let val = item.split(']')[1];
            timeArray.push('time' + key);
            lyricArray.push(val);
          })
          // console.log('Time: ' + timeArray);
          // console.log('Lyric: ' + lyricArray);
          for (let i = 0; i < timeArray.length; i++){
            timeLyricArray.push({ time: timeArray[i], lyric: lyricArray[i], index: 'index' + i});
          }

          that.setData({
            chLyric: lyricArray,
            lyricSet: timeLyricArray,
            lyricType: 'Chinese'
          });
          console.log('lyricSet: ');
          console.log(that.data.lyricSet);
          console.log('lyric Type: ' + that.data.lyricType);
          console.log('Chinese song, lyric loaded');
        }else{
          //2 languages lyric
          //spliting tlyric
          let tlyric = res.data.tlyric;
          let ttimearr = tlyric.split('[');
          let ttimeArray = [];
          let tlyricArray = [];
          let ttimeLyricArray = [];
          ttimearr.forEach((item) => {
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let val = item.split(']')[1];
            ttimeArray.push('time' + key);
            tlyricArray.push(val);
          })
          for (let i = 0; i < ttimeArray.length; i++) {
            ttimeLyricArray.push({ time: ttimeArray[i], lyric: tlyricArray[i], index: 'index' + i});
          }

          //spliting lyric
          let lyric = res.data.lyric;
          let timearr = lyric.split('[')
          let lyricArray = [];
          let timeLyricArray = [];
          timearr.forEach((item) => {
            // let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let val = item.split(']')[1];
            lyricArray.push(val);
          })
          for (let i = 0; i < lyricArray.length; i++) {
            ttimeLyricArray[i].tlyric = lyricArray[i];
          }
          
          that.setData({
            otherLangLyric: tlyricArray,
            chLyric: lyricArray,
            lyricSet: ttimeLyricArray,
            lyricType: 'other'
          });
          console.log('lyricSet: ');
          console.log(that.data.lyricSet);
          console.log('lyric Type: ' + that.data.lyricType);
          console.log('Non-Chinese song, lyric loaded');
        }

        //test for lyric
        console.log('lyric program starts');
        let i = 0;
        while (app.globalData.BGMstatus) {
          // !(isNaN(that.data.lyricSet[index].time))
          if (that.data.lyricSet[i].time !== 'timeNaN') {
            console.log('NaN event after');
            if (that.data.lyricSet[i].time === ('time' + Math.floor(app.globalData.back.currentTime))) {
              console.log('index passed: ' + i);
              let temp = that.data.lyricSet[i].index;

              // console.log('success!!!!!!! assigned value: ' + temp);
              that.setData({
                lyricToView: temp
              })
              console.log('success!!!!!!! assigned value: ' + that.data.lyricToView);
              i = i + 1;
              // condition = false;
              // console.log('success!!!!!!!');
            }
          } else {
            i = i + 1;
            console.log('NaN occured');
          }
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
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

debug:true