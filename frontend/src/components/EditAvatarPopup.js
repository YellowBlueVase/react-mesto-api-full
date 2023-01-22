import {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
        avatarRef.current.value=''
    }

    return (
        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText="Подтвердить"
        >
          <input
            id="form-container__input_avatar"
            type="text"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
            minLength="2"
            maxLength="400"
            className="form-container__input form-container__input_name"
            ref={avatarRef}
          />
          <span id="form-container__input_avatar-error"></span>
        </PopupWithForm>
    )}

export default EditAvatarPopup;