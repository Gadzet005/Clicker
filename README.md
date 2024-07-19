# Keyboard Game
## Запуск приложения
### backend
- Перейдите в папку /backend
- Создайте .env файл (можно воспользоваться env.example)
- Пропишите ```make buildAndRun``` (Требуется make, если его нет, то ```docker compose build``` и ```docker compose up```
### frontend
- Перейдите в папку /frontend
- Создайте .env файл (можно воспользоваться env.example)
- Пропишите ```npm i``` и ```npm run start```
### mobile
- Перейти в /Mobile/ContentView
- Замените ```SERVER_ADDR``` и ```SERVER_PORT``` на ваши (если backend запускается на localhost, можно пропустить этот шаг)
- Откройте приложение в XCode
