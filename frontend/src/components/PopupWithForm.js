function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      tabIndex="-1"
    >
      <div className="popup__container">
        <button
          type="button"
          name="close-button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <form
          name={`form-${name}`}
          className={`form-container form-container_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="form-container__title">{title}</h2>
          {children}
          <button
            type="submit"
            name="submit"
            className="form-container__submit"
          >{buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
