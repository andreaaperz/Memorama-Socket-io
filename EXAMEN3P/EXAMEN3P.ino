  #include <NewPing.h>
 
#define TRIGGER_PIN 11
#define ECHO_PIN 12
#define MAX_DISTANCE 30

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); 

long acumulado = 0, cm_temporales = 0, cm = 0, pwmLed = 0;
unsigned char muestra = 0;
unsigned char muestras = 50;

unsigned char filas[] = {53, 51, 49, 47};       //L1, L2, L3, L4
unsigned char columnas[] = {45, 43, 41, 39};    //C1, C2, C3, C4

unsigned char tecla = 1;
bool b_serial = false;
bool b_presionado = false;
unsigned char teclaTemporal = 0;

unsigned char LEDRojo = 10;
unsigned char LEDAmarillo = 9;
unsigned char LEDVerde = 8;

void salidas(unsigned char valor){
  unsigned char cociente = valor;
  unsigned char residuo = 0;

  for(unsigned char i = sizeof(filas); i > 0; i--)
  {
    residuo = cociente % 2;
    cociente = (cociente - residuo) / 2;
    if(residuo == 1)
      digitalWrite(filas[i-1], HIGH);
    else
      digitalWrite(filas[i-1], LOW);
  }
  
}

unsigned char entradas(){
  unsigned char valor = 0;
  if(digitalRead(columnas[3]))
    valor += 1;
  if(digitalRead(columnas[2]))
    valor += 2;
  if(digitalRead(columnas[1]))
    valor += 4;
  if(digitalRead(columnas[0]))
    valor += 8;

  return valor;
}

unsigned char teclado (void)
{
    unsigned char car;
    salidas(0b1110);    //15 , 0x0F , 0b1111
    car = entradas();
    switch(car)
    {
        case 0b1110:
            return 'D';
        break;
        case 0b1101:
            return '#';
        break;
        case 0b1011:
            return '0';
        break;
        case 0b0111:
            return '*';
        break;     
    }
    salidas(0b1101);
    car = entradas();
    switch(car)
    {
        case 0b1110:
            return 'B';
        break;
        case 0b1101:
            return 'A';
        break;
        case 0b1011:
            return '9';
        break;
        case 0b0111:
            return '8';
        break;     
    }
    salidas(0b1011);
    car = entradas();
    switch(car)
    {
        case 0b1110:
            return '7';
        break;
        case 0b1101:
            return '6';
        break;
        case 0b1011:
            return '5';
        break;
        case 0b0111:
            return '4';
        break;     
    }
    salidas(0b0111);
    car = entradas();
    switch(car)
    {
        case 0b1110:
            return '3';
        break;
        case 0b1101:
            return '2';
        break;
        case 0b1011:
            return '1';
        break;
        case 0b0111:
            return '0';
        break;     
    }
    return 1;
}



void setup() {
  Serial.begin(9600);
  
  for(unsigned char i=0; i<sizeof(columnas); i++)
    pinMode(columnas[i], INPUT_PULLUP);

  for(unsigned char i=0; i<sizeof(filas); i++)
    pinMode(filas[i], OUTPUT);

    analogWrite(LEDRojo, LOW);
    analogWrite(LEDAmarillo, LOW);
    analogWrite(LEDVerde, LOW);


}


String cadenaSerial = "";

void loop() {
  
//-----------------------------------------------------------------------LEDS
  if(Serial.available() > 0)
  {
    cadenaSerial = Serial.readStringUntil('\n'); //RXXX /BXXX /GBXXX¿
      if (cadenaSerial == "HIGHRojo"){
        analogWrite(LEDRojo, 255);
        analogWrite(LEDAmarillo, LOW);
        analogWrite(LEDVerde, LOW);
      } else if (cadenaSerial == "HIGHAmarillo"){
        analogWrite(LEDRojo, LOW);
        analogWrite(LEDAmarillo, 255);
        analogWrite(LEDVerde, LOW);
      }
      else if (cadenaSerial == "HIGHVerde"){
        analogWrite(LEDRojo, LOW );
        analogWrite(LEDAmarillo, LOW);
        analogWrite(LEDVerde, 255);
        delay(1000);
      }
      else if (cadenaSerial == "DOWNALL"){
        analogWrite(LEDRojo, LOW);
        analogWrite(LEDAmarillo, LOW);
        analogWrite(LEDVerde, LOW);
      }
  }
//------------------------------------------------------------------------TECLADO
  tecla = teclado();
  if(tecla != 1)
  {
    b_presionado = true;
    teclaTemporal = tecla;
  }
  else
  { 
    if(b_presionado)
    {
      b_presionado = false;
      b_serial = true;
      tecla = teclaTemporal;
    }
  }

  if(b_serial){
    b_serial = false;
    if (tecla >= '0' && tecla <= '9'){
      Serial.println(tecla - 48);
    } 
    if (tecla == 'A' || tecla == 'B'){
      Serial.println(tecla);
    }
  }
//---------------------------------------------------------------------ULTRASONICO
    if(muestra < muestras){
      acumulado += sonar.ping_cm();  
      muestra ++;
    } 
    else 
    {
      cm_temporales = acumulado/muestras;
      acumulado = 0;
      muestra = 0;
      if (cm_temporales > 20)
      cm_temporales = 20;
      else if(cm_temporales < 2)
      cm_temporales = 2;
    }
    
  if(cm_temporales != cm)
  {
    cm = cm_temporales;
    pwmLed = ((18-(cm-2)) * 255) /18;
    if(pwmLed > 12){
      Serial.print(pwmLed);
      Serial.write(10);
    }
  } 
}
