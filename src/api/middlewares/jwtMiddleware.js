const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if(token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            if(error) {
                console.log(error)
                res.status(403);
                res.json({message : 'Accès interdit : token invalide'});
            }
            else {
                // data = jwt.decode(token, jwtKey)
                // res.json(data.role);
                next();                
            }
        })
    }
    else {
        res.status(403);
        res.json({message : "Accès interdit : token manquant"})
    }
}

exports.verifyAdmin = (req, res, next) => {
    let token = req.headers['authorization'];
    tokenDecode = jwt.decode(token, jwtKey);

    if(token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            if(error) {
                console.log(error)
                res.status(403);
                res.json({message : 'Accès interdit : token invalide'});
            }
            else if (tokenDecode.role == "admin"){
                next();
            }
            else {
                res.json({message : "Vous n'etes pas admin !"});
            }
        })
    }
    else {
        res.status(403);
        res.json({message : "Accès interdit : token manquant"})
    }
}