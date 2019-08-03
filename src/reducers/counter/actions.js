import $ from 'jquery';
import { LOAD_COUNTER } from "./types";

export function loadCounter() {
    return function(dispatch) {
        $.ajax("/counter", {
            method: "GET"
        }).then(function(data){
            dispatch({
                type: LOAD_COUNTER,
                data
            });
        });
    }
}

export function incrementCounter() {
    return function(dispatch) {
        $.ajax("/counter", {
            method: "POST"
        }).then(function(data){
            dispatch({
                type: LOAD_COUNTER,
                data
            });
        });
    }
}