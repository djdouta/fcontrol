import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

const SidebarNavItem = ({ item }, index) => {
  const [activeMenu, setActiveMenu] = useState(false);
  return item.htmlAfter ? (
    <NavItem>
      <NavLink onClick={() => setActiveMenu(!activeMenu)}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
      {activeMenu &&
        item.links.map((link, index) => (
          <NavLink key={index} tag={RouteNavLink} to={link.to}>
            {item.htmlBefore && (
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: link.icon }}
              />
            )}
            {item.title && <span>{link.title}</span>}
          </NavLink>
        ))}
    </NavItem>
  ) : (
    <NavItem>
      <NavLink tag={RouteNavLink} to={item.to}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
      </NavLink>
    </NavItem>
  );
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
