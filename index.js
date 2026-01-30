import express from "express";
import router from "./routes/user.routes.js";
import Urlrouter from "./routes/url.routes.js";

import authenticationMiddleware from "./middleware/auth.middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);


app.use('/user', router);
app.use(Urlrouter);
app.get("/", (req,res) => {
    return res.send("");
})
app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
})