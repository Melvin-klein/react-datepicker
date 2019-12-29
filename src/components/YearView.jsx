import React, { useContext } from 'react';
import DateContext from '../context/DateContext';
import withTableWrapper from '../hoc/withTableWrapper';
import moment from 'moment';

const YearView = props => {
    const {selectedDate, setSelectedDate} = useContext(DateContext);

    let date = moment();

    const selectDate = year => {
        setSelectedDate(selectedDate.clone().set('year', year));
    };
    
    return (
        <React.Fragment>
            {
                [...Array(2).keys()].map(y => {
                    return (
                        <tr key={y}>
                            {
                                [...Array(2).keys()].map(x => {
                                    const current = date.clone();

                                    date.add(1, 'years');

                                    return (
                                        <td key={y + "." + x} className={props.customize.viewItem} onClick={() => selectDate(current.format('YYYY'))}><div className={props.customize.viewItemText}>{current.format('YYYY')}</div></td>
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

export default withTableWrapper(YearView);