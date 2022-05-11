/* ------------- */
const host = 'sql.pukawka.pl'
const port = '3306'
const login = ''
const password = ''
const database = '850839_pshoptest'
const tabela = 'pShop_Members'
/* ------------- */


function convert() {
    const mysql = require("mysql")
    const connection = mysql.createConnection({
        host: host,
        port: port,
        user: login,
        password: password,
        database: database,
    });

    connection.connect( function (err) {
        if (err) throw err;
        connection.query(`SELECT * FROM ${tabela}`, async function (err, result) {
            if (err) throw err;
            const length = Object.keys(result).length;
            for (var i = 0; i < length; i++) 
            {
                const SteamID = require('steamid');
                let sid = new SteamID(result[i].SteamId);
                let steamid64 = sid.getSteamID64();
                connection.query(`UPDATE ${tabela} SET SteamId = REPLACE(SteamId, '${result[i].SteamId}', '${steamid64}')`)
            };
          connection.end()
        });
    });
};

convert();