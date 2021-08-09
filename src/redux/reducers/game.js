import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  NEXT_QUESTIONS,
  CHANGE_CLASS,
  RESET_GAME,
  UPDATE_SCORE,
} from '../actions/actionsTypes';

const normalButton = 'btn answer-btn';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
  questionNumber: 0,
  cBtnClass: normalButton,
  wBtnClass: normalButton,
  correctAnswers: 0,
  score: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      error: null,
      questions: action.payload,
      isLoading: false,
    };
  case GET_QUESTIONS_ERROR:
    return { ...state, error: action.error };
  case NEXT_QUESTIONS:
    return {
      ...state,
      questionNumber: state.questionNumber + 1,
      cBtnClass: normalButton,
      wBtnClass: normalButton,
    };
  case CHANGE_CLASS:
    return {
      ...state,
      cBtnClass: action.correct,
      wBtnClass: action.wrong,
    };
  case RESET_GAME:
    return INITIAL_STATE;
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default game;
