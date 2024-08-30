"use client";

import React from "react";
import { Menu } from "antd";

interface MainMenuProps {
  className?: string;
}

// const HostButton = () => {
//   return (
//     <NavLink
//       style={{
//         borderRadius: '4px',
//         backgroundColor: '#deff51',
//         padding: '8px 10px 8px 10px',
//         marginRight: '130px',
//         width: 'max-content',
//       }}
//       to={'/property-registration'}
//     >
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//         }}
//       >
//         <img
//           style={{ width: '30px', height: '30px', opacity: 1 }}
//           src="/images/house.svg"
//           alt="House Icon"
//         />
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <span
//             style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               color: '#4dcad2',
//             }}
//           >
//             List your Home
//           </span>
//           <span
//             style={{
//               fontSize: '14px',
//               fontWeight: '400',
//               color: '#000000',
//             }}
//           >
//             Start Hosting
//           </span>
//         </div>
//       </div>
//     </NavLink>
//   );
// };

const menuItems: any = [
  // {
  //   label: <NavLink to={HOME_PAGE}>Hotels</NavLink>,
  //   key: 'menu-1',
  // },
  // {
  //   label: <HostButton />,
  //   key: 'menu-2',
  // },
  // {
  //   label: <NavLink to={LISTING_POSTS_PAGE}>Listing</NavLink>,
  //   key: 'menu-2',
  // },
  // {
  //   label: <NavLink to={AGENT_PROFILE_PAGE}>Agent</NavLink>,
  //   key: 'menu-3',
  // },
  // {
  //   label: <NavLink to={PRICING_PLAN_PAGE}>Pricing</NavLink>,
  //   key: 'menu-4',
  // },
];

const MainMenu: React.FC<MainMenuProps> = ({ className }) => {
  return <Menu className={className} items={menuItems} />;
};

export default MainMenu;
