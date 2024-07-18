import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";
import "./app.css";
import { Header } from "./components/header/Header";
import { getUserData } from "./api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setAuthAction } from "./store/userReducers";

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  if (!isAuth) {
    const data = getUserData();
    if (data) {
      dispatch(setAuthAction(data));
    }
  }

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
