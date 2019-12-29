import React, { useContext } from 'react';
import DateContext from '../context/DateContext';
import withTableWrapper from '../hoc/withTableWrapper';

const MonthView = props => {
    const {selectedDate, setSelectedDate} = useContext(DateContext);

    let date = selectedDate.clone().startOf('year');

    const selectDate = monthIndex => {
        setSelectedDate(selectedDate.clone().set('month', parseInt(monthIndex) - 1));
    };
    
    return (
        <React.Fragment>
            {
                [...Array(3).keys()].map(y => {
                    return (
                        <tr key={y}>
                            {
                                [...Array(4).keys()].map(x => {
                                    const current = date.clone();

                                    date.add(1, 'months');

                                    return (
                                        <td key={y + "." + x} className={props.customize.viewItem} onClick={() => selectDate(current.format('M'))}><div className={props.customize.viewItemText}>{current.format('MMM')}</div></td>
                                    );
                                })
                            }
                        </tr>
                    );
                })
            }
        </React.Fragment>
    )
};

export default withTableWrapper(MonthView);