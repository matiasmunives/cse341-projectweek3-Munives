/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const gitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;


app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
})
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT','PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes/index.js'));

  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}/n` + `Exception origin: ${origin}`);
  });

passport.use(new gitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshTOken, profile, done){
  //User.findOrCreate({ githubID: profile.ID }, function (err, user){
    return done(null, profile);
    //})
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
  });



mongodb.initDb((err) => {
if(err){
  console.log(err);
}
else{
  app.listen(port, () => {
    console.log(`Web Server is listening at port ${port}`)});
}
});