App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if(!wx.getStorageSync('workTime')){
      wx.setStorageSync('workTime', 25);
    }
    if(!wx.getStorageSync('restTime')){
      wx.setStorageSync('restTime', 5);
    }
    if(!wx.getStorageSync('mp3Check')){
      wx.setStorageSync('mp3Check', true);
    }
  }
})
