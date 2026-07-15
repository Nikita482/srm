import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// теперь я работаю в локальной ветке feature/start
// ее нет на гит хабе так что пушить ни чего ни надо
// после того как сдела 1 ЗАДАЧУ слить изменения в develop и удалить ветку feature/start
