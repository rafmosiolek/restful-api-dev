const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true,
}));
router.use(bodyParser.json());

router.post('/', (requestToServer, responseFromServer) => {
    User.create({
        name: requestToServer.body.name,
        email: requestToServer.body.email,
        password: requestToServer.body.password
    },
    (err, user) => {
        if (err) {
            return responseFromServer.status(500).send('A problem occured when adding the information to the database.');
        }
        responseFromServer.status(200).send(user);
    });
});

router.get('/', (requestToServer, responseFromServer) => {
    User.find({}, (err, users) => {
        if (err) {
            return responseFromServer.status(500).send("Couldn't find the users.");
        }
        responseFromServer.status(200).send(users);
    });
});


module.exports = router;