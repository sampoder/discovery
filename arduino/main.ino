
// Include Libraries
#include "Arduino.h"
#include "Button.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#define PUSHBUTTON_1_PIN_2	5
#define PUSHBUTTON_2_PIN_2	4

const char * ssid = "SINGTEL-2D30";
const char * password = "naevaiquii";
String serverName = "https://discovery-zeta.vercel.app/api/next";
WiFiClientSecure client;

Button pushButton_1(PUSHBUTTON_1_PIN_2);
Button pushButton_2(PUSHBUTTON_2_PIN_2);

void setup() {
    Serial.begin(9600);
    while (!Serial) ;
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
    client.setInsecure();
    client.connect(serverName, '3000');
    pushButton_1.init();
    pushButton_2.init();
}

void request() {
  if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        
        http.begin(client, (serverName).c_str());

        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        } else {
          Serial.print("Error code: ");
          Serial.println(http.getString());
          Serial.println(httpResponseCode);
        }
        http.end();
        delay(1000);
      }
}

void loop() {
    if(pushButton_1.read() == true || pushButton_2.read() == true) {
      request();
    }
}
