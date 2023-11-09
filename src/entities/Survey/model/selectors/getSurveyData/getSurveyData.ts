import { StateSchema } from 'app/providers/StoreProvider';

export const getSurveyData = (state: StateSchema) => state.survey.data.survey;
