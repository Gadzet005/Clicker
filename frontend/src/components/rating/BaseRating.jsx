import { RatingItem } from "./RatingItem";

export const BaseRating = ({ getList, IconComp }) => {
  const list = getList().map((elem) => {
    return {
      ...elem,
      name: elem.name.slice(0, 15) + (elem.name.length > 15 ? "..." : ""),
    };
  });

  const items = [];
  for (let i = 0; i < list.length; i++) {
    items.push(
      <RatingItem
        key={i}
        name={list[i].name}
        score={list[i].score}
        place={i + 1}
        IconComp={IconComp}
      />
    );
  }

  return (
    <div className="container">
      <ul className="list-group">{items}</ul>
    </div>
  );
};
