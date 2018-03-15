/*
 *
 * IndexPage actions
 *
 */

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

export function loadAction(data) {
    return {
        type: LOAD_ACTION,
        data,
    };
}
export function loadSuccessAction(data) {
    return {
        type: LOAD_SUCCESS_ACTION,
        data,
    };
}
export function loadErrorAction(err) {
    return {
        type: LOAD_ERROR_ACTION,
        err,
    };
}

export function loadOneAction(name) {
    return {
        type: LOAD_ONE_ACTION,
        name,
    };
}
export function loadOneSuccessAction(data) {
    return {
        type: LOAD_ONE_SUCCESS_ACTION,
        data,
    };
}
export function loadOneErrorAction(err) {
    return {
        type: LOAD_ONE_ERROR_ACTION,
        err,
    };
}

export function loadByTypeAction(data) {
    return {
        type: LOAD_BY_TYPE_ACTION,
        data,
    };
}
export function loadByTypeSuccessAction(data) {
    return {
        type: LOAD_BY_TYPE_SUCCESS_ACTION,
        data,
    };
}
export function loadByTypeErrorAction(err) {
    return {
        type: LOAD_BY_TYPE_ERROR_ACTION,
        err,
    };
}