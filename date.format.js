//DATE 형식 포맷 커스텀 추가
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일", "월", "화", "수", "목", "금", "토"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
        case "yyyy": return d.getFullYear();
        case "yy": var yy = (d.getFullYear() % 1000); return (yy.toString().length > 1 ? yy : "0"+yy);
        case "MM": var MM = (d.getMonth() + 1); return (MM.toString().length > 1 ? MM : "0"+MM);
        case "dd": return (d.getDate().toString().length > 1 ? d.getDate() : "0"+d.getDate());
        case "E": return weekName[d.getDay()];
        case "HH": return (d.getHours().toString().length > 1 ? d.getHours() : "0"+d.getHours());
        case "hh": var hh = ((h = d.getHours() % 12) ? h : 12); return (hh.length > 1 ? hh : "0"+hh);
        case "mm": return (d.getMinutes().toString().length > 1 ? d.getMinutes() : "0"+d.getMinutes());
        case "ss": return (d.getSeconds().toString().length > 1 ? d.getSeconds() : "0"+d.getSeconds());
        case "a/p": return d.getHours() < 12 ? "오전" : "오후";
        default: return $1;
        }
    });
};

/* 월 계산을 위한 추가 함수 */
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};
Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
Date.prototype.addYears = function (years) {
	this.setYear(this.getFullYear() + parseInt(years));
	return this;
}

function getDateStringFormatted(dateString) {
	var yyyy = dateString.substr(0, ("yyyy").length);
	var MM = dateString.substr(("yyyy").length, ("MM").length);
	var dd = dateString.substr(("yyyyMM").length, ("dd").length);
	
	return yyyy + "/" + MM + "/" + dd;
}
