const express = require("express");
const path = require('path');
const { connectToMongoDB } = require('./connect');

const urlRoute = require('./routes/url');
const URL = require("./models/url");

// const express = require("express");
// const e = require("express");

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://shuru0404:shuru0404@cluster0.hxziqxt.mongodb.net/Blog?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connect'))

app.set("view engine","ejs" );
app.set("views",path.resolve("./views"));


app.use(express.json());

 

app.use("/url", urlRoute);

app.get("/url/:shortId", async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamps:Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
}
);


app.listen(PORT, () => console.log(`server started at PORT:${PORT }`))