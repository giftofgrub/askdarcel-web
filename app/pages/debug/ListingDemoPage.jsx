import React from 'react';
import { RelativeOpeningTime } from '../../components/listing/RelativeOpeningTime';
import './ListingDemoPage.scss';

// Is sorted so that the first day is today
export const simpleScheduleLookup = {
  twenty_four_seven: [[0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359]],
  twenty_four_hours_today: [[0, 2359], null, null, null, null, null, null],
  closed_today: [null, [900, 1800], [900, 1800]],
  nine_to_six: [[900, 1800], [900, 1800], [900, 1800], [900, 1800], [900, 1800], [900, 1200]],
  random1: [[[915, 1130], [1300, 1800]], [900, 1800], [900, 1800], [900, 1800], [900, 1800], [900, 1200], [900, 1200]],
  random2: [[0, 2359], [900, 1800], [900, 1800], [900, 1800], [900, 1800], [900, 1200], [0, 2359]],
  random3: [[0, 900], [900, 1800], [900, 1800], [900, 1800], [900, 1800], [900, 1200], null], // Closed all sunday, 24h Mon
  random4: [[200, 1800], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2125]],
  random5: [[0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [2155, 2300]],
  random6: [[0, 1100], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [2155, 2300]],
  random7: [[1000, 2300], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], null],
  random8: [[[2330, 1200], [1800, 2000], [2200, 2359]], null, [0, 2359], [0, 2359], [0, 2359], [0, 2359], [900, 2200]],
  closes_tomorrow: [[1800, 900], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [0, 2359], [[0, 900], [1100, 1800], [1900, 2300]]],
};

export const simpleSchedules = Object.values(simpleScheduleLookup);

export class ListingDebugPage extends React.Component {
  static createScheduleFromShorthand(shedule_shorthand) {
    const today = new Date().getDay();
    const daysOfWeek = RelativeOpeningTime.daysOfWeek.slice();
    const todayAndAfter = daysOfWeek.splice(today);
    const orderedDaysOfTheWeek = todayAndAfter.concat(daysOfWeek);
    // console.log('putting today first', today, orderedDaysOfTheWeek, { daysOfWeek, todayAndAfter });
    const schedules = shedule_shorthand.map(sched => {
      const days = [];
      sched.forEach((day, i) => {
        if (day === null) { return; }
        const instancesOfToday = Array.isArray(day[0]) ? day : [day];
        instancesOfToday.forEach(times => {
          days.push({
            day: orderedDaysOfTheWeek[i],
            opens_at: times[0],
            closes_at: times[1],
            id: i,
          });
        });
      });
      return days;
    }).map((schedule_days, i) => ({ schedule_days, id: i }));

    return schedules;
  }

  render() {
    const schedules = ListingDebugPage.createScheduleFromShorthand(simpleSchedules);
    return (
      <div className="demo-page">
        <h1>RelativeOpeningTime</h1>
        { schedules.map(schedule => (
          <p>
            <RelativeOpeningTime key={schedule.id} schedule={schedule} />
            {/* <pre>{ JSON.stringify(schedule, null, 2) }</pre> */}
          </p>
        )) }
      </div>
    );
  }
}
