const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    attendee: { type: Schema.Types.ObjectId, ref: 'User' },
    connection: { type: Schema.Types.ObjectId, ref: 'Connection' },
    status: { type: String, required: [true, "An RSVP response is required."] }
});

module.exports = mongoose.model('RSVP', rsvpSchema);