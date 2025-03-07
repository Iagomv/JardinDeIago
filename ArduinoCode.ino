//Librerias y Define
#include <ArduinoJson.h>
#include <DHT.h>
#include <Servo.h>
#define DHTPIN
#define DHTTYPE DHT11

//Pines de conexion de los distintos elementos
int dhtPin = 0;
int pinSensorAgua;
int pinServo;
int pinSensorFC28;
int posicionServo = 0;
int retardo = 3; // Variable que representa el tiempo entre actualizaciones al servidor
char receivedData[100]; // Buffer para recibir datos JSON
Servo myservo; // Creacion del objeto Servo
DHT dht(dhtPin, DHTTYPE); // Inicializacion del objeto dht

//Configuracion inicial
void setup() {
Serial.begin(9600); // Comunicacion serie
myservo.attach(pinServo); // Aquí colocamos el PIN(Board) donde esta conectado el servo
myservo.write(90); // Servo inicialmente en pos 90
dht.begin(); // Comienzo de ejecucion del DHT
}

//Loop principal de funcionamiento donde se ejecuta el programa
void loop() {
// modificarPines(A11,30, A0, 52);
mensajeRecibido();
obtenerDatos();
delay(retardo\*1000);

}

// Recepcion de datos del Server
// /recibo los datos de los pines desde el servidor.
char \*s;
void mensajeRecibido() {
if (Serial.available() > 0) {
String datos = Serial.readStringUntil('\n');
datos.trim();
int pos;
String subcadena;

    // Extraer cada valor de la cadena separada por comas
    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    pinSensorAgua = subcadena.toInt();
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    pinServo = subcadena.toInt();
    myservo.attach(pinServo);
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    int pinSensor = 54 + subcadena.toInt();
    pinSensorFC28 = pinSensor;
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    dhtPin = subcadena.toInt();
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    posicionServo = subcadena.toInt();
    setPosicionServo(posicionServo);
    datos = datos.substring(pos + 1);
    // El último número ya no tiene coma
    retardo = datos.toInt();

    dht = DHT(dhtPin, DHTTYPE);
    dht.begin();  // Restart the DHT sensor    // Imprimir valores para verificar
    Serial.print("pinSensorAgua: "); Serial.print(pinSensorAgua);
    Serial.print("pinServo: "); Serial.print(pinServo);
    Serial.print("pinSensorFC28: ");Serial.print(pinSensorFC28);
    Serial.print("dhtPin: "); Serial.print(dhtPin);
    Serial.print("posicionServo: "); Serial.print(posicionServo);
    Serial.print("retardo: "); Serial.println(retardo);

}
}

void dataFromNode() {
if (Serial.available() > 0) { // Solo intenta leer si hay datos disponibles
String docEntrante = Serial.readStringUntil('\n'); // Leer JSON
Serial.println("Recibido: " + docEntrante); // Depuración: Ver qué llega

    StaticJsonDocument<200> doc; // Asegurar suficiente tamaño
    DeserializationError error = deserializeJson(doc, docEntrante);

    if (!error) {
      leerJson(doc);
    } else {
      Serial.print("Error al parsear JSON: ");
      Serial.println(error.c_str()); // Mostrar error
    }

}
}

void leerJson(JsonDocument doc){
pinSensorAgua = doc["pinAgua"];
pinServo = doc["pinServo"];
pinSensorFC28 = doc["pinFC28"];
dhtPin = doc["pinDht"];
posicionServo = doc["posServo"];
Serial.print(pinSensorAgua);
Serial.print(pinServo);
Serial.print(pinSensorFC28);
Serial.print(posicionServo);
Serial.println("finDatosJson");

}
void modificarDelay(int tiempo){
retardo = tiempo;
}
void modificarPines(int pinAgua, int pinServo, int pinFC28, int nuevodhtPin){
pinSensorAgua = pinAgua;
pinServo = pinServo;
pinSensorFC28 = pinFC28;
dhtPin = nuevodhtPin;
dht = DHT(dhtPin, DHTTYPE);
dht.begin(); // Restart the DHT sensor
}
void setPosicionServo(int posicionServo){
myservo.write(posicionServo);
}

