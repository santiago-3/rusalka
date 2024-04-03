import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="flex-between">
        <Link to="/"><div className="back"></div></Link>
        <div className="settings"></div>
        <Link to="/user-settings">
            <div className="user">
            </div>
        </Link>
      </nav>

      <div className="expand flex-center">
          <Outlet />
      </div>
    </>
  )
};

export default Layout;
