const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs:[]
  },
  clearLogs(){
    let logs=wx.getStorageSync('logs')||[];
    if(logs.length==0){
      wx.showToast({
        title: '暂无数据！',
        icon:"none"
      });
    }else{
      wx.showModal({
        title: '提示',
        content:"此操作不可逆，确定清除吗？",
        success:res=>{
          if(res.confirm){
            wx.removeStorage({
              key: 'logs',
              success:()=>{
                wx.showToast({
                  title: '清除成功！',
                  success:()=>{
                    this.setData({
                      logs:[]
                    })
                  }
                })
              }
            })
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let logs=wx.getStorageSync('logs')||[];
    if(logs.length>0){
      logs=logs.map(l=>{
        return {
          name:l.name,
          type:l.type,
          time:util.formatTime(new Date(l.time))
        };
      });
    }
    this.setData({
      logs:logs.reverse()
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})