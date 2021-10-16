const STRING_EMPTY = '';

const STRING_SINGLE_SPACE = ' ';

const LONG_STRING = (chunks: string[], separator = STRING_EMPTY) => {
  return chunks.join(separator);
};

export const STRING_BEGIN_GAME = 'BEGIN';

export const STRING_LABEL_TRUE = 'True';

export const STRING_LABEL_FALSE = 'False';

export const STRING_LOADING = 'LOADING CONTENT...';

export const STRING_LOADING_FAIL_DONE = 'ALL ATTEMPTS HAVE FAILED!';

export const STRING_LOADING_FAIL_RETRY = 'FAILED TO LOAD! RETRYING...';

export const STRING_LOADING_PASS = 'CONTENT LOADED!';

export const STRING_LOADING_TRY_AGAIN = 'TRY AGAIN?';

export const STRING_LABEL_SUBMIT = 'Submit';

export const STRING_PLAY_AGAIN = 'PLAY AGAIN?';

export const STRING_WELCOME_HEADER = 'Welcome to the Trivia Challenge!';

export const STRING_WELCOME_BODY = LONG_STRING([
  'You will be presented with 10 True or False questions.',
  'Can you score 100%?',
], STRING_SINGLE_SPACE);

export const Constants = Object.freeze({
  STRING_BEGIN_GAME,
  STRING_LABEL_FALSE,
  STRING_LABEL_TRUE,
  STRING_LABEL_SUBMIT,
  STRING_LOADING,
  STRING_LOADING_FAIL_DONE,
  STRING_LOADING_FAIL_RETRY,
  STRING_LOADING_PASS,
  STRING_LOADING_TRY_AGAIN,
  STRING_PLAY_AGAIN,
  STRING_WELCOME_HEADER,
  STRING_WELCOME_BODY,
});

export default Constants;