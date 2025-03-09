import Cookies from "js-cookie";
import Container from "../components/layout/app/container";
import { backendAPI } from "../lib/utils/secrets";
import { getErrorMessage } from "../lib/utils/responses";
import MetaTitle from "../components/meta/meta-title";
import {
  createEffect,
  createResource,
  Match,
  Suspense,
  Switch,
} from "solid-js";
import Spinner from "../components/layout/spinner";
import { useSearchParams } from "@solidjs/router";

const fetchFilteredProducts = async ({ search, category, page }) => {
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

  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category !== "all") params.append("category", category);
  if (page) params.append("page", page);

  const url = `${backendAPI}/api/v1/store/products/filter?${params}`;

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

export default function Filter() {
  const [searchParams] = useSearchParams();

  const [products] = createResource(
    () => ({
      search: searchParams.search,
      category: searchParams.category || "all",
    }),
    fetchFilteredProducts
  );

  //   createEffect(() => {
  //     console.log(products())
  //   })

  return (
    <>
      <MetaTitle title="Filter" />

      <Container show_navbar_2={false}>
        <Suspense fallback={<Spinner />}>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a className="link text-primary" href="/">
                  Home
                </a>
              </li>
              <li>Filter Result</li>
            </ul>
          </div>

          <Switch>
            <Match when={products()}>We have products</Match>
            <Match when={!products()}>
              <Error />
            </Match>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
