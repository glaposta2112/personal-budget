import { createId } from './helpers/helper_functions.js';
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
    let title = req.body.title;
    let budget = req.body.budget;

    if (typeof title === 'string' && typeof budget === 'number') {
        let id = createId();
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

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    let transferAmount = req.body.transfer;
    let transferFrom = req.params.from;
    let transferTo = req.params.to;
    let titleFound = false;

    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].title === transferFrom) {
            for (let x = 0; x < envelopes.length; x++) {
                if (envelopes[x].title === transferTo) {
                    titleFound = true
                    let fromNewBudget = envelopes[i].budget - parseInt(transferAmount);
                    let toNewBudget = envelopes[x].budget + parseInt(transferAmount);

                    envelopes[i].budget = fromNewBudget;
                    envelopes[x].budget = toNewBudget;

                    res.status(201).json(envelopes);
                }

            }
        }
    }

    if (!titleFound) {
        res.status(401).json({ error: "'Transfer From or To' Envelope not found!" }); 
    }
});

app.put('/envelopes/update/:id', (req, res) => {
    const id = req.params.id;
    let idFound = false;

    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].id.toString() === id) {
           idFound = true;

           let title = req.body.title;
           let budget = req.body.budget
           if (typeof title === "string" && typeof budget === "number") {
                envelopes[i].title = title;
                envelopes[i].budget = budget;
                res.status(200).json(envelopes[i]);
            }
            else {
                res.status(401).json({ error: 'Invalid title and/or budget' });
            }
        }
    }

    if (!idFound) {
        res.status(404).json({ error: "Envelope not found!" });
    }    
});


app.delete('/envelopes/remove/:id', (req, res) => {
    const id = req.params.id;
    let idFound = false;

    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].id.toString() === id) {
           idFound = true;
           envelopes.splice(i, 1);
           res.status(200).json({ success: "Envelope has been deleted!" });
        }
    }

    if (!idFound) {
        res.status(404).json({ error: "Envelope not found!" });
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});