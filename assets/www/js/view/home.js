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
	            	//update UI here
	            }
	            
	});

	var sql = 'SELECT * FROM run';
	dao.excuteSelect(sql,[], function(result) {
	            console.log(result);
	            if(result.length>0)
	            {
	            	localStorage.setItem("noOfRun", result.length);
	            	//update UI here
	            }
	            
	});
}