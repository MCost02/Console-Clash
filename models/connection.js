const { v4: uuidv4 } = require('uuid');
const connections = [{
    id: '1',
    name: 'NBA 2K22 Tournament',
    topic: 'Sports',
    details: 'An 8 player 1v1 tournament. Come show off your e-hooper skills! Winner will receive a $50 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/18/2022',
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    host: 'HoopMaster27',
    image: '../images/2k.jpeg'
},
{
    id: '2',
    name: 'Madden NFL 22 Tournament',
    topic: 'Sports',
    details: 'An 8 player 1v1 tournament. Come show off your skills! Winner will receive a $50 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/18/2022',
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    host: 'Playmaker32',
    image: '../images/madden.jpeg'
},
{
    id: '3',
    name: 'FIFA 22 Tournament',
    topic: 'Sports',
    details: 'An 8 player 2v2 tournament. Come show off your soccer skills! Winners will receive a $25 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/19/2022',
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    host: 'Striker992',
    image: '../images/fifa.jpeg'
},
{
    id: '4',
    name: 'Forza Motorsport 7 Tournament',
    topic: 'Racing',
    details: 'An 8 player race. Come show off your driving skills! Winner will receive a $100 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/27/2022',
    startTime: '2:30 PM',
    endTime: '4:30 PM',
    host: 'FullThrottle02',
    image: '../images/forza.jpeg'
},
{
    id: '5',
    name: 'MarioKart 8 Tournament',
    topic: 'Racing',
    details: 'A 4 player, 4 race tournament. Come show off your skills! Winner will receive a $25 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/27/2022',
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    host: 'Drifter30',
    image: '../images/mariokart.jpeg'
},
{
    id: '6',
    name: 'Need For Speed Tournament',
    topic: 'Racing',
    details: 'An 8 player time trial competition. Each racer will get two tries. Fastest lap wins a $50 prize!',
    location: 'Area 49 (Atkins Library 2nd Floor)',
    date: '03/28/2022',
    startTime: '12:30 PM',
    endTime: '2:30 PM',
    host: 'Sprinter92',
    image: '../images/nfs.jpeg'
}
];

exports.find = () => connections;

exports.findById = (id) => {
    return connections.find(connection => connection.id === id);
}

exports.save = (connection) => {
    connection.id = uuidv4();
    connections.push(connection);
}

exports.updateById = (id, newConnection) => {
    let connection = exports.findById(id);
    if (connection) {
        connection.name = newConnection.name;
        connection.topic = newConnection.topic;
        connection.details = newConnection.details;
        connection.location = newConnection.location;
        connection.date = newConnection.date;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
        connection.host = newConnection.host;
        connection.image = newConnection.image;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = (id) => {
    let index = connections.findIndex(connection => connection.id === id);
    if (index != -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}