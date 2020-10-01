import React from "react";
import moment from "moment";
import "./calendar.css";



export default class  extends React.Component {
  state = {
    dateContext: moment(),
    today: moment (),
    showMonthPopup: false,
    showYearPopup: false,
    }  
  
  constructor (props) {
      super(props);
      this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  }
  month = () => {
    return this.state.dateContext.format("MMMM");
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
 currentDate = () => {
    return this.state.dateContext.get("date");
  }
currentDay = () => {
    return this.state.dateContext.format("D");
  }

firstDayofMonth = () => {
   let dateContext = this.state.dateContext; 
   let firstDay = moment(dateContext).startOf("month").format("d");
   return firstDay;
}  

  
 render () {
   let weekdays = this.weekdaysShort.map((day) => {
     return (
<td key = {day} className = "week-day"> {day}
</td>
)
     });

     let blanks = [];
     for (let i =0; i <this.firstDayofMonth(); i++){
blanks.push (<td key = {i*80}className= "emptySlot">{""}
</td>
);
     }
console.log ("blanks: ", blanks);

let daysInMonth = [];
for (let d =1; d< this.daysInMonth(); d++ ){
  let className = (d === this.currentDay() ? "day current-day": "day");
  daysInMonth.push (
    <td key={d} className={className} >    
    <span>{d} 
    </span>
    </td>
  );
}

console.log("days: ", daysInMonth);

var totalSlots = [...blanks, ...daysInMonth];
let rows = [];
let cells = [];

totalSlots.forEach((row, i) => {
if ((i % 7) !== 0){
cells.push(row);
} else {
  let insertRow = cells.slice();
  rows.push(insertRow);
  cells = [];
  cells.push(row);
}
if (i === totalSlots.length -1){
let insertRow = cells.slice();
rows.push(insertRow);
}
});

let trElems = rows.map((d,i) => {
return (
  <tr key = {i*100}>
{d}

  </tr>
);
})
   
   return(
     <div className = "calendar-container" style={this.style}>
       <table className = "calendar">
         <thead>
<tr className = "calendar-header">
  </tr>

         </thead> 
         <tbody>
           <tr>
{weekdays}

           </tr>
           {trElems}
         </tbody>
       </table>
     </div>
   );
 }
}