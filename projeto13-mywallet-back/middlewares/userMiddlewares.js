import { ObjectId } from "mongodb";
import { db } from "./../dataBase.js";

export async function getUser(req, res, next) {
    
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("usuarios").findOne({_id: session.id});
        if (!user) return res.status(401).send("Não Autorizado");
    
        res.locals.user = user;
        next();

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}