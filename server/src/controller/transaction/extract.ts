import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateExtractService } from "../../services";

class CreateExtract
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {account} = req.body;
            //console.log("Passou por aqui!");
            console.log("Cookie foi", req.cookies.token);
            const response = await CreateExtractService.execute(account, req.cookies.token);
            new ResponseWriter().success(res, 200, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateExtract();