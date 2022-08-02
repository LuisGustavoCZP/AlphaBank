import { Request, Response } from "express";
import { SelectUserService } from "../../services";
import { ResponseWriter } from "../../utils";

class GetUser
{
    public async handle(req: Request, res: Response)
    {
        try 
        {
            const response = await SelectUserService.execute(req.cookies.token, false);
            if(response && response.data && response.data.user) delete response.data.user.id;
            new ResponseWriter().success(res, 201, response);
        }
        catch (e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new GetUser();