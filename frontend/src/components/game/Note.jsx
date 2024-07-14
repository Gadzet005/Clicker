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
        <Coins value={<p className="text-success my-0">+{value}</p>} />
      </div>
    );
  }
  return (
    <div className="note">
      <Coins value={<p className="text-danger my-0">{value}</p>} />
    </div>
  );
};
