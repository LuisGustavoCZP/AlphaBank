/* import localdb from './internal'; */
import postgres from './postgres';
import config from "../config";

function database ()
{
    console.log("Servidor como", config.LOCALDB)
    /* if(config.LOCALDB)
    {
        return localdb;
    }
    else
    {
        
    } */
    return postgres;
}

const data = database();

export default data;
