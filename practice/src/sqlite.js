var sqlite3 = require('sqlite3');

function make_database() {
    var db = new sqlite3.Database('example.db');

    db.serialize(function() {
        // Create a table
        db.run("CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, title TEXT, subject TEXT)");

        // Insert data into the table
        db.run("INSERT INTO Foo (name) VALUES ('bar')");

        // Query data from the table
        db.each("SELECT id, name FROM Foo", function(err, row) {
            console.log(row.id + ": " + row.name);
        });
    });

    db.close();
}

function make_table_sheets(database) {

    var db = new sqlite3.Database(database);

    db.run("CREATE TABLE IF NOT EXISTS sheets (id INTEGER PRIMARY KEY, title TEXT, subject TEXT)");

}

function insert_data_sheets(database, title, subject, callback) {

    var db = new sqlite3.Database(database);
    const sql = "INSERT INTO sheets (title, subject) VALUES (?,?)";
    var task = [title, subject];

    db.run(sql, task);

    db.get("SELECT MAX(id) as id FROM sheets LIMIT 1", [], (err, row) => {
        callback(row.id)
    });

}

function query_data_sheets(database, id) {

    var db = new sqlite3.Database(database);
    const sql = "SELECT id, title, subject FROM sheets WEHRE id=?";
    var task = [id]
    return db.get(sql, task);

}
//make_database();
//base = "base1.db"
//make_table_sheets(base)
//let new_id
//insert_data_sheets(base, "Komplexe Zahlen", "Mathematik", (id) => { new_id = id })
//console.log(new_id)
//console.log("id: ", id)
//console.log(query_data_sheets(base, id))



module.exports = { make_table_sheets, insert_data_sheets, query_data_sheets }