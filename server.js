import { createRandomId, createId } from './helpers/helper_functions.js';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Data
let envelopes = [];

app.get('/envelopes', (req, res) => {
    res.status(200).json(envelopes);
});

app.get('/envelopes/:id', (req, res) => {
    const id = req.params.id;
    let idFound = false;

    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].id.toString() === id) {
           idFound = true;
           res.status(200).json(envelopes[i]);
        }
    }

    if (!idFound) {
        res.status(404).json({ error: "Envelope not found!" });
    }
});

app.post('/envelopes', (req, res) => {
    let idExists = true;
    let title = req.body.title;
    let budget = req.body.budget;

    let id = createId();

    if (typeof title === 'string' && typeof budget === 'number') {
        let envelopeObject = {
            id: id,
            title: title,
            budget: budget
        }
        envelopes.push(envelopeObject);
        res.status(201).json(envelopes);
    }
    else {
        res.status(401).json({ error: 'Invalid title and\/or budget' });
    }


});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});