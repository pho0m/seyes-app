import { Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import Router from "./router";

export default function App() {
  return (
    <>
      <div id="sidebar">
        <h1>Skeyes (develop version)</h1>
        <div>
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
          <div>
            <Avatar
              size={100}
              src={<Image src="https://placekitten.com/300/300" />}
            />
          </div>
        </div>
        <nav>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/camera">Camera</Link>
              </li>
              <li>
                <Link to="/reports">Reports</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div id="detail">
        <Router />
      </div>
    </>
  );
}
