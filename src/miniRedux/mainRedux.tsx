export let state : object = {
    name: 'Nguyen Hai Long',
    userName: 'anonyhostvn'
};

export const getState = () : Object => state;

export const changeState = (newState : Object) => {
    state = {...state, ...newState};
};