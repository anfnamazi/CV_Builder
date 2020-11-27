import { combineReducers } from 'redux';
import { edusReducer } from './edus';
import { jobsReducer } from './jobs';

export const reducers = combineReducers({ edus: edusReducer, jobs: jobsReducer });