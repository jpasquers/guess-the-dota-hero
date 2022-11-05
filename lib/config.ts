export const STARTING_SCORE = process.env.STARTING_SCORE
    ? parseInt(process.env.STARTING_SCORE)
    : 1000;
export const SCORE_LOSS_PER_GUESS =  process.env.SCORE_LOSS_PER_GUESS
    ? parseInt(process.env.SCORE_LOSS_PER_GUESS)
    : 200;
export const SCORE_LOSS_PER_HINT = process.env.SCORE_LOSS_PER_GUESS
    ? parseInt(process.env.SCORE_LOSS_PER_GUESS)
    : 100;
