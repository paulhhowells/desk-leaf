import React from 'react';
import { DeskLeaf } from './DeskLeaf';

import type { CellData } from "./types";

export function Desk () {
    const [ cell, setCell ]= React.useState<CellData>();

    return (
        <div className="desk">
            <button type="button" onClick={ ()=> setCell({ rowId: 'A', field: '2', value: 'A2' }) }>A</button>
            <button type="button" onClick={ ()=> setCell({ rowId: 'B', field: '2', value: 'B2' }) }>B</button>
            <button type="button" onClick={ ()=> setCell({ rowId: 'B', field: '3', value: 'B3' }) }>C</button>

            <DeskLeaf cell={ cell } />
        </div>
    );
}