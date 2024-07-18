import { BaseRating } from "./BaseRating";
import { Words } from "../common/Words";
import { RatingHeader } from "./RatingHeader";
import { getWordRating } from "../../api/gameApi";
import { useState, useEffect } from "react";

export const WordRating = () => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    getWordRating().then((data) => {
      setRating(data);
    });
  }, []);

  return (
    <div>
      <RatingHeader title="Рейтинг игроков: слова" />
      <BaseRating list={rating} IconComp={Words} />
    </div>
  );
};
