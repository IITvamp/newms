import React from "react";
import { useSelector } from "react-redux";

const DisLikeButton = ({
  isLike,
  isDisLike,
  handleLike,
  handleUnDisLike,
  handleDisLike,
  handleUnLike,
}) => {
  const { theme } = useSelector((state) => state);
  console.log(isDisLike)
  // const disLikeClickHandler = () => {
  //   handleDisLike();
  //   if (isLike) {
  //     handleUnDisLike();
  //   }
  // };
  return (
    <div>
      {isDisLike ? (
        <i
          className="fas fa-thumbs-down text-info"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          onClick={handleUnDisLike}
        />
      ) : (
        <i className="far fa-thumbs-down" onClick={handleDisLike} />
      )}
    </div>
  );
};

export default DisLikeButton;
