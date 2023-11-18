// pages/api/echo.js

let datosRecibidos = {}; // Almacena los datos del POST

export default function handler(req, res) {
    if (req.method === 'GET') {
      // Devuelve los datos almacenados de la última solicitud POST
      res.status(200).json(datosRecibidos);
    } else if (req.method === 'POST') {
      // Almacena los datos recibidos en la variable
      datosRecibidos = req.body;

      // Envía una confirmación de que los datos fueron recibidos
      res.status(200).json({ message: "Datos recibidos y almacenados" });
    } else {
      // Maneja cualquier solicitud que no sea GET o POST
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

  