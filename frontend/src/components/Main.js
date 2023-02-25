import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.js";


function Main({onEditProfile, onEditAvatar, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser?.avatar}
            className="profile__avatar-image"
            alt={`Фотография ${currentUser?.name}`}
          />
          <button
            type="button"
            onClick={onEditAvatar}
            name="edit-avatar"
            className="profile__avatar-hover"
          >
            <div className="profile__avatar-icon" />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            name="edit-button"
            className="profile__edit-button"
          ></button>
          <h2 className="profile__job">{currentUser?.about}</h2>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          name="add-button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map(card => {
          return (
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}/>
          );
        })}
      </section>
    </main>
  );
}

export default Main;
