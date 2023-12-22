if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}



const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Shop = require("./models/canteen.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const  MONGO_URL = "mongodb://"

main()
 .then(()=>{
    console.log("connected to DB");
 })
 .catch((err)=>{
    console.log(err);
 });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//Read (GET): Get a list of all users
app.get("/", async(req,res)=>{
    //res.send("you contect to root");
    const allUsers = await User.find({});
    res.render("users/all.ejs", {allUsers});
});

//Index Route
app.get("/users", async (req,res)=>{
    const allCanteens = await Shop.find({});
    res.render("users/index.ejs", {allCanteens});
});

//Read
//Show Route
app.get("/users/:id", async (req,res)=>{
    let {id} = req.params;
    const user = await User.findById(id);
    res.render("users/show.ejs", {user});
});

// Login Route
app.patch("/users", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const newUser = user;
        const allCanteens = await Shop.find({});
        res.render("users/indexPersonal.ejs", { newUser, allCanteens });

    }catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});


//Canteen
app.get("/canteen", async (req, res) => {
    const selectedCanteen = req.query.canteen;
    const canteenArray = await Shop.find({center:selectedCanteen});
    canteen = canteenArray[0];
    res.render("canteens/canteen.ejs", {canteen});
});

// Canteen Checkout
app.get("/canteen/checkout", async(req,res)=>{
    res.render("canteens/checkout.ejs");
});


//Creat Route
app.post("/users", async (req,res)=>{
    const newUser = new User(req.body.user);
    await newUser.save();
    const allCanteens = await Shop.find({});
    res.render("users/indexPersonal.ejs", {newUser,allCanteens});
});



//Update Route
app.put("/users/:id", async (req,res)=>{
    let { id } = req.params;
    const userToUpdate = await User.findById(id);

    if ( userToUpdate.password!== req.body.user["password"]) {
        return res.status(401).send("Incorrect password");
    }

    await User.findByIdAndUpdate(id, {...req.body.user});
    res.redirect(`/users/${id}`);
})

//Delete Route
app.delete("/users/:id", async (req,res)=>{
    let { id } = req.params;
    let { password } = req.body;
    const userToDelete = await User.findById(id);
    if(password!== userToDelete.password){
        return res.status(401).send("From Delet Incorrect password");
    }
    let deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);
    res.redirect("/users");
});

// app.get("/testing",async (req,res)=>{
//     let sampleUser = new User({
//         name:"Abdul Qadir",
//         email:"abdul5278653@getMaxListeners.com",
//         center:"SCS",
//         enrollment_id:"22/10/jc/053",
//         contact_no:"7999547500",
//     });

//     await sampleUser.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});