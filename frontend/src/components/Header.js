import {Link, Switch, Route} from "react-router-dom";

function Header({ authEmail, onSignOut }) {

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__profile-box">
          <Switch>
            <Route exact path="/">
              <div className="header__user-profile">{authEmail}</div>
              <button className='header__button header__button_gray' onClick={onSignOut}>Выйти</button>
            </Route>
            <Route exact path="/signup">
              <Link to="/signin" className='header__button header__button_white'>Войти</Link>
            </Route>
            <Route path="/signin">
              <Link to="/signup" className='header__button header__button_white'>Регистрация</Link>
            </Route>

        </Switch>
      </div>
    </header>
  );
}

export default Header;
