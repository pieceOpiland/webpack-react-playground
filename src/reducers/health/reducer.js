import { LOAD_HEALTH } from './types';

export default function(state = "", action) {
    switch (action.type) {
        case LOAD_HEALTH:
            return action.data.health;
        default:
            return state;
    }
}