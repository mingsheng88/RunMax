function dao() {
    this.initDB = initDB;
    this.excute = excute;
    this.excuteQuery = excuteQuery;

    var dbSize = 5 * 1024 * 1024; // 5MB
    var db = openDatabase("RunningMonster", "1.0", "DB for RunningMonster", dbSize);
    this.initDB();

    function initDB() {
        var runCreate = 'CREATE TABLE IF NOT EXISTS [run] (' + '[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,' + '[distance] REAL NULL,' + '[coins] INTEGER  NULL,' + '[startTime] TEXT  NULL,' + '[endTime] TEXT  NULL,' + '[runWith] TEXT  NULL,' + '[calories] REAL  NULL,' + '[coordinates] TEXT  NULL)';
        this.excute(runCreate);
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
}