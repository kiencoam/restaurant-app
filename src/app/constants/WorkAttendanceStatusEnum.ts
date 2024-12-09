enum WorkAttendanceStatusEnum {
    Present = "PRESENT",
    Absent = "ABSENT",
    OnTime = "ON_TIME",
    LateOrLeaveEarly = "LATE_OR_LEAVE_EARLY",
    NotYetClockedIn = "NOT_YET_CLOCKED_IN",
    NotYetClockedOut = "NOT_YET_CLOCKED_OUT",
    NotStartedYet = "NOT_STARTED_YET"
}

// logs "PRESENT"
console.log(WorkAttendanceStatusEnum.Present);
// logs "ABSENT"
console.log(WorkAttendanceStatusEnum.Absent);
// logs "ON_TIME"
console.log(WorkAttendanceStatusEnum.OnTime);
// logs "LATE_OR_LEAVE_EARLY"
console.log(WorkAttendanceStatusEnum.LateOrLeaveEarly);
// logs "NOT_YET_CLOCKED_IN"
console.log(WorkAttendanceStatusEnum.NotYetClockedIn);
// logs "NOT_YET_CLOCKED_OUT"
console.log(WorkAttendanceStatusEnum.NotYetClockedOut);
// logs "NOT_STARTED_YET"
console.log(WorkAttendanceStatusEnum.NotStartedYet);
