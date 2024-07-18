import { useEffect, useState } from "react";
import { Coins } from "../common/Coins";

export const Note = ({ value }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }, []);

  if (!isVisible || value === 0) {
    return null;
  }

  if (value > 0) {
    return (
      <div className="note">
        <Coins textStyle="text-success" value={`+${value}`} />
      </div>
    );
  }
  return (
    <div className="note">
      <Coins textStyle="text-danger" value={value} />
    </div>
  );
};
