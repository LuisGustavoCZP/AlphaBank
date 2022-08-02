import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateTransferenceService } from "../../services";

class CreateTransference
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {origin, destAcc, quanty, password} = req.body;
            const response = await CreateTransferenceService.execute(origin, password, destAcc, quanty);
            new ResponseWriter().success(res, 202, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateTransference();