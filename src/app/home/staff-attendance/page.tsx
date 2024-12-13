/*
  lỗi: Chuyển absent sang các trạng thái khác phải nhập thời gian, không thì không chuyển
  khi  đang có status mà xóa hết thời gian thì không chuyển thành not started được
*/

"use client";
import { useState, useCallback, useMemo, use, useEffect } from "react";
import DatePicker from "react-datepicker";

import {
  getFirstDayOfWeek,
  formatDateToReactComponent,
  formatDateToYYYYMMDD,
  formatToDDMMYYYY,
} from "@/utils/timeUtils";

import "./Attendance.css";
import "react-datepicker/dist/react-datepicker.css";

import { getAllWorkAttendances, updateWorkAttendance, WorkAttendanceEntity } from "@/app/api-client/WorkAttendanceService";
import { UpdateWorkAttendanceRequest } from "@/app/api-client/WorkAttendanceService";
import { getAll, ShiftEntity } from "@/app/api-client/ShiftService";

const daysOfWeek = [
  { id: 0, name: "SUN" },
  { id: 1, name: "MON" },
  { id: 2, name: "TUE" },
  { id: 3, name: "WED" },
  { id: 4, name: "THU" },
  { id: 5, name: "FRI" },
  { id: 6, name: "SAT" },
];

const sampleShifts: ShiftEntity[] = [
  {
    id: 101,
    name: "Day",
    startTime: "08:00",
    endTime: "16:00",
    status: "active",
  },
  {
    id: 102,
    name: "Night",
    startTime: "16:00",
    endTime: "00:00",
    status: "active",
  },
  {
    id: 103,
    name: "Morning",
    startTime: "08:00",
    endTime: "12:00",
    status: "active",
  },
  {
    id: 104,
    name: "Afternoon",
    startTime: "12:00",
    endTime: "16:00",
    status: "active",
  },
];

