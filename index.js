const express = require('express');
const app = express();
const db = require('./src/models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server start`);
    })
})

.catch((err) => {
    console.error('Unable to connect to the database:', err);
});

