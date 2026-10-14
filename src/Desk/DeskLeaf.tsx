import React from 'react';
import {
    useForm,
    useSelector,
} from '@tanstack/react-form';

import { useStore } from './useStore';
import type { CellData } from "./types";

const defaultValues = {
    comment: '',
};

interface Props {
    cell?: CellData;
}

export function DeskLeaf ({ cell }: Props) {
    const cellKey = cell 
        ? `${cell.rowId}-${cell.field}` 
        : undefined;
    const form = useForm({
        defaultValues: defaultValues,
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log('onSubmit value', value);

            console.log('onSubmit cell', cell);
        },
        // listeners:{
        //     onChange: async ( value ) => {
        //         // Do something with form data
        //         console.log('onChange value', value);
        //     }
        // }
    });
    const commentField = useSelector(form.store, (state) => state.values.comment);
    const formValues = useSelector(form.store, (state) => state.values);
    const { store, dispatch } = useStore();

    React.useEffect(() => {
        console.log('useEffect', cellKey, formValues);

        if (cellKey !== undefined && cell !== undefined) {
            console.log('useEffect do stuff', cellKey, cell);

            if (cellKey in store === true) {
                console.log('useEffect is store ready?', cellKey, store[cellKey]);

                form.setFieldValue('comment', store[cellKey].comment);
            } else {
                // this should only happen once for each cellKey
                form.setFieldValue('comment', cell.value);

                // data prop has changed, not the form
                dispatch({
                    type: 'cell_key_change',
                    cellKey,
                    payload: cell,
                });
            }
        }

        return () => {
          console.log('exit useEffect', cellKey, formValues);  // updateStore();
        
        //   if (cellKey !== undefined) {
        //     dispatch({
        //         type: 'store_values',
        //         cellKey: cellKey,
        //         payload: formValues,
        //     });
        //     }
        };
    }, [ cellKey, cell?.value ]);

    //     useEffect(() => {
    //     if (cellKey !== undefined && cell !== undefined) {
    //         form.setFieldValue('comment', cell.value);
    //     }
    // }, [cellKey, cell?.value, form]);

    const handleSubmit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        form.handleSubmit();
    };

    return (
        <div className="desk__leaf">
            <form>
                <form.Field
                    name="comment"
                    children={(field) => (
                        <>
                            <input
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(ev) => field.handleChange(ev.target.value)}
                            />
                        </>
                    )}
                     listeners={{
                        onChange: async ( { value, fieldApi } ) => {
                            // Do something with form data
                            console.log('L onChange value', value, fieldApi.name);
                            
                            if (cellKey !== undefined) {
                                dispatch({
                                    type: 'store_values',
                                    cellKey: cellKey,
                                    payload: {
                                        comment: value
                                    }
                                });
                            }
                        }
                     }}
                />
                <button type="submit" onClick={ handleSubmit }>Submit { commentField }</button>
            </form>
            <pre>{ JSON.stringify(cell) }</pre>
        </div>
    );
}

// useEffect(() => {
//   return form.store.subscribe(() => {
//     console.log(form.store.state.values);
//   });
// }, [form.store]);
