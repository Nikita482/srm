- ветки - main -> develop -> feature/...

в проекте должно быть: Ant Design, Storybook, Recharts, Framer Motion

// Показать перед удалением краткую статистику — например, «4 недели, 12 записей».
// название месяцев не должны повторяться
// адаптировать все провайдеры под мобилку (недели, месяцы, мб селект, редактирование дней недели, коменты)
// подумать надо ли менять теги дней недели а то в 3 строки как то не так
// доработать дизайн
// убрать из кастомных хуков все лишнюю логику и перенести часть в редакс

- вопросы когда буду переписывать страницу
  1. че делать с зп? тупо оставить фикс такое себе
  2. че делать с коментами? авто или в ручню вписывать? как редактировать?

архитектура фронта:
src/
├── app/
│ ├── router/
│ │ ├── router.tsx
│ │ └── routes.ts
│ │
│ ├── providers/
│ │ └── RouterProvider.tsx
│ │
│ ├── App.tsx
│
├── pages/
│ ├── Home/
│ │ └── index.tsx
│ │
│ ├── Clients/
│ │ └── index.tsx
│ │
│ ├── Employees/
│ │ └── index.tsx
│ │
│ ├── Schedule/
│ │ └── index.tsx
│ │
│ ├── Finance/
│ │ └── index.tsx
│ │
│ ├── Analytics/
│ │ └── index.tsx
│ │
│ └── Settings/
│ └── index.tsx
│
├── widgets/
│ ├── Sidebar/
│ ├── Header/
│ └── Layout/
│
├── features/
│
├── entities/
│
├── shared/
│ ├── ui/
│ ├── hooks/
│ ├── utils/
│ ├── types/
│ └── assets/
│── main.tsx
└── index.css

архитектура бэка:
📌 server/
_ node_modules/
_ package.json
_ package-lock.json
_ index.js — только старт сервера, middleware, подключение routes
_ config/db.js — только подключение к БД (connect и лог успеха / ошибки)
_ models/User.js — только модели + схема + экспорт модели (одна модель — один файл)
_ routes/user.routes.js — нужен только для принятия HTTP-запросов по URL + прокидывает в controller
_ controllers/user.controller.js — нужен только для обработки HTTP-запросов (выносим логику в services/)
_ services/user.service.js — только бизнес-логика для controllers/
_ scripts/createUser.js — это только инструменты разработчика, не функции приложения

axios.get(url) — получить данные.
axios.post(url, data) — создать запись.
axios.put(url, data) — полностью обновить запись.
axios.patch(url, data) — частично обновить запись.
axios.delete(url) — удалить запись.
