const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public')); 

app.use('/api', userRoutes);

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/views/User.html'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
