import { combineReducers } from 'redux';

import counter from './counter/reducer';
import health from './health/reducer';

export default combineReducers({counter, health});