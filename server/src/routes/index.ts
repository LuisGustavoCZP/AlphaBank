import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ping from "./ping";
import account from "./account";
import user from "./user";
import transaction from './transaction';

const app: Express = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions : cors.CorsOptions = {
    origin:["http://localhost:8000", "http://localhost:5173", "http://127.0.0.1:8000", "http://127.0.0.1:5173", "http://192.168.0.113:8000"],
    credentials:true,
}
app.use(cors(corsOptions));

//app.use("/assets", express.static("../web/dist/assets"));
app.use("/", express.static("../web/dist"));

app.use("/ping", ping);
app.use("/user", user);
app.use("/account", account);
//app.use("/transaction")
app.use(transaction);

/* app.use("/login", express.static("../web/dist")); */
app.use("/:page", express.static("../web/dist/index.html"));

export default app;
