import "../style/main.scss";
import { RouterComponent } from "./Router";
import { EventInterface } from "./eventInterface";

export function App() {
  return (
    <>
      <RouterComponent />
      <EventInterface />
    </>
  );
}
