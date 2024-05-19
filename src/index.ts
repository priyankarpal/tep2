import "dotenv/config";
import express, { Application } from 'express';
import router from "./routes/user.routes";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on localhost:${process.env.PORT}`);
});