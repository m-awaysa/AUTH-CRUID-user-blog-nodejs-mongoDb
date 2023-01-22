var jwt = require('jsonwebtoken');
const { userModel } = require("../DB/model/user.model");

const auth = ()=> {
    return async (req, res, next) => {
        try {
            //findByIdAndDelete(id)
            const { token } = req.headers;
            if (token.startsWith(process.env.BearerToken )) { //bearer token its start with known password between frontend and backend devs
                myToken = token.split('__')[1];

                const decoded = jwt.verify(myToken, process.env.TokenSignature);
                if (decoded) {
                    const user = await userModel.findById(decoded.id).select('_id');
                    req.user = user;
                    next();

                } else {
                    res.json({ message: 'invalid token' });
                }

            } else {
                res.json({ message: 'invalid bearer token' });
            }
        } catch (error) {
            res.json({ message: 'catch error', error });
        }
    }
}

module.exports = auth;