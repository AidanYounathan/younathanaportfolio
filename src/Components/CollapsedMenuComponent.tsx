import React from "react";
import NavLinkComponent from "./NavLinkComponent";

interface Link {
  path: string;
  title: string;
}

interface CollapsedMenuProps {
  links: Link[];
}

const CollapsedMenu: React.FC<CollapsedMenuProps> = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLinkComponent href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default CollapsedMenu