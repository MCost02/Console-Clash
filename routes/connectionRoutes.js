const express = require('express');
const controller = require('../controllers/connectionController');
const router = express.Router();

//GET /connections: view all connections 

router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection

router.get('/new', controller.new);

//POST /stories: create a new connection

router.post('/', controller.create);

//GET /connections/:id: send details of connection identified by id

router.get('/:id', controller.show);

//GET /connections/:id/edit: send html form for editing an existing connection

router.get('/:id/edit', controller.edit);

//PUT /connections/:id: update the connection identified by id

router.put('/:id', controller.update);

//DELETE /connections/:id, delete the connection identified by id
router.delete('/:id', controller.delete);

module.exports = router;