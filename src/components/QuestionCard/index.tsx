import React from 'react';

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
        <div>
          <button onClick={ clickTrue }>
            <span>{ labelTrue }</span>
          </button>
          <button onClick={ clickFalse }>
            <span>{ labelFalse }</span>
          </button>
        </div>
        <div>
          <button onClick={ clickSubmit }>
            <span>{ labelSubmit }</span>
          </button>
        </div>
      </div>
    </div>
  );

};

export default ComponentQuestionCard;