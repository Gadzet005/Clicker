import { Link } from "react-router-dom";

export const HeaderItem = ({ name, path, isActive = false }) => {
  return (
    <Link className="nav-link mx-3" to={path}>
      {name}
    </Link>
  );
};
