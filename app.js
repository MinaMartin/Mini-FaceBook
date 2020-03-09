const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoConnect = require("./utilities/database").mongoConnect;

const postRoutes = require("./routes/posts");
const authRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200);
  }
  console.log(req.body);
  next();
});



//app.sta

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'docs.html'))
})

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoConnect(() => {
  app.listen(8080);
})