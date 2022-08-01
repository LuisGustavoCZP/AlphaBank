import { CookieOptions, Request, Response } from "express";
import { LoginUserService } from "../../services";
import { ResponseWriter } from "../../utils";

const cookieOptions : CookieOptions = 
{
    sameSite:'none',
    secure:true,
    httpOnly:true,
}

class LoginUser
{
    public async handle(req: Request, res: Response)
    {
        try 
        {
            const response = await LoginUserService.execute(req.body);
            if(response && response.data && response.data.user)
            {
                
                res.cookie("token", response.data.user.id, cookieOptions);
                delete response.data.user.id;
            }

            new ResponseWriter().success(res, 201, response);
        }
        catch (e)
        {
            console.log("Deu erro aqui ", e)
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new LoginUser();