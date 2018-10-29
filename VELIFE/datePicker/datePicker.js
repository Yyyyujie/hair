// components/date-picker/datePicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    beginDate: {
      type: Date,
      observer: function (timestamp) {
        let date = new Date(timestamp)
        this.initDate(date)
        this.setData({
          value: [0, 0, 0, 0, 0]
        })
      }
    },
    showYear: {
      type: Boolean,
      value: true
    },
    showMonth: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: [],
    value: [0, 0, 0, 0, 0],
    date: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initDate: function (date) {
      let yearArr = []
      let monthArr = []
      let dayArr = []
      let hoursArr = []
      let minutesArr = []

      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()

      this.startDate = {
        year,
        month,
        day,
        hours,
        minutes
      }
      this.data.selected = [year, month, day, hours, minutes]

      yearArr.push(year);
      yearArr.push(year+1)

      for (let i = month; i <= 12; i++) {
        monthArr.push(this.padStart(i))
      }
      // console.log(monthArr)
      for (let i = day; i <= this.getMonthDay(date); i++) {
        dayArr.push(this.padStart(i))
      }

      for (let i = hours; i <= 23; i++) {
        hoursArr.push(this.padStart(i))
      }

      for (let i = minutes; i <= 59; i++) {
        minutesArr.push(this.padStart(i))
      }

      this.setData({
        yearArr,
        monthArr,
        dayArr,
        hoursArr,
        minutesArr,
        date:date
      })
      this.startDayArr = dayArr
      this.startHoursArr = hoursArr
      this.startMinutesArr = minutesArr
    },

    handleChange: function (e) {
      const value = e.detail.value

      let dayArr = []
      let hoursArr = []
      let minutesArr = []
      let monthArr=[]
      let selectedYear = this.data.yearArr[value[0]]
      let selectedMonth = this.data.monthArr[value[1]]
      let selectedDay = this.data.dayArr[value[2]]
      let selectedHours = this.data.hoursArr[value[3]]
      let selectedMinutes = this.data.minutesArr[value[4]]

      this.data.selected[0] = selectedYear
      this.data.selected[1] = selectedMonth
      this.data.selected[2] = selectedDay
      this.data.selected[3] = selectedHours
      this.data.selected[4] = selectedMinutes

      let dayCount = this.getMonthDay(new Date(selectedYear, selectedMonth - 1));
      if (selectedYear > this.startDate.year){ //年更改
      // console.log(">>>>")
        for (let i = 1; i <= 12; i++) {
          monthArr.push(this.padStart(i))
        }
        for (let i = 1; i <= dayCount; i++) {
          dayArr.push(this.padStart(i))
        }
        for (let i = 0; i <= 23; i++) {
          hoursArr.push(this.padStart(i))
        }
        for (let i = 0; i <= 59; i++) {
          minutesArr.push(this.padStart(i))
        }
        value[1] = selectedMonth - 1
        value[2] = selectedDay - 1
        value[3] = selectedHours
        value[4] = selectedMinutes
      } else if (selectedMonth > this.startDate.month) { // 月修改的同时修改日、时分，并且更新索引
        for (let i = 1; i <= dayCount; i++) {
          dayArr.push(this.padStart(i))
        }
        for (let i = 0; i <= 23; i++) {
          hoursArr.push(this.padStart(i))
        }
        for (let i = 0; i <= 59; i++) {
          minutesArr.push(this.padStart(i))
        }
        value[2] = selectedDay - 1
        value[3] = selectedHours
        value[4] = selectedMinutes
      } else {     
        dayArr = this.startDayArr
        hoursArr = this.startHoursArr
        minutesArr = this.startMinutesArr

        value[2] = 0
        value[3] = 0
        value[4] = 0
        if (selectedYear = this.startDate.year){
          let date=this.data.date;
          let month = date.getMonth() + 1;
          monthArr=[];
          for (let i = month; i <= 12; i++) {
            monthArr.push(this.padStart(i))
          }
        }
        if (selectedDay > this.startDate.day) {
          hoursArr = []
          minutesArr = []

          for (let i = 0; i <= 23; i++) {
            hoursArr.push(this.padStart(i))
          }
          for (let i = 0; i <= 59; i++) {
            minutesArr.push(this.padStart(i))
          }
      
          value[2] = selectedDay - this.startDate.day
          value[3] = selectedHours
          value[4] = selectedMinutes
        } else {
          if (selectedHours > this.startDate.hours) {
            minutesArr = []
            value[3] = selectedHours - this.startDate.hours
            value[4] = selectedMinutes
            for (let i = 0; i <= 59; i++) {
              minutesArr.push(this.padStart(i))
            }
          } else {
            if (selectedMinutes > this.startDate.minutes) {
              value[4] = selectedMinutes - this.startDate.minutes
            }
          }
        }
      }

      this.setData({
        value,
        monthArr: monthArr.length ? monthArr : this.data.monthArr,
        dayArr: dayArr.length ? dayArr : this.data.dayArr,
        hoursArr: hoursArr.length ? hoursArr : this.data.hoursArr,
        minutesArr: minutesArr.length ? minutesArr : this.data.minutesArr
      })
      this.setData({
        value
      })
    },

    padStart: function (string, length = 2, pad = 0) {
      const s = String(string)
      if (!s || s.length >= length) return string
      return `${Array((length + 1) - s.length).join(pad)}${string}`
    },

    getMonthDay: function (date) { // 获取当月的天数
      let curMonth = date.getMonth();
      date.setMonth(curMonth + 1);
      console.log(date.setMonth(curMonth + 1));
      date.setDate(0);
     
      return date.getDate()
    },

    cancel: function() {
      this.triggerEvent('cancel',true)
    },

    confirm: function () {
      this.triggerEvent('confirm', {
        value: this.data.selected,
        timeStamp: new Date(this.data.selected[0], this.data.selected[1] - 1, this.data.selected[2], this.data.selected[3], this.data.selected[4]).getTime()
      })
    }
  }
})
