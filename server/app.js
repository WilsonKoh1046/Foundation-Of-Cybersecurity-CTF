const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const db = require('./users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('The server is alive');
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    for (let user of db.users) {
        if (user.username === username && user.password === password) {
            res.status(200).json({"Message": "success", "Data": user});
            return;
        }
    }
    res.status(404).json({"Message": "user not found"});
})

app.post('/edit', (req, res) => {
    const { newUsername, newPassword } = req.body;
    if (newUsername.substring(newUsername.length - 9) === 'giveAdmin') {
        res.status(201).json({"Message": "admin_granted"});
    }
    res.status(201).json({"Message": "ok"});
})

app.post('/verify-token', (req, res) => {
    const { token } = req.body;
    if (token === 'admin') {
        res.status(200).json({"Message": "verified"});
    } else {
        res.status(404).json({"Message": "denied"});
    }
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
