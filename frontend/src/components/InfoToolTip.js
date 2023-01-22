export const InfoToolTip = ({status, onClose}) => {

  return (
    <div
      className={`popup ${status.isOpen && "popup_opened"}`}
      tabIndex="-1"
    >
      <div className="popup__container">
        <button
          type="button"
          name="close-button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <div
          name={`form-${status.status}`}
          className={`form-container form-container_${status.status}`}
        >
          <div className={`form-container__status form-container__${status.status}`} />
          <h2 className="form-container__title form-container__title_center">{status.title}</h2>
        </div>
      </div>
    </div>
  );
}

