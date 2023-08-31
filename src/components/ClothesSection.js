import React, { useContext, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/Profile.css";

const ClothesSection = ({
  cards,
  onCardClick,
  onAddClick,
  isLoggedIn,
  onLike,
  onUnlike,
  weatherType, 
  filtered// New prop for weather type
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [displayCards, setDisplayCards] = useState([]);

  useEffect(() => {
    setDisplayCards(cards)
    if (filtered){
      console.log("hello if")
      const fillCards = cards.filter(
        (card) =>
          card?.owner === currentUser._id && card.weather === weatherType
          
          // card has a weather prop not weatherType. card.weatherType does not exist
      );
      setDisplayCards(fillCards)
    }
    
    console.log(cards)
    console.log(weatherType)
  }, [cards, filtered]);

  return (
    <div className="profile__container">
      <div className="profile__subcontainer">
        <p className="profile__title">Your items</p>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="profile__cards">
        {displayCards.length === 0 ? (
          <div>No items to display</div>
        ) : (
          displayCards.map((card) => (
            <ItemCard
              key={card._id}
              item={card}
              onSelectCard={onCardClick}
              onLike={onLike}
              onUnlike={onUnlike}
              isLoggedIn={isLoggedIn}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ClothesSection;
