import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonNext from './ButtonNext';
import { changeClass, correctAnswer } from '../redux/actions';
import './GameQuestions.css';
import FinalResults from './FinalResults';

class GameQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the first weapon you acquire in Half-Life?',
        correct_answer: 'A crowbar',
        incorrect_answers: ['A pistol', 'The H.E.V suit', 'Your fists'],
      },
      sortedAnswers: [],
      timer: 30,
      timerIntervalID: 0,
      canDisable: true,
      disableAnswers: false,
      nextButton: false,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
    this.setTimer();
  }

  componentDidUpdate() {
    const { timer, timerIntervalID } = this.state;
    if (timer <= 0) {
      clearInterval(timerIntervalID);
      this.disableAnswers();
    }
  }

  getQuestion() {
    const { questions, questionNumber } = this.props;
    const question = questions[questionNumber];
    this.setState({
      question,
    }, () => this.setAnswers());
  }

  setAnswers() {
    const { question } = this.state;
    const incorrectAnswers = question.incorrect_answers.map((answer) => ({
      answer,
      isCorrect: false,
      id: Math.random(),
    }));
    const answers = [
      {
        answer: question.correct_answer,
        isCorrect: true,
        id: Math.random(),
      },
      ...incorrectAnswers,
    ];

    const sortedAnswers = answers.sort((a, b) => a.id - b.id);
    this.setState({ sortedAnswers });
  }

  setTimer() {
    this.setState({ timer: 30, disableAnswers: false, canDisable: true });
    const timerStep = 1000;

    const timerIntervalID = setInterval(() => {
      this.setState((previousState) => ({ timer: previousState.timer - 1 }));
    }, timerStep);

    this.setState({ timerIntervalID });
  }

  disableAnswers() {
    const { canDisable } = this.state;
    if (canDisable) {
      this.setState({ disableAnswers: true, canDisable: false, nextButton: true });
    }
  }

  handleClick(answerStatus) {
    // No momento que essa função for chamada significa que a pessoa respondeu e o botão de proximo pode aparacer
    const { showAnswer } = this.props;
    showAnswer('answer-btn-correct', 'answer-btn-wrong');
    this.setState({
      nextButton: true,
    });

    if (answerStatus === 'correct') {
      const { correct } = this.props;
      correct();
    }
    if (answerStatus === 'wrong') {
      // implementar comportamento quando errar a pergunta.
    }
  }

  renderQuestions() {
    const { question, disableAnswers, sortedAnswers } = this.state;
    const { cBtnClass, wBtnClass } = this.props;
    const answers = sortedAnswers;
    return (
      <div className="questions-card">
        <div className="questions-text">
          <span className="cat" data-testid="question-category">{question.category}</span>
          <span data-testid="question-text">{question.question}</span>
        </div>
        <div className="questions-answers">
          {answers.map((answer, index) => {
            if (answer.isCorrect) {
              return (
                <button
                  className={ cBtnClass }
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  disabled={ disableAnswers }
                  onClick={ () => {
                    this.handleClick('correct');
                  } }
                >
                  { answer.answer }
                </button>
              );
            }
            return (
              <button
                className={ wBtnClass }
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
                disabled={ disableAnswers }
                onClick={ () => {
                  this.handleClick('wrong');
                } }
              >
                { answer.answer }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { timer, nextButton, timerIntervalID } = this.state;

    return (
      <div className="questions-container">
        { this.renderQuestions()}
        <div>
          <p>{ `Tempo: ${timer}` }</p>
          {nextButton && <ButtonNext
            getQuestion={ this.getQuestion }
            setTimer={ this.setTimer }
            timerIntervalID={ timerIntervalID }
          />}
        </div>
        <FinalResults />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionNumber: state.game.questionNumber,
  cBtnClass: state.game.cBtnClass,
  wBtnClass: state.game.wBtnClass,
});

const mapDispatchToProps = (dispatch) => ({
  showAnswer: (correct, wrong) => dispatch(changeClass(correct, wrong)),
  correct: () => dispatch(correctAnswer()),
});

GameQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
  showAnswer: PropTypes.func.isRequired,
  cBtnClass: PropTypes.string.isRequired,
  wBtnClass: PropTypes.string.isRequired,
  correct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
