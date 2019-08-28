import axios from 'axios';

import { LOAD_HEALTH } from './types';

export function loadHealth() {
    return function(dispatch) {
        axios('/health', {
            method: 'get'
        }).then(function(response) {
            dispatch({
                type: LOAD_HEALTH,
                data: response.data
            })
        })
    }
}
