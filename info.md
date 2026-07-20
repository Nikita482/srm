- ветки - main -> develop -> feature/...

в проекте должно быть: Ant Design, Storybook, Recharts, Framer Motion

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

✅ Почистить db.js.
✅ Создать models/Month.js.
✅ Создать models/WorkRow.js.
✅ Сделать POST /months.
✅ Сделать GET /months.
