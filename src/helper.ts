export default class MyHelper {
    static generateID(): string {
        var dateObj = new Date();
        return dateObj.getTime().toString();
    }
    static getCurrentDateTime() {
        var dateObj = new Date();
        // var second = dateObj.getSeconds();
        // var minute = dateObj.getMinutes();
        // var hour = dateObj.getHours();
        // var month = dateObj.getMonth() + 1; //months from 1-12
        // var day = dateObj.getDate();
        // var year = dateObj.getFullYear();
        // var returnValue = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        // return returnValue;
        return dateObj.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        });
    }
}