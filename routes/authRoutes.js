const passport = require('passport');

module.exports = (app) => {
//route to kick-in auth-flow
app.get('/auth/google',
passport.authenticate('google', {
        scope : ['profile','email']
    }
));

//route to handle callback after user grants permission
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
   (req,res) => {
     res.redirect('/surveys');
   }
);

app.get('/api/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

//passport automatically attaches user property to the req object
app.get('/api/current_user',(req, res) => {
   res.send(req.user);
});

};