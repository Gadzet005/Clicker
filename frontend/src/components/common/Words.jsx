import word from "./imgs/word.png";

export const Words = ({ value = null }) => {
  return (
    <div className="d-flex align-items-center">
      <span className="me-2 text-muted fs-1">{value}</span>
      <img width="32px" height="32px" src={word} alt="word" />
    </div>
  );
};
