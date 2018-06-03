import { LOAD_COUNTER } from './types';

export default function(state = 0, action) {
    switch(action.type) {
        case LOAD_COUNTER:
            return action.data.counter;
        default:
            return state;
    }
}
