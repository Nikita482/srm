- ветки - main -> develop -> feature/...

в проекте должно быть: Ant Design, Storybook, Recharts, Framer Motion

- комит - при создании, редактировании и удалении месяца в панели окно закрывается и в поле для редактирования теперь всегда есть имя текущего месяца

components/
└── coffeeTable/
├── index.tsx
├── EditableDates.tsx
├── EditableNumber.tsx
│
└── EditableComment/
├── index.tsx
├── CommentList.tsx
├── AddComment.tsx
└── EditComment.tsx

1. деплой
2. закинуть на сервер

- когда я выложу сайт и он будет доступен по ссылке любой сможет менять таблицу? мб добавить аккаунты
- сделать CoffeeControls как index и разбить по файлам по архетектурке

- убрать из кастомных хуков все лишнюю логику и перенести часть в редакс
- разбить CoffeeControls на
  WeeksPopover.tsx - содержимое попапа "недели"
  MonthsPopover.tsx - содержимое попапа "месяцы"
  TotalsPopover.tsx - содержимое попапа "итоги"
