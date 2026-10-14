import { useReducer } from 'react';
import type { CellData } from './types';

export type Action = 
    | {
        type: 'store_values';
        cellKey: string;
        payload: {
            comment: string;
        };
    }
    | {
        type: 'cell_key_change';
        cellKey: string;
        payload: CellData;
    }
export type Store ={
    [key: string]: {
        comment: string;
    };
};
export type State = {
    store: Store;
};

const initialState = {
    store: {}
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        // Define your action handlers here
        case 'store_values': {
            return {
                ...state,
                store: {
                    ...state.store,
                    [action.cellKey]: action.payload
                }
            };
        }
        case 'cell_key_change': {
            if (action.cellKey in state.store === false) {
                // const cell = action.payload;
                const newState = {
                    ...state,
                    store: {
                        ...state.store,
                        [action.cellKey]: {
                            comment: action.payload.value
                        }
                    }
                };
                
                return newState;
            }
            return state;
        }
        default:
            return state;
    }
};

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const store: Store = state.store;

    console.log('useStore state', state);


    return { 
        store,
        dispatch,  
    };
};
