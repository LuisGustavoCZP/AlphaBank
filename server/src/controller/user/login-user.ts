import { Request, Response } from "express";
import { LoginUserService } from "../../services";
import { ResponseWriter } from "../../utils";

class CreateUser
{
    public async handle(req: Request, res: Response)
    {
        try 
        {
            const response = await LoginUserService.execute(req.body);
            new ResponseWriter().success(res, 201, response);
        }
        catch (e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateUser();