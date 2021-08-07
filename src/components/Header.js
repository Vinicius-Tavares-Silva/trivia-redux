import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './header.css';

class Header extends React.Component {
  getProfilePic() {
    const { loginInfos } = this.props;
    const emailHash = md5(loginInfos.email).toString();
    const imagePath = `https://www.gravatar.com/avatar/${emailHash}`;
    return imagePath;
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state.player.score;
  }

  render() {
    const { loginInfos } = this.props;
    return (
      <header className="header-section">
        <div className="profile-section">
          <img
            data-testid="header-profile-picture"
            src={ this.getProfilePic() }
            alt="foto de perfil"
          />
          <h1 data-testid="header-player-name">{ loginInfos.name }</h1>
        </div>
        <div className="score-section">
          <p>Pontos:</p>
          <p data-testid="header-score">{this.getScore()}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  loginInfos: state.loginReducers.playerInfo,
});

Header.propTypes = {
  loginInfos: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
