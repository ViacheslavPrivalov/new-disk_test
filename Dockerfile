# Этап 1: Сборка приложения
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Этап 2: Запуск приложения
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/main" ]
