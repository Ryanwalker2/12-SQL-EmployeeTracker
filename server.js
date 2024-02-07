const mysql = require('mysql2');
const PORT = 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = db;