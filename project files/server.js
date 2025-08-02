const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');

app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
