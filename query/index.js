const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4002;

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    };

    if (type === 'CommentCreate') {
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    };

    console.log(posts);

    res.send({});
});

app.listen(PORT, () => {
    console.log(`Query app is running on http://localhost:${PORT}`);
});