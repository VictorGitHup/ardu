export default function handler(req, res) {
    if (req.method === 'POST') {
      // Procesar los datos recibidos
      console.log(req.body); // Asegúrate de tener habilitado un middleware para parsear JSON
      res.status(200).json({ message: 'Datos recibidos' });
    } else {
      // Manejar otros métodos HTTP
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  