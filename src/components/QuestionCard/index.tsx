import React from 'react';
import './index.css';

export interface CallBacksQuestionCard {
  clickSubmit: (answer: undefined | boolean) => void;
};

export interface PropsQuestionCard {
  labelCategory: string;
  labelQuestion: string;
  labelPosition: string;
  labelTrue: string;
  labelFalse: string;
  labelSubmit: string;
  callbacks: CallBacksQuestionCard;
};

export const ComponentQuestionCard : React.FC<PropsQuestionCard> = (props) => {

  const [answer, setAnswer] = React.useState<undefined | boolean>();

  const {
    labelCategory,
    labelQuestion,
    labelPosition,
    labelTrue,
    labelFalse,
    labelSubmit,
    callbacks,
  } = props;

  const clickTrue = () => {

    setAnswer(true);

  };

  const clickFalse = () => {

    setAnswer(false);

  };

  const clickSubmit = () => {

    callbacks.clickSubmit(answer);

  };

  return (
    <div className="QuestionCard">
      <div className="QuestionCard-category">
        <span>{ labelCategory }</span>
      </div>
      <div className="QuestionCard-question">
        <span>{ labelQuestion }</span>
      </div>
      <div className="QuestionCard-position">
        <span>{ labelPosition }</span>
      </div>
      <div className="QuestionCard-buttons">
        <button className="QuestionCard-buttons-true" onClick={ clickTrue }>
          <span>{ labelTrue }</span>
        </button>
        <button className="QuestionCard-buttons-false" onClick={ clickFalse }>
          <span>{ labelFalse }</span>
        </button>
        <button className="QuestionCard-buttons-submit" onClick={ clickSubmit }>
          <span>{ labelSubmit }</span>
        </button>
      </div>
    </div>
  );

};

export default ComponentQuestionCard;