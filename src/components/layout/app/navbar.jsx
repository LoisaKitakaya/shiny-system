export default function Navbar(props) {
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
          <button className="btn btn-circle btn-outline border-gray-100 hover:bg-gray-100">
            <i class="bi bi-person text-2xl"></i>
          </button>
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
        </div>
      </div>
    </>
  );
}
