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
    otherLangLyric: [],
    chLyric: [],
    otherLangLyricSet: {},
    chLyricSet: {},
    audioURL: '',
    playButtonURL: ''
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

        //check if there's lyric for the song
        // if (!res.data.lyric) {
        //   console.log('No lyric')
        //   return false;
        // }

        //assign lyric to data
        if(res.tlyric === '' && res.lyric === ''){
          //spliting lyric
          let lyric = res.data.lyric;
          let timearr = lyric.split('[');
          let obj = {};
          let lyricArr = [];
          timearr.forEach((item) => {
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let val = item.split(']')[1];

            obj[key] = val;
          })
          for (let key in obj) {
            obj[key] = obj[key].split('\n')[0];
            lyricArr.push(obj[key]);
          }
          // console.log(obj);
          console.log(lyricArr);

        // cb && cb(obj, lyricArr)

          that.setData({
            chLyric: lyricArr,
            chLyricSet: obj
          });
          console.log('Chinese song, lyric loaded');
        }else{
          //spliting tlyric
          let tlyric = res.data.tlyric;
          let ttimearr = tlyric.split('[');
          let tobj = {};
          let tlyricArr = [];
          ttimearr.forEach((item) => {
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let val = item.split(']')[1];
            console.log(key);
            tobj[key] = val;
          })
          for (let key in tobj) {
            tobj[key] = tobj[key].split('\n')[0];
            tlyricArr.push(tobj[key]);
          }
          console.log(tobj);
          console.log(tlyricArr);

        // cb && cb(tobj, lyricArr)

          //spliting lyric
          let lyric = res.data.lyric;
          let timearr = lyric.split('[')
          let obj = {};
          let lyricArr = [];
          timearr.forEach((item) => {
            //key is time in second
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            //val is each line of lyric
            let val = item.split(']')[1];

            obj[key] = val;
          })
          for (let key in obj) {
            obj[key] = obj[key].split('\n')[0];
            lyricArr.push(obj[key]);
          }
          console.log(obj);
          console.log(lyricArr);

        // cb && cb(obj, lyricArr)
          
          that.setData({
            otherLangLyric: tlyricArr,
            chLyric: lyricArr,
            otherLangLyricSet: tobj,
            chLyricSet: obj
          });
          console.log('Non-Chinese song, lyric loaded');
        }

        //testing lyric
        // if(app.globalData.BGMstatus){
        //   let condition = true;
        //   while (condition) {
        //     let index = Math.round(app.globalData.back.currentTime);
        //     console.log('time: ' + Math.round(app.globalData.back.currentTime));
        //     console.log(that.data.otherLangLyricSet.index);
        //   }
        // }
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