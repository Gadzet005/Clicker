import { COIN_RATING_PAGE, WORD_RATING_PAGE } from "../../routing/consts";
import { Link } from "react-router-dom";
import { Coins } from "../common/Coins";
import { Words } from "../common/Words";

export const RatingHeader = ({ title = "Рейтинг игроков" }) => {
  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">{title}</h1>
      <div className="d-flex justify-content-center mb-5 mt-2">
        <Link className="mx-2" to={COIN_RATING_PAGE}>
          <Coins />
        </Link>
        <Link className="mx-2" to={WORD_RATING_PAGE}>
          <Words />
        </Link>
      </div>
    </div>
  );
};
