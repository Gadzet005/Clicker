import { Link } from "react-router-dom";

export const HeaderItem = ({
  name,
  path,
  isActive = false,
  onClick = () => {},
}) => {
  if (isActive) {
    return <p className="nav-link active mx-3 my-0">{name}</p>;
  }
  return (
    <Link className="nav-link mx-3" to={path} onClick={() => onClick(path)}>
      {name}
    </Link>
  );
};
