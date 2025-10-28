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

app.post('/komiks', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.put('/komiks/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }
        await komik.update(data);
        res.send(message: 'Komik updated successfully');
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});

