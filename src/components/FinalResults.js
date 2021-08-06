import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FinalResults extends React.Component {
  render() {
    const { answersCount } = this.props;

    return (
      <section>
        <div>
          <p>Pontos:</p>
          <p data-testid="feedback-total-score">{ 55 }</p>
        </div>
        <div>
          <p>Acertos:</p>
          <p data-testid="feedback-total-question">{ answersCount }</p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  answersCount: state.game.correctAnswers,
});

FinalResults.propTypes = {
  answersCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FinalResults);
