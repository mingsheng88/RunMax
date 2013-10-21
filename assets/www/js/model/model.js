//var dao = new dao();
/*
function userProfile(firstname, lastname, email,  coins, img, runs, pets, items, activepetid) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.img = img;
    this.pets = pets;
    this.items = items;
    this.coins = coins;
    this.activepetid = activepetid;
    this.persist = persist;
    this.getUser = getUser;
    function persist() {
        var sql = 'UPDATE userProfile SET firstname=?, lastname=?, email=?, img=?, coins=?, activepetid=? WHERE id=1';
        dao.excute(sql, [this.firstname,this.lastname,this.email,this.img,this.coins,this.activepetid]);
    }
    function getUser(evlString) {
        var sql = 'SELECT * FROM userProfile';
        dao.excuteSelect(sql,[], function(result) {
            //result[]....
            eval(evlString);
        });
   }
}
*/
function rumon(petId) {
    thePet = JSON.parse(localStorage.getItem("pet" + petId));
    this.id = petId;
    this.petName = thePet[0];
    this.age = thePet[1];
    this.created_at = thePet[2];
    this.lastMod = thePet[3];
    this.type = thePet[4];
    this.energy = thePet[5];
    this.fitness = thePet[6];
    this.dead = thePet[7];

    this.update = update;
    function update() {
        thePet = JSON.parse(localStorage.getItem('pet' + this.id));
        thePet[0] = this.petName;
        thePet[1] = this.age;
        thePet[2] = this.created_at;
        thePet[3] = this.lastMod;
        thePet[4] = this.type;
        thePet[5] = this.energy;
        thePet[6] = this.fitness;
        thePet[7] = this.dead;
        localStorage.setItem('pet' + this.id, JSON.stringify(thePet));
    }
}

function updatePets() {
    for(i = 0; i < localStorage.getItem('number-of-pets'); i++) {
        // this.pet = JSON.parse(localStorage.getItem("pet" + i));
        var petpet = new rumon(i);
        updateStats();
        updateAge();
        checkDeath();
        petpet.update();
        $('#slider-energy-' + i).val(petpet.energy);
        $('#slider-fitness-' + i).val(petpet.fitness);
        $('#age' + i).val(petpet.age);
    }

    // Tested. 
    // Input requires a pet with ID. Need to get the select pet function out.
    this.updateStats = updateStats;
    function updateStats() {
        // Get time now and compare it to the last modified time of the pet
        var now = new Date().getTime();
        var lastModified = new Date(petpet.lastMod).getTime();
        var difference = now - lastModified;

        // Fitness drops at the rate of 15 / week | 2 / day
        var fitnessDrop = Math.floor(difference/40320000);
        // Energy drops at the rate of 40 / week | 5 / day
        var energyDrop = Math.floor(difference/15120000);

        petpet.lastMod = new Date(now);
        petpet.energy = petpet.energy - energyDrop;
        petpet.fitness = petpet.fitness - fitnessDrop;
    }

    // Need to work on img field
    this.updateAge = updateAge;
    function updateAge() {
        // Get time now and compare it to the last modified time of the pet
        var now = new Date().getTime();
        var lastModified = Date.parse(petpet.lastMod);
        var difference = now - lastModified;
        // Can consider adding a "Birthday" variable for accuracy
        // For now, adding days to age, ignoring denominators smaller than 3 hours
        var growth = Math.floor(Math.floor(difference/10800000) / 8);

        var newAge = petpet.age + growth;
        // Assuming max age of about 2 months
        // Pet will evolve 
        var typeNow = Math.floor(newAge / 20);
        // Pet evolves if the type now > type before
        if (typeNow > petpet.type) {
            alert("Congratulations! It seems like " + petpet.petName + " has evolved~~");
            petpet.evolvePet();
        }

        // Finally update age to the correct one
        // var sql = "UPDATE pet SET age=?, lastMod=? WHERE id=?";
        // dao.excute(sql, [newAge, new Date(now), this.id]);
        this.age = newAge;
        this.lastMod = new Date(now);
    }

    // img field not in yet
    function evolvePet() {
        // var sql = "UPDATE pet SET type=?, img=? WHERE id=?";

        // If fitness >= 70, type = fit.
        // If 70 >= fitness >= 40, type = normal
        // If fitness < 40, type = unfit
        if(petpet.fitness >= 70)
            petpet.type += 3;
            // dao.excute(sql, [type, monsters[type][3]], id);
            else if (petpet.fitness >= 40)
                petpet.type += 2;
            // dao.excute(sql, [type, monsters[type][2]], id);
            else
                petpet.type += 1;
            // dao.excute(sql, [type, monsters[type][1]], id);
        }

        this.checkDeath = checkDeath;
        function checkDeath() {
        // If (old age) 
        // or (no food for 4 weeks from birth of pet)
        // or (heart attack from obesity)
        if (petpet.age > 75 || petpet.energy < -30 || petpet.fitness < -30) {
            // Death: how to simulate?
            // var sql = "UPDATE pet SET dead=? WHERE id=?";
            // dao.excute(sql, [1, this.id]);
            petpet.dead = true;
            alert("Your pet... has passed on.. :(");
        }
    }
}

function run(distance, coins, startTime, endTime, runWith, calories, coordinates) {
    this.distance = distance;
    this.coins = coins;
    this.startTime = startTime;
    this.endTime = endTime;
    this.runWith = runWith;
    this.calories = calories;
    this.coordinates = coordinates;
}

function item(itemId) {
    var tmp = JSON.parse(localStorage.getItem('item' + itemId));
    //Name(s), energy_impact(i), fitness_impact(i), image_location(s), description(s), quantity(i), new(b)  
    this.id = itemId;
    this.name = tmp[0];
    this.energy_impact = tmp[1];
    this.fitness_impact = tmp[2];
    this.image_location = tmp[3];
    this.description = tmp[4];
    this.quantity = tmp[5];
    this.isNew = tmp[6];
    this.price = tmp[7];

    this.update = update;
    function update() {
        tmp[0] = this.name;
        tmp[1] = this.energy_impact;
        tmp[2] = this.fitness_impact;
        tmp[3] = this.image_location;
        tmp[4] = this.description;
        tmp[5] = this.quantity;
        tmp[6] = this.isNew;
        //tmp[7] = this.price;
        localStorage.setItem('item' + this.id, JSON.stringify(tmp));
    }
}