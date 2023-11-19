import serial
import time
import requests

# Iniciar comunicación serial con Arduino
arduino = serial.Serial(port='COM3', baudrate=9600, timeout=.1)

def read_rfid():
    data = arduino.readline()
    return data
#Lee una línea de datos del puerto serialy retorna estos datos.

def send_to_api(card_data):
    url = 'https://idyllic-sable-39bc3a.netlify.app/api/echo'  #URL API
    payload = {'id': card_data.decode('utf-8').strip()}
    response = requests.post(url, json=payload)
    return response.text
#Envía los datos de la tarjeta RFID a una API
#Decodifica los datos de la tarjeta, elimina espacios en blanco o caracteres de nueva
# línea al principio y al final, y los envía como JSON en una solicitud POST a la URL 
# especificada de la API.
#Retorna el texto de la respuesta de la API.


while True:
    card_data = read_rfid()
    if card_data:
        print(f"Enviando datos de la tarjeta: {card_data.strip()}")
        response = send_to_api(card_data)
        print(f"Respuesta de la API: {response}")
    time.sleep(1)

#En un bucle infinito, el programa constantemente lee los datos de RFID utilizando read_rfid.
#Si se reciben datos de la tarjeta (if card_data), imprime un mensaje indicando que está enviando estos datos, 
#llama a send_to_api para enviar los datos a la API, e imprime la respuesta de la API.
#Luego hace una pausa de 1 segundo antes de la siguiente lectura para evitar la sobrecarga de 
#solicitudes tanto al Arduino como a la API.