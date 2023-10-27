const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3003;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! Pokemon API');
});

app.use('/api/auth', require('./src/routes/auth.routes'));

app.use('/api/gestion', require('./src/routes/gestion.routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
