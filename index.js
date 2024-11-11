const express = require("express");
//const cookieparser=require('cookie-parser');//Whenever we use cookie in our project we should use cookie parser in order to parse it
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const path = require('path');
const URL = require("./models/url");
const staticRoute=require('./routes/staticRoutes');
const UserSignupandlogin=require('./routes/UserRoute');
const {CheckloggeduserId}=require('./middleware/Authorizationofuuid');
const {checkuuidhomepage}=require('./middleware/CheckAuth');
const cookieParser = require("cookie-parser");//Whenever we use cookie in our project we should use cookie parser in order to parse it
const app = express();
const PORT = 8071;

//connection with mongodb providing url and database name
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

//Setting up ejs
app.set("view engine", "ejs"); //It is telling about ejs support
app.set('views', path.join(__dirname, 'views'));// It is telling in which directory all ejs files are located
app.use(cookieParser())
//Json data also supports
app.use(express.json());
//xxx-url encoded as well as form data support
//Because in ejs we are sending form data and HTML forms are by default application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

app.use("/",staticRoute);
app.use('/users',UserSignupandlogin);
app.use("/url",checkuuidhomepage,CheckloggeduserId, urlRoute);//For this route we are using middleware to check if unique id present or not for the current user,if present then you can use short url else not

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
