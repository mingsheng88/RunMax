function dao() {
    this.initDB = initDB;
    this.excute = excute;
    this.initItems = initItems;
    this.initMonsters = initMonsters;
    this.excuteQuery = excuteQuery;

    var dbSize = 5 * 1024 * 1024; // 5MB
    var db = openDatabase("RunningMonster", "1.0", "DB for RunningMonster", dbSize);
    var items;
    var monsters;
    this.initDB();
    this.initItems();
    this.initMonsters();

    function initDB() {
    	/*
        var userProfileCreate = 'CREATE TABLE IF NOT EXISTS [userProfile] (' + '[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,' + '[firstname] TEXT  NULL,' + '[lastname] TEXT  NULL,' + '[email] TEXT  NULL,' + '[img] TEXT  NULL,' + '[coins] INTEGER DEFAULT 0 NULL,' +'[weight] REAL NULL,'+'[activepetid] INTEGER)';
        this.excute(userProfileCreate);
        */

        var petCreate = 'CREATE TABLE IF NOT EXISTS [pet] ' + '([id] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,' + '[petName] TEXT  NULL,' + '[age] INTEGER  NULL,' + '[lastMod] TEXT  NULL,' + '[type] INTEGER  NULL,' + '[energy] FLOAT  NULL,' + '[fitness] REAL  NULL,'+'[birthTime] TEXT  NULL,'+'[dead] INTEGER DEFAULT 0 NULL)';
        this.excute(petCreate);

        var runCreate = 'CREATE TABLE IF NOT EXISTS [run] (' + '[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,' + '[distance] REAL NULL,' + '[coins] INTEGER  NULL,' + '[startTime] TEXT  NULL,' + '[endTime] TEXT  NULL,' + '[runWith] TEXT  NULL,' + '[calories] REAL  NULL,' + '[coordinates] TEXT  NULL)';
        this.excute(runCreate);

        var ownedItemsCreate = 'CREATE TABLE IF NOT EXISTS [ownedItems] (' + '[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,' + '[itemId] INTEGER  NULL' + ')';
        this.excute(ownedItemsCreate);

        
        
        //check user exist, add a default user if not exist
        /*
        var sql='SELECT * FROM userProfile';
        this.excuteSelect(sql,[], function(ret) {
            console.log("user exist ="+(ret.length>0));
            if (ret.length === 0) {
                //init user
                var initUser = 'INSERT INTO userProfile (id, firstname, lastname, img, activepetid,weight) VALUES (1,"first name", "last name", "nil", 1,60.5)';
                excute(initUser);
                //init pet
                var initPet = 'INSERT INTO pet (id, petName, age, type, energy, fitness) VALUES (1, "First", 0, 0, 50, 20)';
                excute(initPet);
            }
        });
        */
        
    }


    function excuteQuery(query,para,callBack){ // <-- extra param
        if (para == 'undefined') {
            para = [];
        }
        var result = [];
        db.transaction(function (tx) {
          tx.executeSql(query, para, function(tx, rs){
            console.log('SQL: ' + query);
            console.log(rs);
            var len = rs.rows.length,
            i;
            for (i = 0; i < len; i++) {
                var row=rs.rows.item(i);
                result[i]=row;
                console.log('RESULT: ' + rs.rows.item(i).id);
            }
         //console.log(result);
         //if (typeof callback === "function")
         callBack(result); // <-- new bit here
     }, error);
      });
    }

    function excute(sql, para) {
        if (para == 'undefined') {
            para = [];
        }
        
        db.transaction(function(tx) {
            tx.executeSql(sql, para, function(tx, results) {
                console.log('SQL: ' + sql);
                console.log(results);
                var ret=[];
                var len = results.rows.length,
                i;
                for (i = 0; i < len; i++) {

                    //console.log(ret);
                    console.log('RESULT: ' + results.rows.item(i).id);
                }
            },error);
        });

    }



    function error(tx,e) {
        console.log("DB error : " + e.message);
    }

    function initItems() {
        // Item 
        // --> Food | Toy
        //     --> Name
        //         --> Impact: Hunger, Fitness     
        items = [["Apple", 10, 2, "apple.png"],
        ["Ice-cream", 4, -1, "icecream.png"],
        ["Hamburger", 37, -8, "burger.png"],
        ["Sushi", 30, 4, "sushi.png"],
        ["Happy Meal", 72, -12, "happymeal.png"],
        ["Dumbbells",-38, 18, "dumbbells.png"]
        ];
    }

    this.getItem = getItem;
    function getItem(itemId) {
        return items[itemId];
    }

    function initMonsters() {
        // Monster
        // --> Qualification of fitness for evolution
        //         --> Location of image
        monsters = ["baby.png", "fat.png", "fat2.png", "fit.png", "fit2.png"];
    }

    this.getMonsters = getMonsters;
    function getMonsters(monsterId) {
        return monsters[monsterId];
    }
}