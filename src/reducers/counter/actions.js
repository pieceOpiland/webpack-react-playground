import axios from 'axios';
import { LOAD_COUNTER } from "./types";

export function loadCounter() {
    return function(dispatch) {
        axios("/counter", {
            method: "get"
        }).then(function(response){
            dispatch({
                type: LOAD_COUNTER,
                data: response.data
            });
        });
    }
}

export function incrementCounter() {
    return function(dispatch) {
        axios("/counter", {
            method: "post"
        }).then(function(response){
            dispatch({
                type: LOAD_COUNTER,
                data: response.data
            });
        });
    }
}