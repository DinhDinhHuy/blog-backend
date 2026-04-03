const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./models/associations');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/post.routes'))
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/comments', require('./routes/comment.routes'));

module.exports = app;