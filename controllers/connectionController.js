const model = require('../models/connection');
const rsvp_model = require('../models/rsvp');

exports.index = (req, res, next) => {
    model.find()
        .then(connections => res.render('./connection/connections', { connections }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./connection/newConnection');
};

exports.create = (req, res, next) => {
    let connection = new model(req.body);
    connection.host = req.session.user;
    connection.save()
        .then(connection => {
            req.flash('success', 'Connection has been created successfully');
            res.redirect('/connections');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/back');
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('host', 'firstName lastName')
        .then(connection => {
            rsvp_model.find({ connection: id, status: 'Yes' })
                .then(rsvps => {
                    if (connection) {
                        return res.render('./connection/connection', { connection, rsvps });
                    } else {
                        let err = new Error('Cannot find a connection with id ' + id);
                        err.status = 404;
                        next(err);
                    }
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(connection => {
            if (connection) {
                return res.render('./connection/edit', { connection });
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;
    model.findByIdAndUpdate(id, connection, { runValidators: true })
        .then(connection => {
            return res.redirect('/connections/' + id);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/back');
            }
            next(err);
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id)
        .then(connection => {
            rsvp_model.deleteMany({ connection: id })
                .then(rsvp => {
                    req.flash('success', 'Connection and RSVPs were deleted successfully!');
                    res.redirect('/connections');
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;
    rsvp_model.findOne({ connection: id, attendee: req.session.user })
        .then(result => {
            if (!result) {
                let rsvp = new rsvp_model(req.body);
                rsvp.connection = id;
                rsvp.attendee = req.session.user;
                rsvp.save()
                    .then(rsvp => {
                        req.flash('success', 'You have successfully RSVP\'\d for this event!');
                        res.redirect('/users/profile');
                    })
                    .catch(err => next(err));
            } else {
                let rsvp = req.body;
                rsvp_model.findOneAndUpdate({ connection: id, attendee: req.session.user }, rsvp, { useFindAndModify: false, runValidators: true })
                    .then(connection => {
                        req.flash('success', 'RSVP status was updated successfully!');
                        res.redirect('/users/profile');;
                    })
                    .catch(err => next(err));
            }
        })
        .catch(err => next(err))
}