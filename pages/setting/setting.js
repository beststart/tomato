// pages/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    changeWork(e){
        wx.setStorageSync('workTime', e.detail.value);
    },
    changeRest(e){
        wx.setStorageSync('restTime', e.detail.value);
    },
    changeMp3(e){
        console.log(e)
        wx.setStorageSync('mp3Check', e.detail.value);
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            mp3Check:wx.getStorageSync('mp3Check'),
            workTime:wx.getStorageSync('workTime'),
            restTime:wx.getStorageSync('restTime')
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})