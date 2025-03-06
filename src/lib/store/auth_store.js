import Cookies from "js-cookie";
import { createStore } from "solid-js/store";

const [authState, setAuthState] = createStore({
  isAuthenticated: !!Cookies.get("session"),
});

const [userInfo, setUserInfo] = createStore({
  role: Cookies.get("role"),
});

const login = (token, is_artist) => {
  logout();

  Cookies.set("session", token, { expires: 3 });
  Cookies.set("is_artist", is_artist, { expires: 3 });

  setAuthState({ isAuthenticated: true });
};

const logout = () => {
  setAuthState({ isAuthenticated: false });

  Cookies.remove("csrftoken");
  Cookies.remove("session");
  Cookies.remove("is_artist");
  Cookies.remove("sessionid");
};

export { userInfo, authState, login, logout };
