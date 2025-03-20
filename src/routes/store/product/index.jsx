import Cookies from "js-cookie";
import {
  createEffect,
  createResource,
  Match,
  onMount,
  Suspense,
  Switch,
} from "solid-js";
import { backendAPI } from "../../../lib/utils/secrets";
import MetaTitle from "../../../components/meta/meta-title";
import { getErrorMessage } from "../../../lib/utils/responses";
import Container from "../../../components/layout/app/container";
import RouteProtection from "../../../components/auth/route_protection";
import { useParams, useSearchParams } from "@solidjs/router";
import Spinner from "../../../components/layout/spinner";
import Error from "../../../components/layout/error";
import ProductCard from "../../../components/products/product_card";

const fetchProduct = async (product_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backendAPI}/api/v1/store/products/${product_id}`;

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

const fetchProductReviews = async (product_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backendAPI}/api/v1/store/reviews/${product_id}`;

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

const fetchUserProductReviews = async (product_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backendAPI}/api/v1/store/reviews/${product_id}/buyer`;

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

export default function Product() {
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [product] = createResource(params.product_id, fetchProduct);

  const [productReview, { refetch: refetchProductReviews }] = createResource(
    params.product_id,
    fetchProductReviews
  );

  const [userProductReview, { refetch: refetchUserProductReview }] =
    createResource(params.product_id, fetchUserProductReviews);

  onMount(() => {
    if (!searchParams.tab) {
      setSearchParams({ tab: "description" });
    }
  });

  const changeTab = (name) => {
    setSearchParams({ tab: name });
  };

  createEffect(() => {
    console.log(productReview());
    console.log(userProductReview());
  });

  return (
    <>
      <MetaTitle title="Product" />

      <Container show_navbar_2={false}>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a className="link text-primary" href="/">
                Home
              </a>
            </li>
            <li>{params.product_id}</li>
          </ul>
        </div>

        <Suspense fallback={<Spinner />}>
          <Switch>
            <Match when={product()}>
              <div className="my-4">
                <div className="card bg-base-100 image-full w-full">
                  <figure>
                    <img
                      src={product().image || "/placeholder-product.jpg"}
                      alt={product().name}
                      class="h-full object-cover w-full mx-auto"
                    />
                  </figure>
                  <div class="card-body">
                    <div className="flex flex-col justify-between h-full mt-4 lg:mt-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 class="card-title">{product().name}</h2>

                          {product().stock > 0 ? (
                            <span className="badge badge-xs badge-success">
                              In Stock
                            </span>
                          ) : (
                            <span className="badge badge-xs badge-error">
                              Out of Stock
                            </span>
                          )}
                        </div>
                        <p>
                          <strong>Store:</strong>{" "}
                          <a
                            href={`/store/${product().artist.slug}`}
                            className="link link-hover text-primary"
                          >
                            {product().artist.store_name}
                          </a>
                        </p>
                        <p>
                          <strong>Artist:</strong>{" "}
                          {product().artist.user.username}
                        </p>
                        <p>
                          <strong>Category:</strong> {product().category.name}
                        </p>
                        <p>
                          <a
                            href={product().image}
                            target="blank"
                            className="link link-hover link-primary font-semibold"
                          >
                            View Full Image
                          </a>
                        </p>
                      </div>
                      <div class="card-actions justify-start items-center">
                        <ProductCard item={product()} />
                      </div>
                    </div>
                  </div>
                </div>

                <div role="tablist" className="tabs tabs-sm tabs-boxed mt-4">
                  <a
                    role="tab"
                    className={`tab ${
                      searchParams.tab === "description" ? "tab-active" : ""
                    }`}
                    onClick={() => changeTab("description")}
                  >
                    Description
                  </a>
                  <a
                    role="tab"
                    className={`tab ${
                      searchParams.tab === "product-reviews" ? "tab-active" : ""
                    }`}
                    onClick={() => changeTab("product-reviews")}
                  >
                    Product Reviews
                  </a>
                  <a
                    role="tab"
                    className={`tab ${
                      searchParams.tab === "user-reviews" ? "tab-active" : ""
                    }`}
                    onClick={() => changeTab("user-reviews")}
                  >
                    User Reviews
                  </a>
                </div>

                <Switch>
                  <Match when={searchParams.tab == "description"}>
                    <div className="p-2 ql-snow">
                      <div
                        className="ql-editor"
                        innerHTML={product().description}
                      />
                    </div>
                  </Match>
                  <Match when={searchParams.tab == "product-reviews"}>
                    <div className="p-2">
                      <Switch>
                        <Match
                          when={productReview() && productReview().length > 0}
                        >
                          Product Reviews
                        </Match>
                        <Match
                          when={productReview() && productReview().length === 0}
                        >
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-2xl font-semibold text-center mt-4">
                              No reviews for this product
                            </span>
                          </div>
                        </Match>
                      </Switch>
                    </div>
                  </Match>
                  <Match when={searchParams.tab == "user-reviews"}>
                    <div className="p-2">
                      <Switch>
                        <Match
                          when={
                            userProductReview() &&
                            userProductReview().length > 0
                          }
                        >
                          Product Reviews
                        </Match>
                        <Match
                          when={
                            userProductReview() &&
                            userProductReview().length === 0
                          }
                        >
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-2xl font-semibold text-center mt-4">
                              You have now reviews for this product
                            </span>
                            <button className="btn btn-sm">
                              Create Review
                            </button>
                          </div>
                        </Match>
                      </Switch>
                    </div>
                  </Match>
                </Switch>
              </div>
            </Match>
            <Match when={!product()}>
              <Error />
            </Match>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
