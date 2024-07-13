import { useEffect, useState } from "react";

export const Note = ({ score }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }, []);

  if (!isVisible || score === 0) {
    return null;
  }

  if (score > 0) {
    return <p className="text-success">+{score}</p>;
  }
  return <p className="text-danger">{score}</p>;
};
