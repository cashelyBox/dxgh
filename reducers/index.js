import {combineReducers} from 'redux';

let defaultIndex = {

}
function index(state = defaultIndex,action){
	return state;
}

const reducer = combineReducers({
	index
});
export default reducer;

