const express = require('express');
const { animals } = require('./data/animals');

const app = express();
const PORT = process.env.PORT || 3001;

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // Filters out animals that don't have the traits in the traits array; by going through each trait and filtering any animal that doesn't have that trait, we end up with an array containing only the animals that have both (since every other animal was filtered out)
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
              animal => animal.personalityTraits.indexOf(trait) !== -1  
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});