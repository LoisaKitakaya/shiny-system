/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

import App from "./App";
import Home from "./routes";
import Seller from "./routes/seller";
import { MetaProvider } from "@solidjs/meta";
import NotFound from "./routes/404";
import SingIn from "./routes/auth/sign-in";
import SignUp from "./routes/auth/sign-up";
import CreateAccount from "./routes/auth/create-account";
import TermsAndConditions from "./routes/terms-and-conditions";
import PrivacyPolicy from "./routes/privacy-policy";

render(
  () => (
    <MetaProvider>
      <Router root={App}>
        <Route path="/" component={Home} />

        <Route path="*404" component={NotFound} />

        <Route path="/terms-and-conditions" component={TermsAndConditions} />

        <Route path="/privacy-policy" component={PrivacyPolicy} />

        <Route path="/auth">
          <Route path="/sign-in" component={SingIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-account" component={CreateAccount} />
          {/* <Route
            path="/security/request-password-reset"
            component={RequestPasswordReset}
          /> */}
        </Route>

        <Route path="/seller">
          <Route path="/" component={Seller} />
        </Route>
      </Router>
    </MetaProvider>
  ),
  root
);
