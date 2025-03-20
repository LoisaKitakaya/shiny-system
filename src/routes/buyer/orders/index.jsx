import Cookies from "js-cookie";
import { backendAPI } from "../../../lib/utils/secrets";
import { getErrorMessage } from "../../../lib/utils/responses";
import { createResource, For, Match, Suspense, Switch } from "solid-js";
import MetaTitle from "../../../components/meta/meta-title";
import Spinner from "../../../components/layout/spinner";
import ProductCard from "../../../components/products/product_card";
import RouteProtection from "../../../components/auth/route_protection";
import SellerLimitation from "../../../components/auth/seller_limitation";
import Container from "../../../components/layout/app/container";
import OrdersTable from "../../../components/buyer/orders_table";

const fetchUserOrders = async () => {
  const token = Cookies.get("session");

  if (!token) {
    throw new Error("Session token is missing. Please log in.");
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${backendAPI}/api/v1/orders/user-orders`;

  try {
    const response = await fetch(url, options);

    const res = await response.json();

    if (response.status >= 400) {
      const message = res?.detail
        ? res?.detail
        : getErrorMessage(response.status);

      return {
        status: response.status,
        message,
      };
    }

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

export default function Orders() {
  const [userOrders] = createResource(fetchUserOrders);

  return (
    <>
      <MetaTitle title="Orders" />

      <RouteProtection>
        <SellerLimitation>
          <Container show_navbar_2={false}>
            <Suspense fallback={<Spinner />}>
              <div className="breadcrumbs text-sm">
                <ul>
                  <li>
                    <a className="link text-primary" href="/">
                      Home
                    </a>
                  </li>
                  <li>Orders</li>
                </ul>
              </div>

              <div className="m-2">
                <Switch>
                  <Match when={userOrders() && userOrders().orders.length > 0}>
                    <OrdersTable data={userOrders().orders} />
                  </Match>
                  <Match
                    when={userOrders() && userOrders().orders.length === 0}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-2xl font-semibold text-center mt-40">
                        User Orders Not Found
                      </span>
                    </div>
                  </Match>
                </Switch>
              </div>
            </Suspense>
          </Container>
        </SellerLimitation>
      </RouteProtection>
    </>
  );
}
