import { combineReducers } from 'redux';
import { edusReducer } from './edus';
import { experimentalSkillsReducer } from './experimentalSkills';
import { honorsReducer } from './honors';
import { jobsReducer } from './jobs';
import { languagesReducer } from './languages';
import { projectsReducer } from './projects';
import { researchesReducer } from './researches';

export const reducers = combineReducers({
    edus: edusReducer,
    jobs: jobsReducer,
    languages: languagesReducer,
    experimentalSkills: experimentalSkillsReducer,
    honors: honorsReducer,
    researches: researchesReducer,
    projects: projectsReducer
});