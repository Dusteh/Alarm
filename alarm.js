var cp = require('child_process');


var alarm_time = "5:00 am";
var getAlarmDate = function(){
	var date = new Date((new Date()).getTime()+(1000*60*60*24));
//	console.log("getAlarmDate:"+date);
	var justDate = (date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()+" "+alarm_time;
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
}


alarm.check();
