import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";
import "./app.css";
import { Header } from "./components/header/Header";

const App = () => {
  return (
    <div className="root-block">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
