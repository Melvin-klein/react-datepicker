import React, {useContext} from 'react';
import DateContext from '../context/DateContext';
import withTableWrapper from '../hoc/withTableWrapper';
import moment from 'moment';

const DayView = props => {
    const {selectedDate, setSelectedDate} = useContext(DateContext);

    moment.locale(props.locale);

    const firstDayOfMonth = selectedDate.clone().startOf('month');
    const nbWeeksInCurrentMonth = Math.ceil((selectedDate.daysInMonth() + parseInt(firstDayOfMonth.isoWeekday() - 1)) / 7);

    const selectDate = dayIndex => {
        setSelectedDate(selectedDate.clone().set('date', dayIndex));
    };

    const getNameOfDays = () => {
        const cursor = moment().startOf('week');
        const names = [];

        for (let i = 0; i < 7; i++) {
            names.push(cursor.format('ddd'));
            cursor.add(1, 'day');
        }

        return names;
    }

    return (
        <React.Fragment>
            <tr>
                {
                    getNameOfDays().map(name => {
                        return (
                            <td key={name} className={props.customize.daysLabel}>{name}</td>
                        )
                    })
                }
            </tr>
            {
                [...Array(nbWeeksInCurrentMonth).keys()].map(weekIndex => {
                    return (
                        <tr key={weekIndex}>
                            {
                                [...Array(7).keys()].map(dayIndex => {
                                    const current = firstDayOfMonth.clone();

                                    if (current.isoWeekday() === dayIndex + 1) {
                                        firstDayOfMonth.add(1, 'day');
                                    }

                                    return (
                                        <React.Fragment key={weekIndex + "." + dayIndex}>
                                            {
                                                
                                                current.format('M') === selectedDate.format('M') && current.isoWeekday() === dayIndex + 1 ? (
                                                    <td className={props.customize.viewItem} onClick={() => selectDate(current.format('D'))}>{current.format('DD')}</td>
                                                ) : (
                                                    <td></td>
                                                )
                                            }
                                        </React.Fragment>
                                    );
                                })
                            }
                        </tr>
                    );
                })
            }
        </React.Fragment>
    );
}

export default withTableWrapper(DayView);