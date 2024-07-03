import React from "react";

interface FavoritesIconProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FavoritesIcon: React.FC<FavoritesIconProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <button onClick={onToggleFavorite} className="favorites-icon">
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoritesIcon;
