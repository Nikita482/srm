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
