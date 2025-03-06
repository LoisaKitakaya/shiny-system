import { Show } from "solid-js";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Container(props) {
  const show_navbar_2 = props.show_navbar_2 ? props.show_navbar_2 : false;

  return (
    <>
      <Navbar />

      <Show when={show_navbar_2}>
        <div className="navbar w-full bg-gray-100 px-4 shadow-2xs">
          <div className="navbar-center hidden lg:flex mx-auto">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a>Blogs</a>
              </li>
              <li>
                <a>FAQ's</a>
              </li>
              <li>
                <a>Become An Affiliate</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              {/* <li>
              <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0}>
                  Resources <i class="bi bi-chevron-down"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a>Blogs</a>
                  </li>
                  <li>
                    <a>FAQ's</a>
                  </li>
                  <li>
                    <a>Become An Affiliate</a>
                  </li>
                </ul>
              </div>
            </li> */}
            </ul>
          </div>
        </div>
      </Show>

      <div className="h-screen py-2 px-4">{props.children}</div>

      <Footer />
    </>
  );
}
