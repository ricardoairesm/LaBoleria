import { db } from "../database/db.js";

export async function createClient(req, res) {

    const { name, address, phone } = req.body;

    try {

        await db.query(`
      INSERT INTO clients (name, address, phone)
      VALUES ($1, $2, $3)
    `, [name, address, phone]);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function listOrdersByClientId(req, res) {

    const { id } = req.params;

    try {
        const pedidos = await db.query(`
        SELECT JSON_BUILD_OBJECT('orderId', orders.id, 'quantity', orders.quantity,'createdAt',orders."createdAt",'totalPrice',orders."totalPrice",'cakeName',cakes.name)
        FROM orders
        JOIN cakes ON orders."cakeId" = cakes.id
        WHERE orders."clientId" = $1
    `, [id]);

        if (pedidos.rowCount < 1) return res.sendStatus(404)

        return res.send(pedidos.rows).status(200);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}