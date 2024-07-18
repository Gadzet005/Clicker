import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";
import "./app.css";
import { Header } from "./components/header/Header";
import { getUserData, getUserProfile } from "./api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setAuthAction, setProfileAction } from "./store/userReducers";

const App = () => {
  let isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  if (!isAuth) {
    const data = getUserData();
    if (data) {
      dispatch(setAuthAction(data));
    }
  }

  isAuth = useSelector((state) => state.user.isAuth);
  if (isAuth) {
    getUserProfile().then((data) => {
      dispatch(setProfileAction(data));
    });
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
