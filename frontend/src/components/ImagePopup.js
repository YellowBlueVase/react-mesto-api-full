function ImagePopup({card, onClose}) {
    
    return(
        <div className={`popup popup_type_large-image ${card && 'popup_opened'}`} tabIndex="-1">
            <div className="popup__container">
                <button type="button" name="close-button" className="popup__close-button" onClick={onClose}></button>
                <div className="image-container">
                <img src={card?.link} className="image-container__image" alt="Картинка карточки в большом размере"/>
                <h3 className="image-container__title">{card?.name}</h3>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;