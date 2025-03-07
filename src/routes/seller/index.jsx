import { useSearchParams } from "@solidjs/router";
import MetaTitle from "../../components/meta/meta-title";
import Container from "../../components/layout/app/container";
import BuyerLimitation from "../../components/auth/buyer_limitation";
import RouteProtection from "../../components/auth/route_protection";
import { Match, onMount, Switch } from "solid-js";

export default function Seller() {
  const [searchParams, setSearchParams] = useSearchParams();

  onMount(() => {
    if (!searchParams.tab) {
      setSearchParams({ tab: "dashboard" });
    }
  });

  const changeTab = (name) => {
    setSearchParams({ tab: name });
  };

  return (
    <>
      <MetaTitle title="Seller" />

      <RouteProtection>
        <BuyerLimitation>
          <Container show_navbar_2={false}>
            <div role="tablist" className="tabs tabs-box">
              <a
                role="tab"
                className={`tab ${
                  searchParams.tab === "dashboard" ? "tab-active" : ""
                }`}
                onClick={() => changeTab("dashboard")}
              >
                Dashboard
              </a>
              <a
                role="tab"
                className={`tab ${
                  searchParams.tab === "products" ? "tab-active" : ""
                }`}
                onClick={() => changeTab("products")}
              >
                Products
              </a>
              <a
                role="tab"
                className={`tab ${
                  searchParams.tab === "transactions" ? "tab-active" : ""
                }`}
                onClick={() => changeTab("transactions")}
              >
                Transaction
              </a>
            </div>

            <Switch>
              <Match when={searchParams.tab === "dashboard"}>
                <div className="my-6 mx-2">Dashboard - Charts come here</div>
              </Match>
              <Match when={searchParams.tab === "products"}>
                <div className="my-6 mx-2">
                  Products - User can add/edit/delete products here
                </div>
              </Match>
              <Match when={searchParams.tab === "transactions"}>
                <div className="my-6 mx-2">
                  Transactions - User can see their transaction history here
                </div>
              </Match>
            </Switch>
          </Container>
        </BuyerLimitation>
      </RouteProtection>
    </>
  );
}
