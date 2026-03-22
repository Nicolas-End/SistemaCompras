#include <PWMServo.h>
#define CUSTOM_SETTINGS
#define INCLUDE_GAMEPAD_MODULE
#include <Dabble.h> // Biblioteca para o servo
PWMServo arma;

const int pinoEnableDireito = 12; 
const int pinoEneableEsquerdo = 13;
const int rodaEsq_A = 6;  
const int rodaEsq_B = 7; 
const int rodaDir_A = 4;  
const int rodaDir_B = 5;


void setup() {
  Serial.begin(115200);    
  Dabble.begin(9600);   
  pinMode(pinoEnableDireito, OUTPUT);
  pinMode(pinoEneableEsquerdo, OUTPUT);
  pinMode(rodaEsq_A, OUTPUT); 
  pinMode(rodaEsq_B, OUTPUT);
  pinMode(rodaDir_A, OUTPUT); 
  pinMode(rodaDir_B, OUTPUT);
  

}


void loop() {
  Dabble.processInput();
  if (GamePad.isUpPressed())
    {
      frente();   
    }


}


void frente() {

  digitalWrite(pinoEnableDireito, HIGH);
  digitalWrite(pinoEneableEsquerdo, HIGH);


  // Esquerda Anda para frente
  digitalWrite(rodaEsq_A, HIGH); 
  digitalWrite(rodaEsq_B, LOW);

  // Direito Anda para frente
  digitalWrite(rodaDir_A, HIGH) ; 
  digitalWrite(rodaDir_B, LOW);
}


void re(){
  digitalWrite(pinoEnableDireito, HIGH);
  digitalWrite(pinoEneableEsquerdo, HIGH);


  // Esquerda Anda para frente
  digitalWrite(rodaEsq_A, LOW); 
  digitalWrite(rodaEsq_B, HIGH);

  // Direito Anda para frente
  digitalWrite(rodaDir_A, LOW) ; 
  digitalWrite(rodaDir_B, HIGH);
}


void direita(){
  digitalWrite(pinoEnableDireito, LOW);
  digitalWrite(pinoEneableEsquerdo, HIGH);


  // Esquerda Anda para frente
  digitalWrite(rodaEsq_A, HIGH); 
  digitalWrite(rodaEsq_B, LOW);

  // Direito Anda para frente
  digitalWrite(rodaDir_A, LOW); 
  digitalWrite(rodaDir_B, LOW);

}


void esquerda() { 
  digitalWrite(pinoEnableDireito, HIGH);
  digitalWrite(pinoEneableEsquerdo, LOW);


  // Esquerda Anda para frente
  digitalWrite(rodaEsq_A,LOW); 
  digitalWrite(rodaEsq_B, LOW);

  // Direito Anda para frente
  digitalWrite(rodaDir_A, HIGH); 
  digitalWrite(rodaDir_B, LOW);


}

