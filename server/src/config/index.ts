import * as dotenv from "dotenv";
dotenv.config();

const config = {
    PORT:process.env.PORT || 8000,
    POSTGRES:process.env.POSTGRES_CONNECTION_STRING,
    LOCALDB:process.env.LOCALDATABASE != undefined? process.env.LOCALDATABASE == "true" : false
}

export default config;