const sampleWorkAttendances: WorkAttendanceEntity[] = [
  {
    id: 1,
    workScheduleId: 1,
    checkInTime: "",
    checkOutTime: "",
    status: "NOT_STARTED_YET",
    note: "",
    workSchedule: {
      id: 1,
      userId: 1,
      shiftId: 101,
      date: "2024-12-03",
      user: {
        id: 1,
        name: "Johny Đặng",
        email: "johny.dang@example.com",
        phoneNumber: "123456789",
        gender: "Male",
        dateOfBirth: "1990-01-01",
        roleId: 1,
        cccd: "123456789",
        cvImg: "path/to/cvImg.jpg",
        position: "Chef",
        salaryType: "Hourly",
        salaryPerHour: 15,
        salaryPerMonth: 0,
        role: {
          id: 3,
          name: "Chef",
          description: "Đầu bếp",
        },
        password: ""
      },
      shift: {
        id: 101,
        name: "Day",
        startTime: "08:00",
        endTime: "16:00",
        status: "active",
      },
    },
  },
  {
    id: 2,
    workScheduleId: 3,
    checkInTime: "08:00",
    checkOutTime: "16:00",
    status: "ON_TIME",
    note: "",
    workSchedule: {
      id: 3,
      userId: 1,
      shiftId: 101,
      date: "2024-12-02",
      user: {
        id: 1,
        name: "Johny Đặng",
        email: "johny.dang@example.com",
        phoneNumber: "123456789",
        gender: "Male",
        dateOfBirth: "1990-01-01",
        roleId: 1,
        cccd: "123456789",
        cvImg: "path/to/cvImg.jpg",
        position: "Chef",
        salaryType: "Hourly",
        salaryPerHour: 15,
        salaryPerMonth: 0,
        role: {
          id: 3,
          name: "Chef",
          description: "Đầu bếp",
        },
        password: ""
      },
      shift: {
        id: 101,
        name: "Day",
        startTime: "08:00",
        endTime: "16:00",
        status: "active",
      },
    },
  },
  {
    id: 3,
    workScheduleId: 2,
    checkInTime: "",
    checkOutTime: "",
    status: "ABSENT",
    note: "",
    workSchedule: {
      id: 2,
      userId: 2,
      shiftId: 102,
      date: "2024-12-05",
      user: {
        id: 2,
        name: "Cong Phuong Nguyen",
        email: "cong.phuong@example.com",
        phoneNumber: "987654321",
        gender: "Male",
        dateOfBirth: "1992-05-15",
        roleId: 2,
        cccd: "987654321",
        cvImg: "path/to/cvImg.jpg",
        position: "Waiter",
        salaryType: "Hourly",
        salaryPerHour: 12,
        salaryPerMonth: 0,
        role: {
          id: 2,
          name: "Waiter",
          description: "Phục vụ",
        },
        password: ""
      },
      shift: {
        id: 102,
        name: "Night",
        startTime: "16:00",
        endTime: "00:00",
        status: "active",
      },
    },
  },
  {
    id: 4,
    workScheduleId: 4,
    checkInTime: "12:10",
    checkOutTime: "16:00",
    status: "LATE_OR_LEAVE_EARLY",
    note: "",
    workSchedule: {
      id: 4,
      userId: 3,
      shiftId: 104,
      date: "2024-12-04",
      user: {
        id: 3,
        name: "Alexander Kiên Phạm",
        email: "alexander.kien@example.com",
        phoneNumber: "456123789",
        gender: "Male",
        dateOfBirth: "1988-07-22",
        roleId: 4,
        cccd: "456123789",
        cvImg: "path/to/cvImg.jpg",
        position: "Bartender",
        salaryType: "Hourly",
        salaryPerHour: 14,
        salaryPerMonth: 0,
        role: {
          id: 4,
          name: "Bartender",
          description: "Pha chế",
        },
        password: ""
      },
      shift: {
        id: 104,
        name: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        status: "active",
      },
    },
  },
  {
    id: 5,
    workScheduleId: 5,
    checkInTime: "12:10",
    checkOutTime: "",
    status: "NOT_YET_CLOCKED_OUT",
    note: "",
    workSchedule: {
      id: 5,
      userId: 4,
      shiftId: 104,
      date: "2024-12-05",
      user: {
        id: 4,
        name: "Nguyen Van A",
        email: "nguyen.van.a@example.com",
        phoneNumber: "321654987",
        gender: "Male",
        dateOfBirth: "1995-03-10",
        roleId: 5,
        cccd: "321654987",
        cvImg: "path/to/cvImg.jpg",
        position: "Cleaner",
        salaryType: "Hourly",
        salaryPerHour: 10,
        salaryPerMonth: 0,
        role: {
          id: 5,
          name: "Cleaner",
          description: "Dọn dẹp",
        },
        password: ""
      },
      shift: {
        id: 104,
        name: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        status: "active",
      },
    },
  },
];

const mapStatus = (status: string) => {
  switch (status) {
    case "PRESENT":
      return "Có làm"
    case "ABSENT":
      return "Nghỉ làm";
    case "NOT_STARTED_YET":
      return "Chưa đến giờ làm việc";
    case "ON_TIME":
      return "Đúng giờ";
    case "LATE_OR_LEAVE_EARLY":
      return "Đi muộn | Về sớm";
    case "NOT_YET_CLOCKED_OUT":
      return "Chưa chấm ra";
    case "NOT_YET_CLOCKED_IN":
      return "Chưa chấm vào";
    default:
      return "Không xác định";
  }
};

const mapStatusToClassName = (status: string) => {
  switch (status) {
    case "NOT_YET_CLOCKED_OUT":
      return "atte-btn progress-btn";
    case "NOT_YET_CLOCKED_IN":
      return "atte-btn progress-btn";
    case "ON_TIME":
      return "atte-btn on-time-btn";
    case "LATE_OR_LEAVE_EARLY":
      return "atte-btn violated-btn";
    case "ABSENT":
      return "atte-btn absent-btn";
    default:
      return "atte-btn";
  }
};

