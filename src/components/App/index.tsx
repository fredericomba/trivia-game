import React, { ReactElement } from 'react';
import logo from './logo.svg';
import './index.css';

import { decode } from 'html-entities';

import Constants from '../../shared/Constants/index';

import {
  PropsQuestionCard,
  CallBacksQuestionCard,
  ComponentQuestionCard,
} from '../../components/QuestionCard/index';

import {
  PropsWelcomeScreen,
  CallBacksWelcomeScreen,
  ComponentWelcomeScreen,
} from '../../components/WelcomeScreen/index';

import {
  PropsListEntry,
  PropsResultScreen,
  CallBacksResultScreen,
  ComponentResultScreen,
} from '../../components/ResultScreen/index';

const TIME_ALERT_READ = 2000; // 2 seconds for reading warnings

const LIMIT_QUESTIONS = 10;

const LIMIT_ATTEMPTS = 3;

const FETCH_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const POSSIBLE_ANSWERS = Object.freeze({
  'False': false,
  'True': true,
});

const loadQuestions = async () => {

  const response = await fetch(FETCH_URL);

  if (response.status === 200) {

    const json = await response.json();
    return json.results;

  }

  throw new Error('the status code of response is not 200!');

};

export interface CallBacksApp {};

export interface PropsApp {};

export const ComponentApp : React.FC<PropsApp> = () => {

  const [phase, setPhase] = React.useState<string>('PHASE_IDLE');

  const [attempts, setAttempts] = React.useState<number>(0);

  const [questions, setQuestions] = React.useState<any>();

  const [questionIndex, setQuestionIndex] = React.useState<number>(0);

  const [main, setMain]  = React.useState<ReactElement | null>(null);

  const mutableAnswersList = React.useRef<PropsListEntry[]>([]);

  React.useEffect(() => {

    switch (phase) {

      case 'PHASE_IDLE': {

        if (attempts < LIMIT_ATTEMPTS) {

          setAttempts(attempts + 1 | 0);

          setPhase('PHASE_LOADING');

        } else {

          setPhase('PHASE_ATTEMPTS_FAIL');

        }

        break;

      }

      case 'PHASE_ATTEMPTS_FAIL': {

        const resetAttempts = () => {

          setAttempts(0);
          setPhase('PHASE_IDLE');

        };

        const mainElement = (
          <div className="App-center-contents App-nowrap">
            <div className="App-retry-prompt">
              <span>{ Constants.STRING_LOADING_FAIL_DONE }</span>
              <button onClick={ resetAttempts }>
                <span>{ Constants.STRING_LOADING_TRY_AGAIN }</span>
              </button>
            </div>
          </div>
        );

        setMain(mainElement);

        break;

      }

      case 'PHASE_LOADING': {

        const mainElement = (
          <div className="App-center-contents App-nowrap">
            <span>{ Constants.STRING_LOADING }</span>
          </div>
        );

        setMain(mainElement);

        loadQuestions()
            .then((questions) => {

              setQuestions(questions);
              setPhase('PHASE_LOAD_PASS');

            })
            .catch((error) => {

              setPhase('PHASE_LOAD_FAIL');

            });

        break;

      }

      case 'PHASE_LOAD_FAIL': {

        const mainElement = (
          <div className="App-center-contents App-nowrap">
            <span>{ Constants.STRING_LOADING_FAIL_RETRY }</span>
          </div>
        );

        setMain(mainElement);

        const doRetry = () => {

          setPhase('PHASE_IDLE');

        };

        setTimeout(doRetry, TIME_ALERT_READ);

        break;

      }

      case 'PHASE_LOAD_PASS': {

        const mainElement = (
          <div className="App-center-contents App-nowrap">
            <span>{ Constants.STRING_LOADING_PASS }</span>
          </div>
        );

        setMain(mainElement);

        const doWelcome = () => {

          setPhase('PHASE_WELCOME');

        };

        setTimeout(doWelcome, TIME_ALERT_READ);

        break;

      }

      case 'PHASE_WELCOME': {

        const callbacksWelcomeScreen : CallBacksWelcomeScreen = {
          clickBegin: () => {

            mutableAnswersList.current = [];
            setQuestionIndex(0);
            setPhase('PHASE_QUESTIONS');

          },
        };

        const propsWelcomeScreen : PropsWelcomeScreen = {
          labelHeader: Constants.STRING_WELCOME_HEADER,
          labelBody: Constants.STRING_WELCOME_BODY,
          labelBegin: Constants.STRING_BEGIN_GAME,
          callbacks: callbacksWelcomeScreen,
        };

        const welcomeScreen = (
          <ComponentWelcomeScreen { ...propsWelcomeScreen } />
        );

        setMain(welcomeScreen);

        break;

      }

      case 'PHASE_QUESTIONS': {

        if (questionIndex < LIMIT_QUESTIONS) {

          const question = questions[questionIndex];

          const callbacksQuestionCard : CallBacksQuestionCard = {
            clickSubmit: (answer) => {

              const trivia = decode(question['question']);

              const answerKey = question['correct_answer'];

              let answerValue;

              switch (answerKey) {

                case 'True': {

                  answerValue = true;
                  break;

                }

                case 'False': {

                  answerValue = false;
                  break;

                }

              }

              const correct = answerValue === answer;

              const answersList = mutableAnswersList.current;

              answersList.push({ trivia, correct });

              setQuestionIndex(questionIndex + 1 | 0);

            },
          };

          const questionNumber = questionIndex + 1;

          const propsQuestionCard : PropsQuestionCard = {
            labelCategory: decode(question['category']),
            labelQuestion: decode(question['question']),
            labelTrue: Constants.STRING_LABEL_TRUE,
            labelFalse: Constants.STRING_LABEL_FALSE,
            labelSubmit: Constants.STRING_LABEL_SUBMIT,
            labelPosition: `${ questionNumber } of ${ LIMIT_QUESTIONS }`,
            callbacks: callbacksQuestionCard,
          };

          const questionCard = (
            <ComponentQuestionCard { ...propsQuestionCard } />
          );

          setMain(questionCard);

        } else {

          setPhase('PHASE_RESULTS');

        }

        break;

      }

      case 'PHASE_RESULTS': {

        const callbacksResultScreen : CallBacksResultScreen = {
          clickPlayAgain: () => {

            setAttempts(0);
            setPhase('PHASE_IDLE');

          },
        };

        const answersList = mutableAnswersList.current;

        let score = 0;

        answersList.forEach((answer) => {

          if (answer.correct) {

            score = score + 1 | 0;

          }

        });

        const propsResultScreen : PropsResultScreen = {
          answersList: answersList,
          labelScore: `You Scored: ${ score } / ${ LIMIT_QUESTIONS }`,
          labelPlayAgain: Constants.STRING_PLAY_AGAIN,
          callbacks: callbacksResultScreen,
        };

        const resultScreen = (
          <ComponentResultScreen { ...propsResultScreen } />
        );

        setMain(resultScreen);

        break;

      }

    }

  }, [phase, questionIndex]);

  return (
    <div className="App">
      { main }
    </div>
  );

}
