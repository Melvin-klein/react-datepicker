import React from 'react';
import {render} from 'react-dom';
import Datepicker from "../../src";

const classes = {
    datepickerContainer: 'inline-block',
    dimensionContainer: 'bg-green-500 text-center inline-block p-4 w-full',
    dimensionText: 'text-lg px-2 hover:text-purple-500',
    dimensionTextActive: 'bg-red-500 border-b-2 border-blue-500',
    daysLabel: 'py-2 text-center',
    viewItem: 'text-blue-500 hover:bg-yellow-500 p-4 cursor-pointer text-center',
}

const App = () => (
    <Datepicker customize={classes} locale="fr" defaultDimension="months" onChange={(date, dimension) => console.log('OnChnage : ', date, dimension)} />
);

render(<App />, document.getElementById("root"));