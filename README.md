# Описание

Тестовое задание на позицию «backend-разработчик» от Вячеслава Привалова для компании Новый Диск. Сервис для хранения и получения оценок за занятия с использованием фреймворка [Nest](https://github.com/nestjs/nest).

## Запуск приложения

```bash
# install
$ npm ci

# watch mode
$ npm run start:dev

# production
$ npm run start
```
## Запуск через docker

```bash
$ docker-compose up
```

## Функционал

Реализованы 5 эндпоинтов в соответствии с заданием:

- `GET /user`
- `POST /user`
- `GET /lessons`
- `POST /lessons`
- `POST /lessons/{id}/evaluations`

Добавлена аутентификация с помощью jwt-токена. Для её реализации была создана допольнительная сущность Admin, а также эндпоинты для логина и регистрации.

Реализована простая валидация для DTO при помощи _class-validator_.

Документация API доступна по адресу: `http://localhost:8080/docs`