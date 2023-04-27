// import React from 'react'
import Calendaricon from '../../Assets/images/Calendaricon.png';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import 'primeflex/primeflex.css';

function CalendarComponent() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [date3, setDate3] = useState(null);
    const [date4, setDate4] = useState(null);
    const [date5, setDate5] = useState(null);
    const [date6, setDate6] = useState(null);
    const [date7, setDate7] = useState(null);
    const [date8, setDate8] = useState(null);
    const [date9, setDate9] = useState(null);
    const [date10, setDate10] = useState(null);
    const [date11, setDate11] = useState(null);
    const [date12, setDate12] = useState(null);
    const [date13, setDate13] = useState(null);
    const [date14, setDate14] = useState(null);
    const [date15, setDate15] = useState(null);
    const [date16, setDate16] = useState(null);
    const [date17, setDate17] = useState(null);
    const [dates1, setDates1] = useState(null);
    const [dates2, setDates2] = useState(null);
    const [visible, setVisible] = useState(false);

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }

    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    const onVisibleChange = (e)=> {
        setVisible(e.type === 'dateselect' || !visible);
        if (e.callback) {
            e.callback();
        }
    }

//     return (
//         <div>
//             <div className="card">
//           <a> <img src={Calendaricon} alt="Calendar"/></a>

//                 <h5>Popup</h5>
//                 <div className="p-fluid p-grid p-formgrid">
                  
//                     <div className="p-field p-col-12 p-md-4">
//                         <label htmlFor="time24">Time / 24h</label>
//                         <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} timeOnly hourFormat="12" />
//                     </div>
//                     <div className="p-field p-col-12 p-md-4">
//                         <label htmlFor="time12">Time / 12h</label>
//                         <Calendar id="time12" value={date9} onChange={(e) => setDate9(e.value)} timeOnly hourFormat="12" />
//                     </div>
//                                   </div>
//             </div>
//         </div>
//     );
// } 
    return (
        <div>
           <a> <img src={Calendaricon} alt="Calendar"/></a>
            {/* <p>SetReminder</p> */}
            
        </div>
    )
}

export default CalendarComponent
