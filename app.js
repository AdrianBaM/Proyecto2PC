const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
