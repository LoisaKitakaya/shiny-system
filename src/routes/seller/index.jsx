import RouteProtection from "../../components/auth/route_protection";
import MetaTitle from "../../components/meta/meta-title";

export default function Seller() {
  return (
    <>
      <MetaTitle title="Seller" />

      <RouteProtection>
        <div>Seller Page</div>
      </RouteProtection>
    </>
  );
}
