import { asyncHandler } from "../utils/asyncHandler";

export const registeredUser = asyncHandler(async(req,res)=>{
    const {username,fullname,email,password,confirmPassword} = req.body;
    
})