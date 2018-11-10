Page({

  /**
   * 页面的初始数据
   */
  data: {
    sayWords:"请出拳吧",
    winNum:0,
    successionWinNum:0,
    playerImg:"",
    pcImg:"",
    winOrlose:"",
    imgs:[
      "../images/111.jpg",
      "../images/222.jpg",
      "../images/333.jpg"
    ]
  },
  setWinNumTxt: function (num) {
    var that = this;
    this.setData({
      winNumAnimation: "transform: scale(2)"
    });
    setTimeout(function () {//移除动画样式
      that.setData({
        winNumAnimation: ""
      });
    }, 200);
  },
  setSayWords: function (successionNum) {//设置不同的称号用语
    var that = this;
    var sayword = "";
    if (successionNum <= 0) {
      sayword = "请出拳吧"
    } else if (successionNum > 0 && successionNum <= 3) {
      sayword = "打的不错哟！"
    } else if (successionNum > 3 && successionNum <= 7) {
      sayword = "勇冠全场！"
    } else {
      sayword = "超越神啦！"
    }
    that.setData({
      sayWords: sayword,
      sayWordsAnimation: "transform: scale(1.4)"
    });
    setTimeout(function () {//移除动画样式
      that.setData({
        sayWordsAnimation: ""
      });
    }, 200);
  },
  getResult:function(a,b){
    var state={win:false,lose:false,draw:false}
    var c=a-b;
    if(c==-2||c==1){
      state.win=true
      }
    else if(c==-1||c==2){
      state.lose=true
    }else{
      state.draw=true
    }
    return state
  },
  beforePlay:function(){
    this.setData({
      playerImg:"",
      pcImg:"",
      winOrlose:""
    })
  },
  setResultImg:function(res,player,pc){
    var winNum = this.data.winNum;
    var successionWinNum = this.data.successionWinNum;
    this.setData({
      playerImg: this.data.imgs[player-1],
      pcImg: this.data.imgs[pc-1]  
    })
    if(res.win){
      winNum++;
      successionWinNum++;
      this.setData({
        winOrlose: "Win!",
        winNum: winNum,
        successionWinNum: successionWinNum
      })
      this.setWinNumTxt(winNum);
    }else if(res.lose){
      successionWinNum=0;
      this.setData({
        winOrlose: "Lose!",
        successionWinNum: successionWinNum
      })
    }else{
      successionWinNum = 0;
      this.setData({
        winOrlose: "Draw!",
        successionWinNum: successionWinNum
      })
      this.setSayWords(this.data.successionWinNum);
    }
  },
  play:function(event){
    var that=this;
    var playerVal=parseInt(event.currentTarget.dataset.val);
    var randomVal = parseInt(Math.random() * 3 + 1, 10);
    var result = this.getResult(playerVal, randomVal);
    this.beforePlay();
    wx.showToast({
      title: '计算结果中...',
      icon: 'loading'
    });
    setTimeout(function () {
      wx.hideToast();
      that.setResultImg(result, playerVal, randomVal);
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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