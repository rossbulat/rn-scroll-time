export const defaultScheduleValues = (schedule: any) => {

  if (schedule === undefined) {
    return {
      enabled: false,
      scheduleTimelocal: 0
    };

  } else {
    schedule.scheduleTimeLocal !== undefined
      ? schedule.scheduleTimelocal
      : 0;

    schedule.enabled !== undefined
      ? schedule.enabled
      : false;

    return schedule;
  }
}