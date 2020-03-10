let interval;
let s=60;
let minu;
let workTime,restTime,mp3Check;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    minutes:"25",
    seconds:"00",
    msg:"工作",
    show:false,
    isEnd:false,
    duration:10*1000
  },
  setTimer(m){
    minu=1;
    interval=setInterval(() => {
      if(this.data.seconds=="00"||s==0){
        minu--;
        s=60;
      }
      s--;
      this.setData({
        seconds:s,
        minutes:minu
      });
      if(minu==0&&s==0){
        clearInterval(interval);
        this.playMisuc();
      }
    }, 1000);
  },
  startTimer(e){
    let myMsg=e.currentTarget.dataset.msg;
    if(myMsg=="工作"){
      if(this.data.msg){
        myMsg=this.data.msg;
      }
      this.setTimer(workTime);
    }else{
      this.setData({
        minutes:restTime
      });
      this.setTimer(restTime);
    }
    this.setData({
      topAnimation:wx.createAnimation({duration:1000}).height("100%").step().export(),
      isEnd:false,
      msg:myMsg
    });
    this.saveLog("开始");
  },
  animationEnd(){
    if(!this.data.isEnd){
      this.setData({
        show:true
      })
    }
  },
  endTimer(){
    let type="停止";
    if(s==0&&minu==0){
      type="完成";
    }
    this.saveLog(type);
    this.stopMisuc();
    this.init();
    clearInterval(interval);
    this.setData({
      topAnimation:wx.createAnimation({duration:1000}).height("50%").step().export(),
      show:false,
      isEnd:true,
      msg:"工作",
      seconds:"00",
      minutes:workTime
    });
  },
  getValue(e){
    this.setData({
      msg:e.detail.value
    });
  },
  playMisuc(){
    if(mp3Check){
      this.data.innerAudioContext.src="cloud://kakarot-ygvcg.6b61-kakarot-ygvcg-1301452953/background_mp3/12230.mp3";
      this.data.innerAudioContext.autoplay=true;
      this.data.innerAudioContext.loop=true;
    }
  },
  stopMisuc(){
    this.data.innerAudioContext.stop();
  },
  saveLog(type){
    let logObj={
      name:this.data.msg,
      time:new Date().getTime(),
      type:type
    };
    let logs=wx.getStorageSync('logs')||[];
    logs.push(logObj);
    wx.setStorageSync('logs', logs);
  },
  init(){
    if(!this.data.show){
      workTime=wx.getStorageSync('workTime');
      restTime=wx.getStorageSync('restTime');
      mp3Check=wx.getStorageSync('mp3Check');
      this.setData({
        minutes:workTime
      });
    }
  },
  onLoad(){
    this.setData({
      innerAudioContext:wx.createInnerAudioContext()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})