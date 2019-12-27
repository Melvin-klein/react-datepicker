import React from 'react';
import moment from 'moment';

export default React.createContext({
    selectedDate: moment(),
    setSelectedDate: () => {}
});