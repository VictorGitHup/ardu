// pages/api/echo.js

let datosRecibidos = {}; // Almacena los datos del POST

export default function handler(req, res) {
    // Define los IDs permitidos
    const idsPermitidos = ["46ff9e59", "69861723"];
    let mensajeAcceso = idsPermitidos.includes(req.body.id) ? "Acceso permitido" : "Acceso denegado";

    if (req.method === 'GET') {
        // Devuelve los datos almacenados de la última solicitud POST
        res.status(200).json(datosRecibidos);
    } else if (req.method === 'POST') {
        // Compara si los datos recibidos son diferentes de los últimos datos almacenados
        if (JSON.stringify(datosRecibidos) !== JSON.stringify(req.body)) {
            // Almacena los datos recibidos en la variable
            datosRecibidos = req.body;

            // Agrega el mensaje de acceso a los datos recibidos
            datosRecibidos.acceso = mensajeAcceso;

            // Imprime los datos recibidos para depuración
            console.log(datosRecibidos);
        }

        // Envía una confirmación de que los datos fueron recibidos
        res.status(200).json({ message: "Datos recibidos y almacenados", acceso: mensajeAcceso });
    } else {
        // Maneja cualquier solicitud que no sea GET o POST
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
