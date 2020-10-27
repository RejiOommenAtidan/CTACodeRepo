import React, { useState } from 'react';
import CardDrag from './Card';
import update from 'immutability-helper';
const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Banana Boat'
    },
    {
      id: 2,
      text: 'Orange Juice'
    },
    {
      id: 3,
      text: 'Cuban Cigar'
    },
    {
      id: 4,
      text: 'Terrible Comedian'
    },
    {
      id: 5,
      text: 'Anxious Cab Driver'
    },
    {
      id: 6,
      text: 'Green Orange Potatoes'
    },
    {
      id: 7,
      text: 'Castles in the sky'
    }
  ]);
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })
    );
  };
  return (
    <div className="col-md-6 my-4 p-0 mx-auto">
      {cards.map((card, i) => (
        <CardDrag
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};
export default Container;
