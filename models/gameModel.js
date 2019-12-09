const db = require("../callDB.js")
const pool = db.pool

function getAllGames(callback){
    //var sql = `SELECT title FROM game_pub gp LEFT JOIN board_game bg ON gp.game_id = bg.game_id`
    var sql = `SELECT title FROM board_game`

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {

            var results = {
                list:result.rows
            }
            callback(results)
        }
        
    })    
}

function searchByTitle(title, callback){
    var sql = `SELECT title FROM board_game WHERE title = $1::text`
    var params = [title]
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = {
                list:result.rows
            }
            callback(results)
        }
      
    })
}

function searchByPub(publisher, callback){
    var sql = `SELECT title FROM board_game bg LEFT JOIN unique_game ug ON bg.game_id = ug.game_id LEFT JOIN publisher p ON ug.pub_id = p.pub_id WHERE pub_name = $1::text`
    var params = [publisher]
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = {
                list:result.rows
            }
            callback(results)
        }
      
    })
}

function postGame(title, time, complexity, num_players, callback){
    var sql = `INSERT INTO board_game (title, time_length_min, complexity, num_players) VALUES ($1, $2, $3, $4) RETURNING game_id`
    var params = [title, time, complexity, num_players]
    console.log(params)
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = result.rows
            
            callback(results)
        }
    })
}

function postPub(publisher, callback){
    var sql = `INSERT INTO publisher (pub_name) VALUES ($1) RETURNING pub_id`
    var params = [publisher]
    console.log(params)
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = result.rows
            
            callback(results)
        }
    })
}

function postUniqueGame(game_id, pub_id, callback){
    var sql = `INSERT INTO unique_game (game_id, pub_id) VALUES ($1, $2) RETURNING unique_game_id`
    var params = [game_id, pub_id]
    console.log(params)
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = result.rows
            
            callback(results)
        }
    })
}

module.exports={
    getAllGames: getAllGames,
    searchByTitle: searchByTitle,
    searchByPub: searchByPub,
    postGame: postGame,
    postPub: postPub,
    postUniqueGame: postUniqueGame
}