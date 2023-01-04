// import { Avatar, Image } from "antd";
// import { Link } from "react-router-dom";
// import Router from "./router";

// export default function App() {
//   return (
//     <>
//       <div id="sidebar">
//         <h1>Skeyes (develop version)</h1>
//         <div>
//           <div id="search-spinner" aria-hidden hidden={true} />
//           <div className="sr-only" aria-live="polite"></div>
//           <div>
{
  /* <Avatar
  size={100}
  src={
    <Image src="https://media.discordapp.net/attachments/1010925967469989908/1059426065019306085/SK_Project_3.png" />
  }
/> */
}
//           </div>
//         </div>
//         <nav>
//           <div>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/camera">Camera</Link>
//               </li>
//               <li>
//                 <Link to="/reports">Reports</Link>
//               </li>
//               <li>
//                 <Link to="/settings">Settings</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//       <div id="detail">
//         <Router />
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import {
  AuditOutlined,
  PieChartOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Image, MenuProps } from "antd";
import { Menu } from "antd";
import Router from "./router";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Avatar
      size={100}
      src={
        <Image src="https://media.discordapp.net/attachments/1010925967469989908/1059426065019306085/SK_Project_3.png" />
      }
    />,
    "icon",
    null,
    [],
    "group"
  ),
  getItem(
    <Link to="/analytics">Analytics</Link>,
    "analytics",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/cameras">Cameras</Link>,
    "cameras",
    <VideoCameraOutlined />
  ),
  getItem(<Link to="/reports">Reports</Link>, "reports", <AuditOutlined />),
  getItem(
    <Link to="/settings">Settings</Link>,
    "settings",
    <SettingOutlined />
  ),
];

export default function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Menu mode="inline" style={{ width: 256 }} items={items} />
        <div id="detail">
          <Router />
        </div>
      </div>
    </>
  );
}
