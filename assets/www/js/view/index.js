//initialise
//if user not exist....
if (localStorage.getItem("firstname")==false){
	localStorage.setItem("firstname", 'User');
	localStorage.setItem("lastname", 'New');
	localStorage.setItem("email", '');
	localStorage.setItem("img", '');
	localStorage.setItem("coins",0);
	localStorage.setItem("event", true);
	localStorage.setItem("weight", 60.0);
	//number of monster
	localStorage.setItem("noOfMonster", 0);
	//number of runs
	localStorage.setItem("noOfRun", 0);
}

//always run this when app started
initLocalStore();
function initLocalStore(){
	/*
	var sql = 'SELECT * FROM userProfile where id=1';
	dao.excuteSelect(sql,[], function(result) {
	            console.log(result);
	            if(result.length>0)
	            {
	            	localStorage.setItem("firstname", result[0].firstname);
	            	localStorage.setItem("lastname", result[0].lastname);
	            	localStorage.setItem("email", result[0].email);
	            	localStorage.setItem("img", result[0].img);
	            	localStorage.setItem("coins",result[0].coins);
	            	localStorage.setItem("weight", result[0].weight);
	            }
	            
	});
	 */
	var sql = 'SELECT * FROM pet where dead=0';
	dao.excuteSelect(sql,[], function(result) {
	            console.log(result);
	            if(result.length>0)
	            {
	            	localStorage.setItem("noOfMonster", result.length);
	            }
	            
	});

	var sql = 'SELECT * FROM run';
	dao.excuteSelect(sql,[], function(result) {
	            console.log(result);
	            if(result.length>0)
	            {
	            	localStorage.setItem("noOfRun", result.length);
	            }
	            
	});
}
