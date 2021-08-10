import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FinalResults from '../components/FinalResults';
import MessageFeedback from '../components/MessageFeedback';
import Header from '../components/Header';
import { resetGame, resetPlayer } from '../redux/actions';
import './feedback.css';

class Feedback extends React.Component {
  reset() {
    const { rstGame, rstPlayer } = this.props;
    rstGame();
    rstPlayer();
  }

  rankingBtn() {
    return (
      <Link to="/Ranking">
        <button
          className="btn-ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.reset() }
        >
          Ranking
        </button>
      </Link>
    );
  }

  playAgainBtn() {
    return (
      <Link to="/">
        <button
          className="btn-play"
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.reset() }
        >
          Jogar novamente
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <section className="container-feedback">
          <FinalResults />
          <MessageFeedback />
          {this.playAgainBtn()}
          {this.rankingBtn()}
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  rstGame: PropTypes.func.isRequired,
  rstPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  rstGame: () => dispatch(resetGame()),
  rstPlayer: () => dispatch(resetPlayer()),
});

export default connect(null, mapDispatchToProps)(Feedback);
