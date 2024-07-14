import word from "./imgs/word.png";

export const Words = ({ quantity = null }) => {
  return (
    <div className="d-flex align-items-center">
      <span className="me-2 text-muted fs-1">{quantity}</span>
      <img width="32px" height="32px" src={word} alt="word" />
    </div>
  );
};
