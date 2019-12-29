import React, {useState, useEffect, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayView from './components/DayView';
import MonthView from './components/MonthView';
import YearView from './components/YearView';
import DateContext from './context/DateContext';

const DAY_DIMENSION = 'days';
const MONTH_DIMENSION = 'months';
const YEAR_DIMENSION = 'years';

const Datepicker = props => {
    const [selectedDate, setSelectedDate] = useState(props.defaultValue);
    const [dimension, setDimension] = useState(props.defaultDimension);
    const firstRender = useRef(true);

    selectedDate.locale(props.locale);

    useEffect(() => {
        props.onChange(selectedDate, dimension);

        if (!firstRender.current) {
            switch (dimension) {
                case YEAR_DIMENSION:
                    setDimension(MONTH_DIMENSION);
                    break;
                case MONTH_DIMENSION:
                    setDimension(DAY_DIMENSION);
                    break;
                default:
                    setDimension(DAY_DIMENSION);
            }
        }

        firstRender.current = false;
    }, [selectedDate]);

    const setContextSelectedDate = date => {
        setSelectedDate(date);
    }

    const View = props => {
        switch(props.dimension) {
            case DAY_DIMENSION:
                return <DayView {...props} />
            case MONTH_DIMENSION:
                return <MonthView {...props} />
            case YEAR_DIMENSION:
                return <YearView {...props} />
            default:
                return <DayView {...props} />
          }
    }

    return (
        <div className={props.customize.datepickerContainer}>
            <DateContext.Provider value={{selectedDate, setSelectedDate: setContextSelectedDate}}>
                <div className={props.customize.dimensionContainer}>
                    <span className={props.customize.dimensionText + '' + (dimension === DAY_DIMENSION ? ' ' + props.customize.dimensionTextActive : '')} onClick={() => setDimension(DAY_DIMENSION)}>{selectedDate.format('DD')}</span>&nbsp;
                    <span className={props.customize.dimensionText + '' + (dimension === MONTH_DIMENSION ? ' ' + props.customize.dimensionTextActive : '')} onClick={() => setDimension(MONTH_DIMENSION)}>{selectedDate.format('MMMM')}</span>&nbsp;
                    <span className={props.customize.dimensionText + '' + (dimension === YEAR_DIMENSION ? ' ' + props.customize.dimensionTextActive : '')} onClick={() => setDimension(YEAR_DIMENSION)}>{selectedDate.format('YYYY')}</span>&nbsp;
                </div>
                <View dimension={dimension} customize={props.customize} locale={props.locale} />
            </DateContext.Provider>
        </div>
    )
}

Datepicker.propTypes = {
    defaultValue: PropTypes.instanceOf(moment),
    defaultDimension: PropTypes.string,
    locale: PropTypes.string,
    customize: PropTypes.object,
    onChange: PropTypes.func
}

Datepicker.defaultProps = {
    defaultValue: moment(),
    defaultDimension: "days",
    locale: 'en',
    customize: {},
    onChange: () => {}
}

export default Datepicker;