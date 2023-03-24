import { db } from "../database/db.js";


export async function createOrder(req, res) {

    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const existingCakeId = await db.query(`
        SELECT * FROM cakes WHERE id = $1
        `, [cakeId]);

        if (existingCakeId.rowCount < 1) return res.sendStatus(404);
        
        const existingClientId = await db.query(`
        SELECT * FROM clients WHERE id = $1
        `, [clientId]);

        if (existingClientId.rowCount < 1) return res.sendStatus(404);

        await db.query(`
        INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")
        VALUES ($1, $2, $3, $4)
      `, [clientId, cakeId, quantity, totalPrice]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}