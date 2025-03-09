import Cookies from "js-cookie";
import { useSearchParams } from "@solidjs/router";
import { createResource, For, Match, onMount, Switch } from "solid-js";
import { backendAPI } from "../../lib/utils/secrets";
import MetaTitle from "../../components/meta/meta-title";
import { getErrorMessage } from "../../lib/utils/responses";
import Container from "../../components/layout/app/container";
import BuyerLimitation from "../../components/auth/buyer_limitation";
import RouteProtection from "../../components/auth/route_protection";
import { openModal } from "../../lib/store/modal_store";
import CreateProduct from "../../components/seller/create_product";

const fetchSellerProducts = async () => {
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

  const url = `${backendAPI}/api/v1/store/products`;

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

const fetchProductCategories = async () => {
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

  const url = `${backendAPI}/api/v1/store/categories`;

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

export default function Seller() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sellerProducts, { refetch }] = createResource(fetchSellerProducts);

  const [productCategories] = createResource(fetchProductCategories);

  onMount(() => {
    if (!searchParams.tab) {
      setSearchParams({ tab: "dashboard" });
    }
  });

  const changeTab = (name) => {
    setSearchParams({ tab: name });
  };

  const createProduct = () => {
    openModal(
      "Create New Product",
      <CreateProduct data={productCategories} refetch={refetch} />
    );
  };

  return (
    <>
      <MetaTitle title="Seller" />

      <RouteProtection>
        <BuyerLimitation>
          <Container show_navbar_2={false}>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <a className="link text-primary" href="/">Home</a>
                </li>
                <li>Seller Console</li>
              </ul>
            </div>

            <div role="tablist" className="tabs tabs-sm tabs-box flex gap-4 w-full justify-center">
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
                All Products
              </a>
              <a
                role="tab"
                className={`tab ${
                  searchParams.tab === "transactions" ? "tab-active" : ""
                }`}
                onClick={() => changeTab("transactions")}
              >
                Transactions
              </a>
            </div>

            <Switch>
              <Match when={searchParams.tab === "dashboard"}>
                <div className="m-2">Dashboard - Charts come here</div>
              </Match>
              <Match when={searchParams.tab === "products"}>
                <div className="m-2">
                  <Switch>
                    <Match
                      when={sellerProducts() && sellerProducts().length > 0}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          <strong>Product Count:</strong>{" "}
                          {sellerProducts().length}
                        </span>
                        <button className="btn btn-sm" onClick={createProduct}>
                          Add Product
                        </button>
                      </div>

                      <div className="divider p-0 m-0" />

                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 w-full mx-auto">
                        <For each={sellerProducts()}>
                          {(item) => (
                            <div key={item.id}>
                              <a
                                href={`/seller/product/${item.id}`}
                                className="group block overflow-hidden rounded hover:rounded shadow-sm hover:shadow"
                              >
                                <img
                                  src={
                                    item.image ||
                                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                  }
                                  alt={item.slug}
                                  className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[400px]"
                                />
                                <div className="relative bg-white p-3">
                                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                    {item.name}
                                  </h3>
                                  <p className="mt-2">
                                    <span className="sr-only">
                                      Regular Price
                                    </span>
                                    {/* <span className="tracking-wider text-gray-900">
                                      ${item.price}
                                    </span> */}
                                  </p>
                                </div>
                              </a>
                            </div>
                          )}
                        </For>
                      </div>
                    </Match>
                    <Match
                      when={sellerProducts() && sellerProducts().length === 0}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-2xl font-semibold text-center mt-40">
                          0 Products Units Found
                        </span>
                        <button className="btn btn-sm" onClick={createProduct}>
                          Add Product
                        </button>
                      </div>
                    </Match>
                  </Switch>
                </div>
              </Match>
              <Match when={searchParams.tab === "transactions"}>
                <div className="m-2">
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