export default function AttendancePage() {
  const [workAttendances, setWorkAttendances] = useState<
    WorkAttendanceEntity[]
  >([]);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false); // Mở lịch chọn ngày

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false); // Mở modal

  const [displayDate, setDisplayDate] = useState<Date>(
    getFirstDayOfWeek(new Date())
  );

  const [selectedAttendance, setSelectedAttendance] =
    useState<WorkAttendanceEntity>(null);

  const [gotoWork, setGotoWork] = useState<boolean>(false);

  const [checkInTime, setCheckInTime] = useState<string>("");

  const [checkOutTime, setCheckOutTime] = useState<string>("");

  const [note, setNote] = useState<string>("");

  const [shifts, setShifts] = useState<ShiftEntity[]>([]);

  const [displayShifts, setDisplayShifts] =
    useState<ShiftEntity[]>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    getAll().then((res) => {
      console.log(res)
      const formattedShifts: ShiftEntity[] = res.map((shift) => ({
        ...shift,
        startTime: shift.startTime.slice(0, 5),
        endTime: shift.endTime.slice(0, 5),
      }));
      setShifts(formattedShifts);
      setDisplayShifts(formattedShifts);
    });
  }, []);

  useEffect(() => {
    /* gọi API **/
    const startDate = formatDateToYYYYMMDD(displayDate);
    const endDate = formatDateToYYYYMMDD(
      new Date(new Date(displayDate).setDate(displayDate.getDate() + 6))
    );
    const query = `start_date=${startDate}&end_date=${endDate}`;
    // const response = getAllWorkAttendances(query);
    // if (response.ok) {
    //   setWorkAttendances(response.data);
    // }
    getAllWorkAttendances(query).then((res) => {
      console.log(res)
      setWorkAttendances(res);
    });
  }, [displayDate, shifts]);

  const handleDateChange = (date: Date) => {
    setDisplayDate(getFirstDayOfWeek(date));
    setIsOpenDatePicker(false);
  };

  const onNextClick = () => {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() + 7)));
  };

  const onPrevClick = () => {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() - 7)));
  };

  const onThisWeekClick = () => {
    setDisplayDate(getFirstDayOfWeek(new Date()));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput) {
        const regex = new RegExp(searchInput, "i");
        const newDisplayShifts = shifts.filter((shift) =>
          regex.test(shift.name)
        );
        setDisplayShifts(newDisplayShifts);
      } else {
        setDisplayShifts(shifts);
      }
    }
  };

  const openModal = (attendance: WorkAttendanceEntity) => {
    setSelectedAttendance(attendance);
    setGotoWork(
      !(attendance.status === "ABSENT")
    );
    setCheckInTime(attendance.checkInTime);
    setCheckOutTime(attendance.checkOutTime);
    setNote(attendance.note);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedAttendance(null);
    setCheckInTime("");
    setCheckOutTime("");
    setNote("");
    setGotoWork(false);
  };

  const saveModal = (e) => {
    e.preventDefault();
    setIsOpenModal(false)
    setNote("");
    /* gọi API **/
    const payload: UpdateWorkAttendanceRequest = {
      checkInTime: gotoWork ? (checkInTime ? checkInTime : undefined) : undefined,
      checkOutTime: gotoWork ? (checkOutTime ? checkOutTime : undefined) : undefined,
      status: gotoWork ? "NOT_STARTED_YET" : "ABSENT",
      //status: gotoWork ? selectedAttendance.status : "ABSENT",
      note: note ? note : undefined,
    };
    // const reponse = updateWorkAttendance (selectedAttendance.id, payload);
    // ìf (response.ok) {
    try {
      updateWorkAttendance(selectedAttendance.id, payload).then((res) => {
        console.log("update: ", res)
        // console.log("updated");
        // const newAttendance = {
        //   ...selectedAttendance,
        //   checkInTime,
        //   checkOutTime,
        //   note,
        //   status: "ON_TIME",
        // };
        // const newWorkAttendances = workAttendances.map((attendance) =>
        //   attendance.id === newAttendance.id ? newAttendance : attendance
        // );
        // setWorkAttendances(newWorkAttendances);
        // closeModal();
        setShifts((prev) => [...prev]); //re useEffect to fetch workAttendances
      });
    } catch (error) {
      console.error(error);
    }

  };

  const displayWeek = useMemo(() => {
    const startDate = formatDateToReactComponent(displayDate);
    const endDate = formatDateToReactComponent(
      new Date(new Date(displayDate).setDate(displayDate.getDate() + 6))
    );
    return (
      <span>
        {startDate} - {endDate}
      </span>
    );
  }, [displayDate]);

  const formatDayToYYYYMMDD = (days: number) => {
    const newDate = new Date(displayDate);
    newDate.setDate(newDate.getDate() + days);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const searchByShiftIdAndDate = (shiftId: number, date: string) => {
    return workAttendances && workAttendances
      .filter(
        (attendance) =>
          attendance.workSchedule.shiftId === shiftId &&
          attendance.workSchedule.date === date
      )
      .sort((a, b) => a.workSchedule.userId - b.workSchedule.userId);
  };

  return (
    <section className="h-screen w-full p-6 bg-[#f5f5f5]">
      <div className="flex justify-between items-center mb-2">
        <div className="text-2xl font-extrabold ml-6">Bảng chấm công</div>
      </div>
      <div className="atte-table">
        <div className="h-[75px] flex items-center justify-between border-b">
          <div className="w-[280px] flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 ml-6 shadow-sm">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1011 17a6 6 0 006-6z"
              />
            </svg>
            <input
              className="p-2 bg-transparent outline-none grow"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tìm tên ca làm..."
            />
          </div>
          <div className="flex items-center gap-6 mr-6">
            <div className="flex items-center justify-between gap-1">
              <button
                onClick={onPrevClick}
                title="Tuần trước"
                className="border rounded-full h-8 w-8 flex justify-center items-center shadow-sm hover:bg-[#d4d4d4]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left text-base"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 6l-6 6l6 6" />
                </svg>
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsOpenDatePicker(!isOpenDatePicker)}
                  className={`w-[200px] h-8 rounded-2xl text-sm ${isOpenDatePicker ? "bg-[#fefefe] shadow-md" : ""
                    }`}
                >
                  {displayWeek}
                </button>
                {isOpenDatePicker && (
                  <div className="absolute top-10">
                    <DatePicker
                      selected={displayDate}
                      onChange={handleDateChange}
                      onClickOutside={() => setIsOpenDatePicker(false)}
                      inline
                    />
                  </div>
                )}
              </div>
              <button
                onClick={onNextClick}
                title="Tuần sau"
                className="border rounded-full h-8 w-8 flex justify-center items-center shadow-sm hover:bg-[#d4d4d4]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right text-base"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </button>
            </div>
            <button
              onClick={onThisWeekClick}
              className="text-center text-sm rounded-md h-9 w-24 shadow-sm border hover:bg-[#d4d4d4]"
            >
              Tuần này
            </button>
          </div>
        </div>

        <div className="atte-header">
          <div className="shift-cell">Ca làm việc</div>
          <div className="atte-cell">SUN</div>
          <div className="atte-cell">MON</div>
          <div className="atte-cell">TUE</div>
          <div className="atte-cell">WED</div>
          <div className="atte-cell">THU</div>
          <div className="atte-cell">FRI</div>
          <div className="atte-cell">SAT</div>
        </div>
        <div className="max-h-[540px] overflow-auto">
          {displayShifts.map((shift) => (
            <div key={shift.id} className="atte-row">
              <div className="shift-cell">
                <div>{shift.name}</div>
                <div className="text-[#8c8c8c] text-sm font-light">
                  {shift.startTime.slice(0, 5)} - {shift.endTime.slice(0, 5)}
                </div>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="atte-cell">
                  {searchByShiftIdAndDate(
                    shift.id,
                    formatDayToYYYYMMDD(day.id)
                  )?.map((attendance) => (
                    <button
                      key={attendance.id}
                      onClick={() => openModal(attendance)}
                      title={mapStatus(attendance.status)}
                      className={mapStatusToClassName(attendance.status)}
                    >
                      <div className="w-full flex gap-1 mb-0.5">
                        <div className="max-w-[90px] overflow-hidden text-nowrap">
                          {attendance.workSchedule.user.name}
                        </div>
                        <div className="overflow-hidden text-nowrap text-[#8c8c8c] text-sm font-light">
                          {attendance.workSchedule.user.position}
                        </div>
                      </div>
                      {(attendance.checkInTime || attendance.checkOutTime) && (
                        <div className="mb-0.5">
                          {attendance.checkInTime && attendance.checkInTime.slice(0, 5)} - {attendance.checkOutTime && attendance.checkOutTime.slice(0, 5)}
                        </div>
                      )}
                      <div>
                        {attendance.status === "LATE_OR_LEAVE_EARLY" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-clock text-sm text-[#FF4545]"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M12 7v5l3 3" />
                          </svg>
                        )}
                        {attendance.status === "ON_TIME" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-checks text-[#15B392] text-sm"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 12l5 5l10 -10" />
                            <path d="M2 12l5 5m5 -5l5 -5" />
                          </svg>
                        )}
                        {attendance.status === "ABSENT" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-off text-sm text-[#C62E2E]"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M11 7h8a2 2 0 0 1 2 2v8m-1.166 2.818a1.993 1.993 0 0 1 -.834 .182h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
                            <path d="M8.185 4.158a2 2 0 0 1 1.815 -1.158h4a2 2 0 0 1 2 2v2" />
                            <path d="M12 12v.01" />
                            <path d="M3 13a20 20 0 0 0 11.905 1.928m3.263 -.763a20 20 0 0 0 2.832 -1.165" />
                            <path d="M3 3l18 18" />
                          </svg>
                        )}
                        {(attendance.status === "NOT_YET_CLOCKED_OUT" ||
                          attendance.status === "NOT_YET_CLOCKED_IN") && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-progress-check text-sm text-[#37AFE1]"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
                              <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
                              <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
                              <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
                              <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
                              <path d="M9 12l2 2l4 -4" />
                            </svg>
                          )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <div className="mb-4">
              <div className="font-bold text-xl">
                {selectedAttendance.workSchedule.user.name}{" "}
                <span className="font-semibold text-base text-[#8c8c8c]">
                  ID: 000{selectedAttendance.workSchedule.user.id}{" "}
                </span>
              </div>
              <div className="font-light text-sm text-[#8c8c8c]">
                {selectedAttendance.workSchedule.user.position}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Tên ca làm</div>
              <div className="font-bold">
                {selectedAttendance.workSchedule.shift.name}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Giờ làm việc</div>
              <div className="font-bold w-20">
                {selectedAttendance.workSchedule.shift.startTime.slice(0, 5)}
              </div>
              <div className="w-16">Đến</div>
              <div className="font-bold w-28">
                {selectedAttendance.workSchedule.shift.endTime.slice(0, 5)}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Ngày làm việc</div>
              <div className="font-bold">
                {formatToDDMMYYYY(selectedAttendance.workSchedule.date)}
              </div>
            </div>
            <form onSubmit={(e) => saveModal(e)}>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[400px] h-24 mb-4">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="Ghi chú..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex items-end mb-4">
                <div className="font-bold text-xl w-32">Chấm công</div>
                <label className="space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() => setGotoWork(!gotoWork)}
                    checked={gotoWork}
                  />
                  <span>Đi làm</span>
                </label>
              </div>
              {gotoWork && (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-32">Giờ chấm vào</div>
                    <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-40">
                      <input
                        className="p-2 bg-transparent w-full outline-none"
                        type="text"
                        placeholder="hh:mm"
                        value={checkInTime && checkInTime.slice(0, 5)}
                        pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
                        onChange={(e) => setCheckInTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-32">Giờ chấm ra</div>
                    <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-40">
                      <input
                        className="p-2 bg-transparent w-full outline-none"
                        type="text"
                        placeholder="hh:mm"
                        value={checkOutTime && checkOutTime.slice(0, 5)}
                        pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
                        onChange={(e) => setCheckOutTime(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 items-center mt-10">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-[#333333] text-[#f7f7f7]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M14 4l0 4l-6 0l0 -4" />
                  </svg>
                  <div>Lưu</div>
                </button>
                <button
                  className="h-10 w-20 font-bold rounded"
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
