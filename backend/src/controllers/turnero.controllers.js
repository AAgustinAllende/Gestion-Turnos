import { getConnection} from "../database/connection.js"
import sql from 'mssql'


export const getTurnos = async (req,res)=>{

    const pool = await getConnection()

    const result = await pool.request().query('SELECT * FROM Turnos')
    console.log(result)

    res.json(result.recordset)
}

export  const getTurnoById = async (req,res) => {


    const pool = await getConnection()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM Turnos WHERE id = @id')
    console.log(result)

    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: 'No se encontró el turno'})
    }
    return res.json(result.recordset[0] )
}

export const createTurno = async (req,res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await  pool.request()
    .input('name', sql.VarChar, req.body.name )
    .input('price', sql.Decimal, req.body.price )
    .input('hour', sql.VarChar, req.body.hour )
    .input('cancha', sql.VarChar, req.body.cancha )
    .query(
        'INSERT INTO Turnos (name, price, hour, cancha) VALUES (@name, @price, @hour, @cancha); SELECT SCOPE_IDENTITY() AS id'
    )

    console.log(result)
    res.json({
        id:result.recordset[0].id,
        name:req.body.name,
        price: req.body.price,
        hour:req.body.hour,
        cancha:req.body.cancha
    })
}

export const updateTurno = async (req, res) => {
    try {
        const { name, price, hour, cancha } = req.body;
        const { id } = req.params; 

        if (!name || !price || !hour || !cancha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('price', sql.Decimal, price)
            .input('hour', sql.VarChar, hour)
            .input('cancha', sql.VarChar, cancha)
            .query('UPDATE Turnos SET name = @name, price = @price, hour = @hour, cancha = @cancha WHERE id = @id');

        console.log(result);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        res.json({ message: 'Turno actualizado correctamente' });

    } catch (error) {
        console.error("Error en updateTurno:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


export const deleteTurno = async (req,res) => {

    const pool = await getConnection()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE  FROM Turnos WHERE id = @id')

    console.log(result)

    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: 'No se encontró el turno'})
    }
    return res.json('Turno eliminado')
}