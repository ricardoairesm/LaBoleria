import { db } from "../database/db.js";
import urlSchema from "../schemas/urlSchema.js";


export async function createCake(req, res) {
    
    const { name, price, description, image } = req.body;
    const validData = (schema, data) => !schema.validate(data).error;

    try {
        const existingCake = await db.query(`
        SELECT * FROM cakes WHERE name = $1
        `, [name]);

        if (existingCake.rowCount > 0) return res.sendStatus(409);

        if (!validData(urlSchema, {image})) {
            return res.sendStatus(422);
        }

        await db.query(`
        INSERT INTO cakes (name, price, description, image)
        VALUES ($1, $2, $3, $4)
      `, [name, price, description, image]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}