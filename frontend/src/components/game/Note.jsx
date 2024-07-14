import { useEffect, useState } from "react";

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
        <p className="text-success">+{value}</p>
      </div>
    );
  }
  return (
    <div className="note">
      <p className="text-danger">{value}</p>
    </div>
  );
};
