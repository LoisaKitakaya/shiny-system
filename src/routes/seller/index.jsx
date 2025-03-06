import BuyerLimitation from "../../components/auth/buyer_limitation";
import RouteProtection from "../../components/auth/route_protection";
import Container from "../../components/layout/app/container";
import MetaTitle from "../../components/meta/meta-title";

export default function Seller() {
  return (
    <>
      <MetaTitle title="Seller" />

      <RouteProtection>
        <BuyerLimitation>
          <Container show_navbar_2={false}>
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <div>Seller Page</div>
              </div>
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <a>Sidebar Item 1</a>
                  </li>
                  <li>
                    <a>Sidebar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </BuyerLimitation>
      </RouteProtection>
    </>
  );
}
