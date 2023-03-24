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

export async function listOrders(req, res) {

        const filter = req.query

        if (filter.date) {
            try {
                const orders = await db.query(`
            SELECT JSON_BUILD_OBJECT('id', clients.id, 'name', clients.name,'address',clients.address,'phone',clients.phone) AS client,
            JSON_BUILD_OBJECT('id', cakes.id, 'name', cakes.name,'price',cakes.price,'description',cakes.description,'image',cakes.image) AS cake,
            orders.quantity,orders."createdAt",orders."totalPrice"
            FROM orders 
            JOIN clients ON orders."clientId" = clients."id"
            JOIN cakes ON orders."cakeId" = cakes."id"
            WHERE DATE(orders."createdAt")=$1;
          `,[filter.date]);

                if (orders.rowCount < 1) return res.sendStatus(404)

                return res.send(orders.rows).status(200);
            } catch (error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }

        try {
            const orders = await db.query(`
        SELECT JSON_BUILD_OBJECT('id', clients.id, 'name', clients.name,'address',clients.address,'phone',clients.phone) AS client,
        JSON_BUILD_OBJECT('id', cakes.id, 'name', cakes.name,'price',cakes.price,'description',cakes.description,'image',cakes.image) AS cake,
        orders.quantity,orders."createdAt",orders."totalPrice"
        FROM orders 
        JOIN clients ON orders."clientId" = clients."id"
        JOIN cakes ON orders."cakeId" = cakes."id"
      `);

            if (orders.rowCount < 1) return res.sendStatus(404)

            return res.send(orders.rows).status(200);

        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }


export async function listOrdersById(req, res) {

    const { id } = req.params;

    try {
        const orders = await db.query(`
        SELECT JSON_BUILD_OBJECT('id', clients.id, 'name', clients.name,'address',clients.address,'phone',clients.phone) AS client,
        JSON_BUILD_OBJECT('id', cakes.id, 'name', cakes.name,'price',cakes.price,'description',cakes.description,'image',cakes.image) AS cake,
        orders.quantity,orders."createdAt",orders."totalPrice"
        FROM orders 
        JOIN clients ON orders."clientId" = clients."id"
        JOIN cakes ON orders."cakeId" = cakes."id"
        WHERE orders.id = $1;
      `, [id]);

        if (orders.rowCount < 1) return res.sendStatus(404)

        return res.send(orders.rows).status(200);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}