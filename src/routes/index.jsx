import Cookies from "js-cookie";
import Container from "../components/layout/app/container";
import { backendAPI } from "../lib/utils/secrets";
import { getErrorMessage } from "../lib/utils/responses";
import MetaTitle from "../components/meta/meta-title";
import {
  createEffect,
  createResource,
  createSignal,
  Match,
  Suspense,
  Switch,
} from "solid-js";
import Spinner from "../components/layout/spinner";

const fetchAllProducts = async () => {
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

export default function Home() {
  const [products] = createResource(fetchAllProducts);

  return (
    <>
      <MetaTitle title="Home" />

      <Container show_navbar_2={true}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Match when={products()}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 w-full mx-auto">
                <For each={products()}>
                  {(item) => {
                    const [quantity, setQuantity] = createSignal(0);

                    const addQuantity = () => {
                      setQuantity(quantity() + 1);
                    };

                    const reduceQuantity = () => {
                      setQuantity(quantity() - 1);

                      if (quantity() <= 0) {
                        setQuantity(0);
                      }
                    };

                    return (
                      <div
                        key={item.id}
                        className="group block overflow-hidden rounded hover:rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                      >
                        <a href={`/product/${item.id}`}>
                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            }
                            alt={item.slug}
                            className="h-[300px] w-full object-cover transition duration-300 group-hover:scale-105 sm:h-[400px]"
                          />
                        </a>
                        <div className="relative bg-white p-3">
                          <div className="flex justify-between items-center">
                            <a
                              href={`/product/${item.id}`}
                              className="group-hover:underline group-hover:underline-offset-4"
                            >
                              {item.name}
                            </a>
                            {item.stock > 0 ? (
                              <div className="badge badge-xs badge-success">
                                In Stock
                              </div>
                            ) : (
                              <div className="badge badge-xs badge-error">
                                Out of Stock
                              </div>
                            )}
                          </div>
                          <p>
                            <span className="tracking-wider font-semibold">
                              ${item.price}
                            </span>
                          </p>
                        </div>

                        <div className="divider my-0 mx-2 p-0" />

                        <div className="flex gap-4 items-center p-3">
                          <div>
                            <label htmlFor="Quantity" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <div className="flex items-center gap-2">
                              <button
                                className="btn btn-sm"
                                onClick={reduceQuantity}
                                disabled={item.stock <= 0}
                              >
                                &minus;
                              </button>

                              <input
                                type="number"
                                id="Quantity"
                                value={quantity()}
                                className="input"
                              />

                              <button
                                className="btn btn-sm"
                                onClick={addQuantity}
                                disabled={item.stock <= 0}
                              >
                                &plus;
                              </button>
                            </div>
                          </div>

                          <button
                            className="btn btn-sm"
                            disabled={item.stock <= 0}
                          >
                            <i class="bi bi-heart"></i>
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Match>
            <Match when={!products()}>
              <Error />
            </Match>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
