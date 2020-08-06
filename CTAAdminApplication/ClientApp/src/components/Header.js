import React from 'react';
// import { NavLink } from 'react-router-dom';
import CNav from "@coreui/react/src/nav/CNav";
import CNavItem from "@coreui/react/src/nav/CNavItem";
import CNavLink from "@coreui/react/src/nav/CNavLink";
import CNavbar from "@coreui/react/src/navbar/CNavbar";
import CNavbarBrand from "@coreui/react/src/navbar/CNavbarBrand";
import CNavbarNav from "@coreui/react/src/navbar/CNavbarNav";
import CDropdown from "@coreui/react/src/dropdown/CDropdown";
import CDropdownToggle from "@coreui/react/src/dropdown/CDropdownToggle";
import CDropdownMenu from "@coreui/react/src/dropdown/CDropdownMenu";
import CDropdownItem from "@coreui/react/src/dropdown/CDropdownItem";
// const [isOpen, setIsOpen] = useState(false);
const Header = () => (
  <div>
    <CNavbar expandable="sm" color="info" light={false}>
      <CNavbarBrand to="/">
        Atidan
        </CNavbarBrand>
      <CNavbarNav>
        <CNav variant="pills">
          <CNavItem><CNavLink to="/dashboard">Dashboard</CNavLink></CNavItem>
        </CNav>
      </CNavbarNav>
      <CNavbarNav className="ml-auto">
        <CDropdown
          inNav
        >
          <CDropdownToggle color="primary" caret>
            Lang
              </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>EN</CDropdownItem>
            <CDropdownItem>ES</CDropdownItem>
            <CDropdownItem>RU</CDropdownItem>
            <CDropdownItem>FA</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CDropdown
          inNav
        >
          <CDropdownToggle color="primary" caret>
            User
              </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Account</CDropdownItem>
            <CDropdownItem>Settings</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbarNav>
    </CNavbar>
  </div>
)
export default Header;
