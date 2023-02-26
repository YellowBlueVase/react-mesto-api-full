import "../index.css";
import {useState, useEffect} from "react";
import api from "../utils/api.js";
import { checkToken, register, authorize } from "../utils/auth";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login";
import Register from "./Register";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import {InfoToolTip} from "./InfoToolTip.js";
import { ProtectedRoute } from "./ProtectedRoute";
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authEmail, setAuthEmail] = useState('')
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState({isOpen: false, status: '', title: ''});
  const [selectedCard, setSelectedCard] = useState(null);
  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card, isLiked) {
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c))
      })
      .catch((err) => {
        console.log(err);
      })
      } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(current => current.filter(item => {
        return item._id !== card._id}))
    })
    .catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(props) {
    const newCard = {
      name: props.name,
      link: props.link,
    }
    api.addNewCard(newCard)
    .then((card) => {
      setCards([card.data, ...cards]);
    })
    .catch((err) => {console.log(err)})
  }
  
  function handleUpdateUser(props) {
    api.updateProfile(props)
    .then(() => {
      setCurrentUser({...currentUser, name: props.name, about: props.about})
      closeAllPopups()
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(props) {
    api.updateAvatar(props.avatar)
    .then(() => {
      console.log(props)
      console.log(props.avatar)
      console.log(currentUser)
      setCurrentUser({...currentUser, avatar: props.avatar})
      console.log(currentUser)
      closeAllPopups()
    })
    .catch((err) => {console.log(err)})
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLoggedInChange() {
    setLoggedIn(!loggedIn)
  }

  function handleRegisterStatus(status) {
    status === 'success' && setRegisterStatus({
        isOpen: true,
        title: "Вы успешно зарегистрировались!",
        status: 'status_success'
      })
    status === 'error' && setRegisterStatus({
        isOpen: true,
        title: "Что-то пошло не так! Попробуйте еще раз.",
        status: 'status_error'
      });
    status === '' && setRegisterStatus({})
  }

  function handleLogin(password, email) {
    authorize(password, email)
        .then((data) => {
                if (data.token === localStorage.getItem('jwt')) {
                    history.push('/'); 
                    setAuthEmail(email);
                    handleLoggedInChange()
                  }})
        .catch((err) => {
            console.log(err);
            handleRegisterStatus('error');
        }); 
  }

  function handleRegister(password, email) {
    register(password, email)
    .then((res) => {
      if (res) {
        handleRegisterStatus('success');
        history.push("/signin");
      }
    })
    .catch((err) => {
        console.log(err);
        handleRegisterStatus('error');
    })
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      checkToken(jwt)
      .then((res) => {
        if (res){
          setAuthEmail(res.data.email)
          setLoggedIn({
            loggedIn: true,
          });
          history.push("/");
        }}) 
      .catch((err) => {
        console.log(err);})
  }}

  function handleSignOut(){
    localStorage.removeItem('jwt');
    setAuthEmail('');
    history.push('/signin');
    setLoggedIn(false)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setRegisterStatus({
      isOpen: false,
      title: '',
      status: ''
    })
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    registerStatus.isOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
    
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    loggedIn && api
      .getProfileInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser.data);
      })
      .catch((err) => {
        console.log(err);
      });
    loggedIn && api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck()
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          authEmail={authEmail}
          onSignOut={handleSignOut} />
        <Switch>
          <Route exact path="/signin">
            <Login 
              onLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <Register 
              onRegister={handleRegister}/>
          </Route>
          <ProtectedRoute 
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            />
        </Switch>
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} /> 
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} /> 
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit} /> 
        <PopupWithForm
            title="Вы уверены?"
            name="delete"
            onClose={closeAllPopups}
            buttonText="Все равно удалить"/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip 
            status={registerStatus}
            onClose={closeAllPopups}/>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
