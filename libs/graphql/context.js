import {validateJWTToken} from "../modules/assist.js";

export default async ({req}) => {
    await extractUser(req)
    return {
        user: req.user
    }
}

const extractUser = async (req) => {
    try {
        let {authorization} = req.headers;
        const token = authorization && authorization.split(' ')[1];
        if (token && authorization && authorization.startsWith('Bearer')) {
            const user = await validateJWTToken('access', token);
            if (user && user._id) {
                req.user = user;
            }
        }
        return false
    } catch (e) {
        return false
    }
}
