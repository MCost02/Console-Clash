const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isHost, isNotHost } = require('../middlewares/auth');
const { validateId, validateConnection, validateResult, validateRSVP } = require('../middlewares/validator');

const router = express.Router();

//GET /connections: view all connections 
router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection
router.get('/new', isLoggedIn, controller.new);

//POST /stories: create a new connection
router.post('/', isLoggedIn, validateConnection, validateResult, controller.create);

//GET /connections/:id: send details of connection identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit: send html form for editing an existing connection
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//PUT /connections/:id: update the connection identified by id
router.put('/:id', validateId, isLoggedIn, isHost, validateConnection, validateResult, controller.update);

//DELETE /connections/:id, delete the connection identified by id
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

router.post('/:id/rsvp', isLoggedIn, isNotHost, validateRSVP, validateResult, controller.rsvp);

module.exports = router;