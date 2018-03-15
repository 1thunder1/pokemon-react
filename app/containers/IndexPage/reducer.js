/*
 *
 * IndexPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LOAD_ACTION,
    LOAD_SUCCESS_ACTION,
    LOAD_ERROR_ACTION,

    LOAD_ONE_ACTION,
    LOAD_ONE_SUCCESS_ACTION,
    LOAD_ONE_ERROR_ACTION,

    LOAD_BY_TYPE_ACTION,
    LOAD_BY_TYPE_SUCCESS_ACTION,
    LOAD_BY_TYPE_ERROR_ACTION,
} from './constants';

import _ from 'lodash';

const initialState = fromJS({
    page: 0,
    data: {
        results: [ ],
    }
});

function indexPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACTION:
            return state
            	.set('isLoading', true)
                .set('type', '')
                .set('page', action.data.page)
                .set('query', action.data.query);
        case LOAD_SUCCESS_ACTION:
        	console.log('here we are', action.data);
            return state
            	.set('isLoading', false)
            	.set('data', action.data);
        case LOAD_ERROR_ACTION:
            return state
            	.set('isLoading', false)
            	.set('errors', action.err);

        case LOAD_ONE_ACTION:
            return state;
        case LOAD_ONE_SUCCESS_ACTION:
            const data = state.get('data');
            data.results = _.map(state.get('data').results, function (model) {
                if (model.name === action.data.name) {
                    model.isLoaded = true;
                    model.details = action.data;
                }
                return model;                
            });

            return state
                .set('data', data)
                .set('updatedAt', new Date());
        case LOAD_ONE_ERROR_ACTION:
            return state;

        case LOAD_BY_TYPE_ACTION:
            return state
                .set('isLoading', true)
                .set('type', action.data.type)
                .set('page', action.data.page)
                .set('query', '');
        case LOAD_BY_TYPE_SUCCESS_ACTION:
            console.log('here we are with filters', action.data);
            return state
                .set('isLoading', false)
                .set('data', action.data);
        case LOAD_BY_TYPE_ERROR_ACTION:
            return state
                .set('isLoading', false)
                .set('errors', action.err);

        default:
            return state;
    }
}

export default indexPageReducer;
