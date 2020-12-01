import { combineReducers } from 'redux';
import { edusReducer } from './edus';
import { jobsReducer } from './jobs';
import { languagesReducer } from './languages';

export const reducers = combineReducers({
    edus: edusReducer,
    jobs: jobsReducer,
    languages: languagesReducer
});