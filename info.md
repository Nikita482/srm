- ветки - main -> develop -> feature/...

в проекте должно быть: Ant Design, Storybook, Recharts, Framer Motion

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

// const x = [
// {
// id: 1,
// month: "Июль 2026",
// data: [
// {
// key: 1,
// date: "6, 7",
// salary: 5000,
// expenses: 0,
// collection: 800,
// paid: 2200,
// comment: "",
// accrued: 3000,
// remaining: 2000,
// },
// {
// key: 2,
// date: "15",
// salary: 2500,
// expenses: 150,
// collection: 0,
// paid: 0,
// comment: "",
// accrued: 0,
// remaining: 5000,
// },
// {
// key: 3,
// date: "22, 23",
// salary: 2500,
// expenses: 0,
// collection: 0,
// paid: 0,
// comment: "",
// accrued: 0,
// remaining: 5000,
// },
// {
// key: 4,
// date: "27, 28, 29, 30",
// salary: 10000,
// expenses: 0,
// collection: 0,
// paid: 0,
// comment: "",
// accrued: 0,
// remaining: 5000,
// },
// ],
// },
// {
// id: 2,
// month: "Июнь 2026",
// data: [
// {
// key: 1,
// date: "5",
// salary: 2500,
// expenses: 0,
// collection: 0,
// paid: 0,
// comment: "",
// accrued: 0,
// remaining: 2500,
// },
// {
// key: 2,
// date: "9, 11",
// salary: 5000,
// expenses: 150,
// collection: 3000,
// paid: 0,
// comment: "ччч",
// accrued: 2000,
// remaining: 3000,
// },
// {
// key: 3,
// date: "16, 17, 20",
// salary: 7500,
// expenses: 0,
// collection: 2000,
// paid: 1000,
// comment: "",
// accrued: 3000,
// remaining: 4500,
// },
// {
// key: 4,
// date: "25, 26, 27",
// salary: 7500,
// expenses: 0,
// collection: 0,
// paid: 5000,
// comment: "",
// accrued: 5000,
// remaining: 2500,
// },
// ],
// },
// {
// id: 3,
// month: "Август 2026",
// data: [
// {
// key: 1,
// date: "5",
// salary: 2500,
// expenses: 0,
// collection: 0,
// paid: 0,
// comment: "",
// accrued: 0,
// remaining: 2500,
// },
// {
// key: 2,
// date: "9, 11",
// salary: 5000,
// expenses: 150,
// collection: 3000,
// paid: 0,
// comment: "ччч",
// accrued: 2000,
// remaining: 3000,
// },
// {
// key: 3,
// date: "16, 17, 20",
// salary: 7500,
// expenses: 0,
// collection: 2000,
// paid: 1000,
// comment: "",
// accrued: 3000,
// remaining: 4500,
// },
// {
// key: 4,
// date: "25, 26, 27",
// salary: 7500,
// expenses: 0,
// collection: 0,
// paid: 5000,
// comment: "",
// accrued: 5000,
// remaining: 2500,
// },
// ],
// },
// ];
