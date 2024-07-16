import { Coins } from "../common/Coins";

export const ShopItem = ({ id, name, description, cost, level, maxLevel }) => {
  const buyItemHandler = (itemId) => {
    console.log(itemId);
  };

  return (
    <div className="p-4	m-3 border border-3 border-black rounded-5">
      <h1 className="text-center">{name}</h1>
      <p className="text-muted">{description}</p>
      <div>
        <p className="d-inline me-3 fs-3">Стоимость:</p>
        <Coins
          value={cost}
          textStyle="me-1 fs-3"
          imageWidth="25px"
          imageHeight="25px"
        />
      </div>
      <p className="fs-3">
        Текущий уровень: {level} / {maxLevel}
      </p>
      <div className="d-flex justify-content-center">
        {level === maxLevel ? (
          <button className="btn btn-danger btn-lg">
            Максимальный уровень
          </button>
        ) : (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => buyItemHandler(id)}
          >
            {level === 0 ? "Купить" : "Улучшить"}
          </button>
        )}
      </div>
    </div>
  );
};
