const express = require('express');
const knex = require('./db/db');
const cors = require('cors');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Started");
});

app.use(cors({
    origin: 'http://localhost:5173'  
}));

app.post('/vote', (req, res) => {
    const { name, voting_choice, casted_at } = req.body;

    if (typeof name !== 'string' || typeof voting_choice !== 'boolean' || isNaN(Date.parse(casted_at))) {
        return res.status(400).send('Invalid input data');
    }

    knex('vote').insert({
        name: name,
        voting_choice: voting_choice,
        casted_at: new Date(casted_at)
    }).then(() => {
        res.status(200).send('Vote successfully cast');
    }).catch((error) => {
        console.error('Error inserting vote:', error);
        res.status(500).send('Internal Server Error');
    });
});

app.get('/data', (req, res) => {
    knex.select().from('vote')
        .then((votes) => {
            const formattedData = votes?.map(vote => ({
                id: vote.id.toString(),
                name: vote.name,
                voting_choice: vote.voting_choice,
                casted_at: formatDate(vote.casted_at)
            }));

            res.send({ data: formattedData });
        })
        .catch((error) => {
            console.error('Error fetching data from vote table:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/counts', (req, res) => {
    const { voting_choice } = req.query;

    if (voting_choice !== 'true' && voting_choice !== 'false') {
        return res.status(400).send('Invalid voting_choice value. It should be true or false.');
    }

    const votingChoiceValue = voting_choice === 'true';

    knex('vote')
        .select(knex.raw('DATE(casted_at) as casted_at'))
        .count('id as count')
        .where('voting_choice', votingChoiceValue)
        .groupByRaw('DATE(casted_at)')
        .then((counts) => {
            const formattedCounts = counts?.map(count => ({
                count: count.count,
                casted_at: count.casted_at.toISOString().split('T')[0]
            }));
            res.send({ data: formattedCounts });
        })
        .catch((error) => {
            console.error('Error fetching vote counts:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/results', (req, res) => {
    knex('vote')
        .select('voting_choice')
        .count('id as count')
        .groupBy('voting_choice')
        .then((results) => {
            const formattedResults = results?.map(result => ({
                count: parseInt(result.count, 10),
                voting_choice: result.voting_choice
            }));
            
            res.send({ data: formattedResults });
        })
        .catch((error) => {
            console.error('Error fetching voting results:', error);
            res.status(500).send('Internal Server Error');
        });
});

function formatDate(date) {
    const d = new Date(date);
    const formattedDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    return formattedDate;
}

if (require.main === module) {
    app.listen(8080, () => {
        console.log("Server started at port 8080");
    });
} else {
    module.exports = app;
}
