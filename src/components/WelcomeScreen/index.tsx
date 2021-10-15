import React from 'react';

export interface CallBacksWelcomeScreen {
  clickBegin: () => void;
};

export interface PropsWelcomeScreen {
  labelHeader: string;
  labelBody: string;
  labelBegin: string;
  callbacks: CallBacksWelcomeScreen;
};

export const ComponentWelcomeScreen : React.FC<PropsWelcomeScreen> = (props) => {

  const {
    labelHeader,
    labelBody,
    labelBegin,
    callbacks,
  } = props;

  return (
    <div className="WelcomeScreen">
      <div className="WelcomeScreen-header">
        <span>{ labelHeader }</span>
      </div>
      <div className="WelcomeScreen-body">
        <span>{ labelBody }</span>
      </div>
      <div className="WelcomeScreen-buttons">
        <button onClick={ callbacks.clickBegin }>
          <span>{ labelBegin }</span>
        </button>
      </div>
    </div>
  );

};