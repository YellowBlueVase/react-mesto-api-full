import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
    const nameRef = useRef('');
    const linkRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlaceSubmit({name:nameRef.current.value, link:linkRef.current.value});
        onClose();
    }

    useEffect(() => {
        nameRef.current.value ='';
        linkRef.current.value ='';
    }, [isOpen])

    return (
        <PopupWithForm
          title="Новое место"
          name="new-place"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText="Добавить"
        >
          <input
            id="form-container__input_place"
            type="text"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            className="form-container__input form-container__input_place"
            ref={nameRef}
          />
          <span id="form-container__input_place-error"></span>
          <input
            id="form-container__input_image"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            className="form-container__input form-container__input_image"
            ref={linkRef}
          />
          <span id="form-container__input_image-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;