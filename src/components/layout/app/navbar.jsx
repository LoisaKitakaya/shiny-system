import { useLocation, useNavigate } from "@solidjs/router";
import { logout, userInfo } from "../../../lib/store/auth_store";
import { Show } from "solid-js";

export default function Navbar(props) {
  const navigate = useNavigate();

  const location = useLocation();

  const logOut = () => {
    logout();

    navigate("/auth/sign-in");
  };
  return (
    <>
      <div className="navbar bg-base-100 w-full top-0 sticky z-50 shadow-2xs px-4">
        <div className="navbar-start">
          <a
            href="/"
            className="text-3xl text-green-400"
            style={{
              "font-family": "'Germania One', system-ui",
              "font-weight": 400,
              "font-style": "normal",
            }}
          >
            Uranium Glass
          </a>
        </div>
        <div className="navbar-center">
          <div className="join">
            <div>
              <label className="input w-80 validator join-item">
                <input type="text" placeholder="Search for products" required />
              </label>
              <div className="validator-hint hidden">Search for products</div>
            </div>
            <select defaultValue="Select Category" className="select join-item">
              <option disabled={true}>Select Category</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
            <button className="btn btn-neutral join-item">
              <i class="bi bi-search text-xl"></i>
            </button>
          </div>
        </div>
        <div className="navbar-end gap-4">
          <Show
            when={
              userInfo.is_artist === "Yes" &&
              location.pathname.startsWith("/seller")
            }
          >
            <label
              htmlFor="my-drawer"
              className="btn btn-circle btn-outline border-gray-100 hover:bg-gray-100"
            >
              <i class="bi bi-list text-2xl"></i>
            </label>
          </Show>
          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-outline border-gray-100 hover:bg-gray-100"
            >
              <i class="bi bi-person text-2xl"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
            >
              <li>
                <a>Account</a>
              </li>
              <Show when={!location.pathname.startsWith("/seller")}>
                <li>
                  <a href="/seller">Seller Console</a>
                </li>
              </Show>
              <div className="divider m-0 p-0"></div>
              <li>
                <button
                  className="btn btn-sm btn-error w-full"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
          <Show when={!location.pathname.startsWith("/seller")}>
            <div className="indicator">
              <span className="indicator-item text-xs badge badge-neutral badge-xs rounded-2xl">
                0
              </span>
              <button className="btn btn-circle btn-outline border-gray-100 hover:bg-gray-100">
                <i class="bi bi-heart text-2xl"></i>
              </button>
            </div>

            <div className="indicator">
              <span className="indicator-item text-xs badge badge-neutral badge-xs rounded-2xl">
                0
              </span>
              <button className="btn btn-circle btn-outline border-gray-100 hover:bg-gray-100">
                <i class="bi bi-bag text-2xl"></i>
              </button>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
}