// REGISTRO Y ENVÍO DE DATOS
void obtenerDatos(){
obtenerDatosDHT11();
loopSensorFC28();
obtenerDatosSensorAgua();
obtenerDatosServo();
}
void obtenerDatosDHT11(){

// Leemos la humedad relativa
float h = dht.readHumidity();
// Leemos la temperatura en grados centígrados (por defecto)
float t = dht.readTemperature();
// Leemos la temperatura en grados Fahrenheit
float f = dht.readTemperature(true);

// Calcular el índice de calor en Fahrenheit
float hif = dht.computeHeatIndex(f, h);
// Calcular el índice de calor en grados centígrados
float hic = dht.computeHeatIndex(t, h, false);
printData(t,h,f,hif,hic);
}
//Impresion de los datos del dht
void printData(float t,float h, float f,float hif,float hic){
Serial.print(h); //Humedad
Serial.print(",");
Serial.print(t); // Temperatura
Serial.print(",");
Serial.print(f); // temperatura farenheit
Serial.print(",");
Serial.print(hic); // Indice de calor
Serial.print(",");
Serial.print(hif); //Sensacion termica Farenheit
Serial.print(",");
}
// Funcion para el sensor FC28 que mide humedad de las plantas
void loopSensorFC28() {
int humedad = analogRead(pinSensorFC28);
Serial.print(humedad);
Serial.print(",");
}
void obtenerDatosSensorAgua(){
int valor = analogRead(pinSensorAgua);
Serial.print(valor);
Serial.print(",");

}
void obtenerDatosServo(){
Serial.print(posicionServo);
Serial.print(",");
Serial.print(retardo);
Serial.println();
}

//Librerias y Define
#include <ArduinoJson.h>
#include <DHT.h>
#include <Servo.h>
#define DHTPIN
#define DHTTYPE DHT11

//Pines de conexion de los distintos elementos
int dhtPin = 0;
int pinSensorAgua;
int pinServo;
int pinSensorFC28;
int posicionServo = 0;
int retardo = 3; // Variable que representa el tiempo entre actualizaciones al servidor
char receivedData[100]; // Buffer para recibir datos JSON
Servo myservo; // Creacion del objeto Servo
DHT dht(dhtPin, DHTTYPE); // Inicializacion del objeto dht

//Configuracion inicial
void setup() {
Serial.begin(9600); // Comunicacion serie
myservo.attach(pinServo); // Aquí colocamos el PIN(Board) donde esta conectado el servo
myservo.write(90); // Servo inicialmente en pos 90
dht.begin(); // Comienzo de ejecucion del DHT
}

//Loop principal de funcionamiento donde se ejecuta el programa
void loop() {
// modificarPines(A11,30, A0, 52);
mensajeRecibido();
obtenerDatos();
delay(retardo\*1000);

}

// Recepcion de datos del Server
// /recibo los datos de los pines desde el servidor.
char \*s;
void mensajeRecibido() {
if (Serial.available() > 0) {
String datos = Serial.readStringUntil('\n');
datos.trim();
int pos;
String subcadena;

    // Extraer cada valor de la cadena separada por comas
    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    pinSensorAgua = subcadena.toInt();
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    pinServo = subcadena.toInt();
    myservo.attach(pinServo);
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    int pinSensor = 54 + subcadena.toInt();
    pinSensorFC28 = pinSensor;
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    dhtPin = subcadena.toInt();
    datos = datos.substring(pos + 1);

    pos = datos.indexOf(',');
    if (pos == -1) return;
    subcadena = datos.substring(0, pos);
    posicionServo = subcadena.toInt();
    setPosicionServo(posicionServo);
    datos = datos.substring(pos + 1);
    // El último número ya no tiene coma
    retardo = datos.toInt();

    dht = DHT(dhtPin, DHTTYPE);
    dht.begin();  // Restart the DHT sensor    // Imprimir valores para verificar
    Serial.print("pinSensorAgua: "); Serial.print(pinSensorAgua);
    Serial.print("pinServo: "); Serial.print(pinServo);
    Serial.print("pinSensorFC28: ");Serial.print(pinSensorFC28);
    Serial.print("dhtPin: "); Serial.print(dhtPin);
    Serial.print("posicionServo: "); Serial.print(posicionServo);
    Serial.print("retardo: "); Serial.println(retardo);

}
}

