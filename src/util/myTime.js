module.exports = {
  getTime(str){
    let date = new Date(str);
    let obj = {
      y: date.getFullYear(),
      m: date.getMonth()+1,
      d: date.getDate(),
      h: date.getHours(),
      min: date.getMinutes(),
      s: date.getSeconds(),
      time(){
        let timeStr = `${this.y}年${this.m}月${this.d}日  ${this.h}:${this.min}:${this.s}`;
        return timeStr;
      }
    }
    return obj
  }
}
