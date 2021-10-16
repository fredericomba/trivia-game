import React from 'react';

export interface PropsListEntry {
  trivia: string;
  correct: boolean;
};

const ComponentListEntry : React.FC<PropsListEntry> = (props) => {

  const { trivia, correct } = props;

  const icon = correct ? '+' : '-';

  return (
    <div className="ResultScreen-list-entry">
      <div>
        <span>{ icon }</span>
      </div>
      <div>
        <span>{ trivia }</span>
      </div>
    </div>
  );

};

export interface CallBacksResultScreen {
  clickPlayAgain: () => void;
};

export interface PropsResultScreen {
  answersList: PropsListEntry[];
  labelScore: string;
  labelPlayAgain: string;
  callbacks: CallBacksResultScreen;
};

export const ComponentResultScreen: React.FC<PropsResultScreen> = (props) => {

  const {
    answersList,
    labelScore,
    labelPlayAgain,
    callbacks,
  } = props;

  const componentsAnswersList = answersList.map(ComponentListEntry);

  return (
    <div className="ResultScreen">
      <div className="ResultScreen-score">
        <span>{ labelScore }</span>
      </div>
      <div className="ResultScreen-list">
        { componentsAnswersList }
      </div>
      <div className="ResultScreen-buttons">
        <button onClick={ callbacks.clickPlayAgain }>
          <span>{ labelPlayAgain }</span>
        </button>
      </div>
    </div>
  );

};