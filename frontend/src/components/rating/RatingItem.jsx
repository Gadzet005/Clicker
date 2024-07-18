import first from "./imgs/first.png";
import second from "./imgs/second.png";
import third from "./imgs/third.png";
import other from "./imgs/other.png";

export const RatingItem = ({
  name,
  score,
  place,
  IconComp,
  isActive = false,
}) => {
  let placeComp;
  if (place === 1) {
    placeComp = <img width="64px" height="64px" src={first} alt="1" />;
  } else if (place === 2) {
    placeComp = <img width="64px" height="64px" src={second} alt="2" />;
  } else if (place === 3) {
    placeComp = <img width="64px" height="64px" src={third} alt="3" />;
  } else {
    placeComp = <img width="64px" height="64px" src={other} alt="other" />;
  }

  if (isActive) {
    return (
      <li className="list-group-item list-group-item-action active bg-white border-5">
        <div className="d-flex justify-content-between align-items-center">
          {placeComp}
          <p className="my-0 fs-1 text-primary me-2 ms-5">{place}.</p>
          <p className="my-0 me-auto fs-1 text-primary">{name}</p>
          <IconComp value={<p className="text-primary my-0">{score}</p>} />
        </div>
      </li>
    );
  }

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        {placeComp}
        <p className="my-0 fs-1 text-secondary me-2 ms-5">{place}.</p>
        <p className="my-0 me-auto fs-1 text-secondary">{name}</p>
        <IconComp value={score} />
      </div>
    </li>
  );
};
