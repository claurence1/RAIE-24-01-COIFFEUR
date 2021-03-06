var models  = require('../models');
var express = require('express');
var router  = express.Router();

module.exports = (express) => {
    // http:get /rdv
    
    router.get('/', (req, res) => {
    models.db.Rdv.findAll({ raw: true }).then(rdv => {
        res.send(
            JSON.stringify(rdv)
        );
    });
});

// http:post /rdvs
router.post('/', (req, res) => {
    models.db.Rdv.create({
        nomClient: req.body.nomClient,
        prenomClient: req.body.prenomClient,
        nomCoiffeur: req.body.nomCoiffeur,
        dateRdv: req.body.dateRdv,
    }).then(t => {
        res.status(201).send(JSON.stringify(t));
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    });
});

// http:get /rdv/id
router.get('/:id', (req, res) => {
    models.db.Rdv.findOne({
        where: { idRdv: req.params.id }
    }).then(t => {
        res.status(201).send(JSON.stringify(t));
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    });
});

// http:delete /rdv/id
router.delete('/:id', (req, res) => {
    models.db.Rdv.destroy({
        where: { idRdv: req.params.id }
    }).then(t => {
        res.status(201).send(JSON.stringify(t));
    }).catch((err) => {
        res.status(400).send(JSON.stringify(err))
    });
});

// http:update /rdv/{id}
router.put('/:id', (req, res) => {
    models.db.Rdv.update({
        nomClient: req.body.nomClient,
        prenomClient: req.body.prenomClient,
        nomCoiffeur: req.body.nomCoiffeur,
        dateRdv: req.body.dateRdv
    }, {
        where: { idRdv: req.params.id }
    }).then(t => {  
        res.status(201).send(JSON.stringify(t));
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    });
});
    return router
}
