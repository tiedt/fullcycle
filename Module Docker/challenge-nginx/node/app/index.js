const express = require('express')
const server = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
var create = "CREATE TABLE IF NOT EXISTS people (name VARCHAR(255))";
connection.query(create)

const sql = "INSERT INTO people (name) VALUES ('Wesley'), ('João'), ('Maria'), ('Pedro');"

connection.query(sql)

var peoples = []

var query = connection.query('SELECT * FROM people', null, function(err, rows) {
    if (err) {
        console.log(err);
    } else {
        peoples = rows.map( row => row.name);        
    }
});

//connection.query(query)

connection.end()


server.get('/', (req,res) => {

    var table = "<table><tr><th>Name</th></tr>"
    
    peoples.forEach(element => {
        table = table.concat("<tr><td>"+ element + "</td></tr>")
    });

    table = table.concat("</table>");    

    res.send('<h1>Full Cycle Rocks!</h1>'+ table)
})

server.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})