const event = require('../../model/event')
const mongoose = require('mongoose')
let Regex = require("regex");
// Get all event from database
module.exports = function (router) {
    console.log('iam entering');
    router.get('/event', function (req, res) {
        // console.log("event id|:" +event)

        event.find({}).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding event',
                    error: err
                }))
    })

    // get specific event from database
    router.get('/event/:id', function (req, res) {
        console.log("iam in get session:" + req.params.id);
        const qry = req.params.id;

        console.log(req.params.id)
        event.findById({'_id': qry}).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding event',
                    error: err
                }))
    })

    // Create new book document...
    router.post('/event', function (req, res) {
        // let Event = new event(req.body)
        console.log('event body before insert:', req.body)
        let newLocation = {
            'address': req.body.location.address,
            'city': req.body.location.city,
            'country': req.body.location.country
        }
        console.log('new location', newLocation);
        let Event = new event();
        Event.category = req.body.category,
            Event.organizer = req.body.organizer,
            Event.title = req.body.title,
            Event.description = req.body.description,
            Event.price = req.body.price,
            Event.date = req.body.date,
            Event.location = newLocation,

            //     Event.location = {
            //    Event.location.address: req.body.location.address,
            //     Event.location.city: req.body.location.city,
            //     country: req.body.location.country,
            // },
            Event.onlineUrl = req.body.onlineUrl,
            console.log('body', req.body.sessions.length);
        let i = 1;
        for (let j = 0; j < req.body.sessions.length; j++) {
            let o = {
                "sessionId": 'SID' + i++,
                "name": req.body.sessions[j].name,
                "presenter": req.body.sessions[j].presenter,
                "duration": req.body.sessions[j].duration,
                "time": req.body.sessions[j].time,
                "show": req.body.sessions[j].show,
                "abstract": req.body.sessions[j].abstract
            };
            Event.sessions.push(o);
        }
        console.log('event body included:', Event);

        Event.save(function (err, Event) {
            if (err) return console.log(err)
            res.status(200).json(Event)
            // console.log('the adding record is :', res)

        })
    })


    router.put('/event', function (req, res) {
        console.log('update record ', req.body);
        let qry = {'_id': req.body._id}
        event.findById(qry, (err, Event) => {
            if (err) {
                console.log(`*** CustomersRepository.editCustomer error: ${err}`);
                return callback(err);
            }
            if (req.body.action === 'Add') {
                console.log('iam in update');
                Event.category = req.body.category || Event.category,
                    Event.organizer = req.body.organizer || Event.organizer,
                    Event.title = req.body.title || Event.title,
                    Event.description = req.body.description || Event.category,
                    Event.price = req.body.price || Event.category,
                    Event.date = req.body.date || Event.category,
                    Event.location = {
                        address: req.body.location.address || Event.location.address,
                        city: req.body.location.city || Event.location.city,
                        country: req.body.location.country || Event.location.country,
                    },
                    Event.onlineUrl = req.body.onlineUrl || Event.onlineUrl,
                    console.log('body', req.body.sessions.length);
                 const nextId = Math.max.apply(null, Event.sessions.map(s => (s.sessionId.match(/\d+/g))));
                 console.log('the sid maximum id from db' , nextId);
                let i = nextId + 1;

                var num = "'foofo21".match(/\d+/g);
                // num[0] will be 21
                var letr = "foofo21".match(/[a-zA-Z]+/g);
                /* letr[0] will be foofo */
                console.log('splited string', num, letr);
                for (let j = 0; j < req.body.sessions.length; j++) {
                    let o = {
                        "sessionId": 'SID' + i++,
                        "name": req.body.sessions[j].name,
                        "presenter": req.body.sessions[j].presenter,
                        "duration": req.body.sessions[j].duration,
                        "time": req.body.sessions[j].time,
                        "show": req.body.sessions[j].show,
                        "abstract": req.body.sessions[j].abstract
                    };
                    Event.sessions.push(o);
                }
                console.log('event body included:', Event);

                Event.save(function (err, Event) {
                    if (err) return console.log(err)
                    res.status(200).json(Event)
                })
            } else if (req.body.action === 'Delete') {
                console.log('iam in delete', req.body.sessions[0].name);

                let position = Event.sessions.findIndex(i => i.name === req.body.sessions[0].name);
                // let position = Event.sessions.i(req.body.sessions[0].name);
                console.log('the position of delete', position);
                if (position !== -1) {
                    Event.sessions.splice(position, 1);
                    Event.save(function (err, Event) {
                        if (err) return console.log(err)
                        res.status(200).json(Event)
                    })
                }
            }
        })
    }),

// delete event from database
        router.delete('/event/:id', function (req, res) {
            console.log('delete record ', req.params.id);
            let qry = {'_id': req.params.id}
            event.deleteOne({'_id': req.params.id}, function (err, respRaw) {
                if (err) return console.log(err)
                res.status(200).json(respRaw)
            })
        })
}
