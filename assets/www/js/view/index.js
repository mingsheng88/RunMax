//initialise
//if user not exist....
if (!localStorage.getItem("firstname")) {
	localStorage.setItem("firstname", 'User');
	localStorage.setItem("lastname", 'New');
	localStorage.setItem("email", '');
	localStorage.setItem("img", '');
	localStorage.setItem("coins",5000);
	localStorage.setItem("event", 'yes');
	localStorage.setItem("weight", 60.0);
	localStorage.setItem("finishedRun",'false');


	// s = string, i = int, d = date, b = boolean

	// 0        1                 2                  3                  4								5            6
  // Name(s), energy_impact(i), fitness_impact(i), image_location(s), description(s), quantity(i), new(b)  
  item0 = ["Apple", 10, 2, "apple.gif", 'A healthy treat for your pet!', 0, false,200];
  item1 = ["Ice-cream", 4, -1, "icecream.gif", 'Perhaps... something sweet?', 2,false, 100];
  item2 = ["Hamburger", 37, -8, "hamburger.gif", 'Oh boy, that looks tasty. Squarish and all!', 0, false, 300];
  item3 = ["Sushi", 30, 4, "sushi.gif", 'Delicacies of the sea!', 0, false, 300];
  item4 = ["Happy Meal", 72, -12, "happymeal.gif", 'Sinning is fine, just don\'t overdo it~', 0, false, 700];
  item5 = ["Dumbbells",-38, 18, "dumbell.gif", 'Get fit without running! Warning though, do not use it when your pet is already really hungry!', 0, false, 200];

	localStorage.setItem("item0", JSON.stringify(item0));
	localStorage.setItem("item1", JSON.stringify(item1));
	localStorage.setItem("item2", JSON.stringify(item2));
	localStorage.setItem("item3", JSON.stringify(item3));
	localStorage.setItem("item4", JSON.stringify(item4));
	localStorage.setItem("item5", JSON.stringify(item5));
	localStorage.setItem("totalItems",6);

	
	// 0            1       2              3            4        5          6           7
	// Pet Name(s), age(i), created_at(d), last_mod(d), type(i), energy(i), fitness(i), dead(b)
	var petName=generate_name('egyptian');
	localStorage.setItem("pet0", JSON.stringify([petName, 0, new Date(), new Date(), 0, 50, 50, false]));
	localStorage.setItem("number-of-pets", 1);
	
	petName=generate_name('egyptian');
	localStorage.setItem("pet1", JSON.stringify([petName, 4, new Date(), new Date(), 2, 50, 50, false]));
	localStorage.setItem("number-of-pets", 2);
	
	petName=generate_name('egyptian');
	localStorage.setItem("pet2", JSON.stringify([petName, 4, new Date(), new Date(), 1, 50, 50, false]));
	localStorage.setItem("number-of-pets", 3);
	// pets = [["New Pet", 0, new Date(), new Date(), 0, 50, 50, false],["New Pet 2", 0, new Date(), new Date(), 0, 50, 50, false]];
	// localStorage.setItem('pet-list', pets);

	// type listing
	localStorage.setItem('monsters', ["baby.gif", "fat.gif", "fat2.gif", "fat3.gif", "fit.gif", "fit2.gif", "fit3.gif"]);

	//number of runs
	localStorage.setItem('distance-completed', 0);
	localStorage.setItem("runs-completed", 0);
} else {
	getLoginStatus("home.html", true);
}
