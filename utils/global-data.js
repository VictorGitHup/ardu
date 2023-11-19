export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Angelica Giraldo - Victor Botina';

  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Lector RFID RC522 control de acceso RFID con Arduino';

  // Agregar una descripción
  const blogDescription = process.env.BLOG_DESCRIPTION
    ? decodeURI(process.env.BLOG_DESCRIPTION)
    : 'Este proyecto combina la lectura de datos mediante el lector RFID RC522 de Arduino con un código en Python que, utilizando la biblioteca requests, envía información a una API expuesta, también conocida como endpoint. Esta API se encarga de recibir y validar la información, determinando dos posibles estados: "Acceso permitido" y "Acceso denegado". Posteriormente, los datos validados son solicitados a través de un método GET desde el archivo index, para su visualización.';
  
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    blogDescription, // Asegúrate de incluirlo aquí para retornarlo
    footerText,
  };
};

