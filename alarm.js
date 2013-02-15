var cp = require('child_process');



var alarm_time = "22:00";
var getAlarmDate = function(){
	var date = new Date();
//	console.log("getAlarmDate:"+date);
	var justDate = (date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()+" "+alarm_time;
	date = new Date(justDate);
	if(date.getTime()<(new Date()).getTime()){
		date = new Date((new Date()).getTime()+(1000*60*60*24));
		justDate = (date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()+" "+alarm_time;
	}
	return justDate;
}

var alarm = {
 check:function(){
     if(alarm.timeout != null){
         clearTimeout(alarm.timeout);
     }else{
		//First Run
		console.log('getDate: '+(getAlarmDate())+" alarm.alarm:"+new Date(alarm.alarm));
	}
     
     alarm.timeout = setTimeout(function() {
        var date = (new Date()).getTime();
//        console.log("Date: "+new Date(date)+" Alarm:"+ new Date(alarm.alarm));
        if(date >= alarm.alarm){
             console.log("Alarm went off");
             cp.exec("firefox http://tunein.com/radio/Studio-One-909-s35910/",function(error,stdout,stderr){

			alarm.alarm = (new Date(alarm.alarm)).getTime()+(1000*60*60*24);
			console.log("Resetting alarm for "+new Date(alarm.alarm));
			alarm.check();
             })
        }else{
             alarm.check();
        }
     }, 500);
 },
 timeout:null,
 alarm:(new Date(getAlarmDate())).getTime()
};

process.argv.forEach(function (val, index, array) {
  	console.log(index + ': ' + val);
	if((val.split("=")[0]).trim().toUpperCase() == "ALARM"){
		alarm_time = val.split("=")[1];
		console.log("alarm time: "+alarm_time+" date:"+new Date(getAlarmDate()));
		if((new Date(getAlarmDate())) == "Invalid Date"){
			console.log("Please give a valid time");
			throw new Error("Invalid Date");
		}else{
			alarm.alarm = getAlarmDate();
		}
	}
});

alarm.check();
