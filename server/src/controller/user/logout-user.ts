import { CookieOptions, Request, Response } from "express";
import { LoginUserService } from "../../services";
import { ResponseWriter } from "../../utils";

const cookieOptions : any = 
{
    sameSite:'none',
    secure:true,
    httpOnly:true
}

class LogoutUser
{
    public async handle(req: Request, res: Response)
    {
        try 
        {
            //res.cookie("token", '', cookieOptions);
            res.clearCookie("token", cookieOptions);
            new ResponseWriter().success(res, 201, {data:true, messages:[]});
        }
        catch (e)
        {
            console.log("Deu erro aqui ", e)
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new LogoutUser();