import { combineReducers } from 'redux';
import { LoadingSlice } from './loading.slice';
import { UserSlice } from './user.slice';

/**COMBINE ALL REDUCERS */
const reducers = combineReducers({
    loading: LoadingSlice.reducer,
    user: UserSlice.reducer,
});
export default reducers;