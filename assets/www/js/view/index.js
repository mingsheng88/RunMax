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
	//localStorage.setItem("noOfMonster", 0);
	//number of runs
	//localStorage.setItem("noOfRun", 0);
}