void dataFromNode() {
if (Serial.available() > 0) { // Solo intenta leer si hay datos disponibles
String docEntrante = Serial.readStringUntil('\n'); // Leer JSON
Serial.println("Recibido: " + docEntrante); // Depuración: Ver qué llega

    StaticJsonDocument<200> doc; // Asegurar suficiente tamaño
    DeserializationError error = deserializeJson(doc, docEntrante);

    if (!error) {
      leerJson(doc);
    } else {
      Serial.print("Error al parsear JSON: ");
      Serial.println(error.c_str()); // Mostrar error
    }

}
}

void leerJson(JsonDocument doc){
pinSensorAgua = doc["pinAgua"];
pinServo = doc["pinServo"];
pinSensorFC28 = doc["pinFC28"];
dhtPin = doc["pinDht"];
posicionServo = doc["posServo"];
Serial.print(pinSensorAgua);
Serial.print(pinServo);
Serial.print(pinSensorFC28);
Serial.print(posicionServo);
Serial.println("finDatosJson");

}
void modificarDelay(int tiempo){
retardo = tiempo;
}
void modificarPines(int pinAgua, int pinServo, int pinFC28, int nuevodhtPin){
pinSensorAgua = pinAgua;
pinServo = pinServo;
pinSensorFC28 = pinFC28;
dhtPin = nuevodhtPin;
dht = DHT(dhtPin, DHTTYPE);
dht.begin(); // Restart the DHT sensor
}
void setPosicionServo(int posicionServo){
myservo.write(posicionServo);
}

// REGISTRO Y ENVÍO DE DATOS
void obtenerDatos(){
obtenerDatosDHT11();
loopSensorFC28();
obtenerDatosSensorAgua();
obtenerDatosServo();
}
void obtenerDatosDHT11(){

// Leemos la humedad relativa
float h = dht.readHumidity();
// Leemos la temperatura en grados centígrados (por defecto)
float t = dht.readTemperature();
// Leemos la temperatura en grados Fahrenheit
float f = dht.readTemperature(true);

// Calcular el índice de calor en Fahrenheit
float hif = dht.computeHeatIndex(f, h);
// Calcular el índice de calor en grados centígrados
float hic = dht.computeHeatIndex(t, h, false);
printData(t,h,f,hif,hic);
}
//Impresion de los datos del dht
void printData(float t,float h, float f,float hif,float hic){
Serial.print(h); //Humedad
Serial.print(",");
Serial.print(t); // Temperatura
Serial.print(",");
Serial.print(f); // temperatura farenheit
Serial.print(",");
Serial.print(hic); // Indice de calor
Serial.print(",");
Serial.print(hif); //Sensacion termica Farenheit
Serial.print(",");
}
// Funcion para el sensor FC28 que mide humedad de las plantas
void loopSensorFC28() {
int humedad = analogRead(pinSensorFC28);
Serial.print(humedad);
Serial.print(",");
}
void obtenerDatosSensorAgua(){
int valor = analogRead(pinSensorAgua);
Serial.print(valor);
Serial.print(",");

}
void obtenerDatosServo(){
Serial.print(posicionServo);
Serial.print(",");
Serial.print(retardo);
Serial.println();
}
