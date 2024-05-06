import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
          <div class="title">
              <span class="gray-1">-</span>
              <span class="gray-2">-</span>
              <span class="gray-3">-</span>
              Rusalka
              <span class="gray-3">-</span>
              <span class="gray-2">-</span>
              <span class="gray-1">-</span>
          </div>
      </header>
      <main>
          <div class="column-left">
              <ul>
                  <Link to="write-english-to-russian"><li>English to russian</li></Link>
                  <Link to="write-russian-to-english"><li>Russian to english</li></Link>
                  <Link to="select-english-to-russian"><li>Select russian to english</li></Link>
                  <Link to="select-russian-to-english"><li>Select english to russian</li></Link>
              </ul>
          </div>
          <Outlet />
      </main>
      <nav className="flex-between">
        <Link to="/"><div className="back"></div></Link>
        <div className="settings"></div>
        <Link to="/user-settings">
            <div className="user">
            </div>
        </Link>
      </nav>

    </>
  )
};

export default Layout;
