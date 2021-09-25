# ESP32-Bike Client
>This Project is very much a WIP. Updates to come...


## Intro
A much more advanced activity monitor for the Desk Cycle exercise bike powered by the ESP32 MCU

This application listens out for pedal events sent via serial out by the [ESP32-bike-core](https://github.com/Zbyron/ESP32-bike-core) ESP32 firmware

Biking information can be tracked in real time and sessions saved to a local database

## Requirements
Node.js
ESP32 Bike-Core software
Desk Cycle
## Setup
Install Dependencies -> `npm install`

Create a sqlite database named `db.sqlite3` in the ./public directory
>A sample schema .sql file can be found in ./sqlite_sample 

## Development
Start the app in dev mode -> `npm run dev`  
Seperate server process for serial out debugging -> `npm run serial.server`





