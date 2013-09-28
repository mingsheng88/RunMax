var dao = new dao();
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

function pet(petName, age, lastMod, type, energy, fitness) {
    this.petName = petName;
    this.age = age;
    this.lastMod = lastMod;
    this.type = type;
    this.energy = energy;
    this.fitness = fitness;


    // Needs one select statement
    this.getPet = getPet;
    function getPet(id, evlString) {
        var sql = 'SELECT * FROM pet WHERE id = ' + id;
        dao.excuteSelect(sql,[], function(result) {
            //result[]....
            eval(evlString);
        });
    }

    this.update = update;
    function update() {
        var sql = 'UPDATE pet SET petName=?, age=?, lastMod=?, type=?, energy=?, fitness=? WHERE id=1';
        dao.excute(sql, [this.petName,this.age,this.lastMod,this.type,this.energy,this.fitness]);
    }

    this.persist = persist;
    function persist() {
        var sql = 'INSERT INTO pet (age, type, energy, fitness) VALUES (?,?,?,?)';
        dao.excute(sql, [0,this.type,50,50]);
    }

    this.feedPet = feedPet;
    function feedPet(id, itemId) {
        var item = dao.getItem(itemId);
        var sql = "UPDATE pet SET energy=?, fitness=?, lastMod=? WHERE id=?";
        // Needs to find a way to get the "this.energy". It should be from session.
        dao.excute(sql, [(this.energy - item[1]), (this.fitness - item[2]), new Date(now), id]);
    }

    // Pet Accessors
    this.getActivePet = getActivePet;
    function getActivePet() {
        try {
            // Get user's active pet's ID
            var sql="SELECT * FROM userProfile";
            var res = dao.excute(sql,[1]);
            var id = res.rows.item(0);

            // Use the pet ID to find the specific pet
            res = dao.execute("SELECT * FROM pet WHERE id = ?", [id]);
            return res;
        } catch(e) {
            alert(e);
            return "No active pet";
        }
    }

    // Tested. 
    // Input requires a pet with ID. Need to get the select pet function out.
    this.updateStats = updateStats;
    function updateStats() {
        // Get time now and compare it to the last modified time of the pet
        var now = new Date().getTime();
        var lastModified = new Date(this.lastMod).getTime();
        var difference = now - lastModified;

        // Fitness drops at the rate of 15 / week | 2 / day
        var fitnessDrop = Math.floor(difference/40320000);
        // Energy drops at the rate of 40 / week | 5 / day
        var energyDrop = Math.floor(difference/15120000);

        // Update drop values
        // update ui
        var sql = "UPDATE pet SET energy=?, fitness=?, lastMod=? WHERE id=?";
        dao.excute(sql, [(this.energy - energyDrop), (this.fitness - fitnessDrop), new Date(now), this.id]);

        return [fitnessDrop, fitnessDrop];
    }

    // Need to work on img field
    this.updateAge = updateAge;
    function updateAge() {
        // Get time now and compare it to the last modified time of the pet
        var now = new Date().getTime();
        var lastModified = Date.parse(this.lastMod);
        var difference = now - lastModified;
        // Can consider adding a "Birthday" variable for accuracy
        // For now, adding days to age, ignoring denominators smaller than 3 hours
        var growth = Math.floor(Math.floor(difference/10800000) / 8);
        alert(growth);

        var newAge = this.age + growth;
        // Assuming max age of about 2 months
        // Pet will evolve 
        var typeNow = Math.floor(newAge / 20);
        // Pet evolves if the type now > type before
        if (typeNow > type) {
            // Pet is evolving
            // Will come up with a more elegant way to notify
            // Probably in the form of a jQuery Mobile dialog. 
            alert("Your pet is... evolving!");
            // this.evolvePet("TO DECIDE HOW TO GET USER AGREEMENT... (Or whether there should even be such a function", fitness, typeNow, id);
        }

        // Finally update age to the correct one
        var sql = "UPDATE pet SET age=?, lastMod=? WHERE id=?";
        dao.excute(sql, [newAge, new Date(now), this.id]);
    }

    // img field not in yet
    function evolvePet(userAgreement, fitness, type, id) {
        if(userAgreement) {
            var sql = "UPDATE pet SET type=?, img=? WHERE id=?";

            // If fitness >= 70, type = fit.
            // If 70 >= fitness >= 40, type = normal
            // If fitness < 40, type = unfit
            if(fitness >= 70)
                dao.excute(sql, [type, monsters[type][3]], id);
            else if (fitness >= 40)
                dao.excute(sql, [type, monsters[type][2]], id);
            else
                dao.excute(sql, [type, monsters[type][1]], id);
        }
    }

    this.checkDeath = checkDeath;
    function checkDeath() {
        // If (old age) 
        // or (no food for 4 weeks from birth of pet)
        // or (heart attack from obesity)
        if (this.age > 75 || this.energy < -30 || this.fitness < -30) {
            // Death: how to simulate?
        }
    }

    // To test, change "this.id" from each field to 1 and run the DBTEST page.
    this.updatePet = updatePet;
    function updatePet() {
        this.updateStats();
        this.updateAge();
        this.checkDeath();
    }
    // Pet Accessors end
}


// function item(type, name, energy, fitness) {
// this.type = type;
// this.name = name;
// this.energy = energy;
// this.fitness = fitness;
function item(type) {
    this.type = type;
    items = dao.getItem(type);
    this.name = items[0];
    this.energy = items[1];
    this.fitness = items[2];

    this.persist = persist;
    function persist() {
        var sql = 'INSERT INTO ownedItems (itemId) VALUES (?)';
        dao.excute(sql, [this.type]);
    }

    this.getUserItems = getUserItems;
    function getUserItems(evlString) {
        var sql = 'SELECT * FROM ownedItems';
        dao.excuteSelect(sql,[], function(result) {
            //result[]....
            eval(evlString);
        });
    }

    this.deleteItem = deleteItem;
    function deleteItem(itemId) {
        var sql = 'DELETE FROM ownedItems WHERE id = ?';
        dao.excute(sql, [itemId]);
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
