import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { 
	LOAD_ACTION, 
	LOAD_ONE_ACTION, 
	LOAD_BY_TYPE_ACTION,
} from './constants';

import { 
	loadSuccessAction, 
	loadErrorAction, 
	loadOneSuccessAction, 
	loadOneErrorAction, 
	loadByTypeSuccessAction, 
	loadByTypeErrorAction, 
} from './actions';

import * as Pokedex from 'pokeapi-js-wrapper';
const P = new Pokedex.Pokedex({ protocol: 'https' });

import _ from 'lodash';

function loadList(action) {
	let options;
	if (action.data && action.data.page)
		options = { limit: 10, offset: action.data.page * 10 };
	else
		options = { limit: 10, offset: 0 };
	return P.getPokemonsList(options);
}
function loadByName(name) {
	return P.getPokemonByName(name);
}
function loadByType(type) {
	return P.getTypeByName(type);
}

export function* doLoad(action) {
	try {
		if (action.data && action.data.query) {
			const pokemon = yield call(loadByName, action.data.query.toLowerCase());
			yield put(loadSuccessAction(
				{
					count: 1,
					results: [
						{
							details: pokemon,
							name: pokemon.name,
						}
					],
				}
			));
		} else {
			const pokemons = yield call(loadList, action);
			yield put(loadSuccessAction(pokemons));
		}
	} catch (err) {
		yield put(loadErrorAction(err));
	}
}
export function* doLoadOne(action) {
	try {
		const pokemon = yield call(loadByName, action.name);
		yield put(loadOneSuccessAction(pokemon));
	} catch (err) {
		yield put(loadOneErrorAction(err));
	}
}
export function* doLoadByType(action) {
	try {
		const type = yield call(loadByType, action.data.type);
		const res = {
			count: type.pokemon.length,
			results: _.map(type.pokemon.slice(action.data.page * 10, (action.data.page + 1) * 10), (item) => {
				return item.pokemon;
			}),
		};

		yield put(loadByTypeSuccessAction(res));
	} catch (err) {
		yield put(loadByTypeErrorAction(err));
	}
}

export default function* loadSaga() {
    yield [
    	takeLatest(LOAD_ACTION, doLoad),
    	takeLatest(LOAD_BY_TYPE_ACTION, doLoadByType),
    	takeEvery(LOAD_ONE_ACTION, doLoadOne)
    ];
}
