import word from "./imgs/word.png";

export const Words = ({
  value = null,
  textStyle = "me-2 text-muted fs-1",
  imageWidth = "32px",
  imageHeight = "32px",
}) => {
  return (
    <div className="d-inline-flex align-items-center">
      <span className={textStyle}>{value}</span>
      <img width={imageWidth} height={imageHeight} src={word} alt="word" />
    </div>
  );
};
