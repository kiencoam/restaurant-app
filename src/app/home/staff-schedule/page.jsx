"use client";
import { useState, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";

import "./StaffSchedule.css";
import "react-datepicker/dist/react-datepicker.css";

const daysOfWeek = [
  { id: 0, name: "SUN" },
  { id: 1, name: "MON" },
  { id: 2, name: "TUE" },
  { id: 3, name: "WED" },
  { id: 4, name: "THU" },
  { id: 5, name: "FRI" },
  { id: 6, name: "SAT" },
];

const sampleWorkSchedules = [
  {
    id: 1,
    userId: 1,
    shiftId: 101,
    date: "2024-11-15",
    user: "John Doe",
    shift: { id: 101, name: "Day", startTime: "08:00", endTime: "16:00" },
  },
  {
    id: 2,
    userId: 2,
    shiftId: 102,
    date: "2024-11-15",
    user: "Jane Smith",
    shift: { id: 102, name: "Night", startTime: "16:00", endTime: "00:00" },
  },
  {
    id: 3,
    userId: 1,
    shiftId: 101,
    date: "2024-11-16",
    user: "John Doe",
    shift: { id: 101, name: "Day", startTime: "08:00", endTime: "16:00" },
  },
];

const users = [
  {
    userId: 1,
    user: "Johny Đặng",
    role: "Chef",
  },
  {
    userId: 2,
    user: "Mary Jane",
    role: "Waiter",
  },
  {
    userId: 3,
    user: "Cristiano Ronaldo",
    role: "Receptionist",
  },
  {
    userId: 4,
    user: "Alexander Kiên Phạm",
    role: "Bartender",
  },
  {
    userId: 5,
    user: "Cong Phuong Nguyen",
    role: "Chef",
  },
  {
    userId: 6,
    user: "Antony Nguyễn",
    role: "Waiter",
  },
];

const sampleShifts = [
  { id: 101, name: "Day", startTime: "08:00", endTime: "16:00" },
  { id: 102, name: "Night", startTime: "16:00", endTime: "00:00" },
  { id: 103, name: "Morning", startTime: "08:00", endTime: "12:00" },
  { id: 104, name: "Afternoon", startTime: "12:00", endTime: "16:00" },
];

function getFirstDayOfWeek(date) {
  const firstDayOffset = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDay = new Date(date); // Clone the date object
  firstDay.setDate(date.getDate() - firstDayOffset); // Set the date to the previous Sunday
  return firstDay;
}

function formatDateToReactComponent(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Define month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero
  const month = monthNames[date.getMonth()]; // Get month name from monthNames array
  const year = date.getFullYear();

  // Format the date as "DD Month YYYY"
  return (
    <span>
      <span className="text-[#8c8c8c]">{day}</span> {month}{" "}
      <span className="text-[#8c8c8c]">{year}</span>
    </span>
  );
}

export default function StaffSchedulePage() {
  const [workSchedules, setWorkSchedules] = useState(sampleWorkSchedules);

  const [shifts, setShifts] = useState(sampleShifts);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false); // Mở lịch chọn ngày

  const [isAddShifts, setIsAddShifts] = useState(false); // Mở modal thêm ca làm cho nhân viên

  const [isShiftsList, setIsShiftsList] = useState(false); // Mở modal danh sách ca làm

  const [isCreateShift, setIsCreateShift] = useState(false); // Mở modal tạo ca làm mới

  const [isEditShift, setIsEditShift] = useState(false); // Mở modal chỉnh sửa thông tin ca làm

  const [isDetailShift, setIsDetailShift] = useState(false); // Mở modal chi tiết ca làm

  const [displayDate, setDisplayDate] = useState(getFirstDayOfWeek(new Date()));

  const [user, setUser] = useState(null); // State lưu nhân viên đang được chọn

  const [chosenDate, setChosenDate] = useState(""); // State lưu ngày đang được chọn

  const [chosenShifts, setChosenShifts] = useState(new Set()); // State lưu các ca làm đang được chọn ở mục Thêm ca

  const [workScheduleId, setWorkScheduleId] = useState(0); // State lưu ID của lịch làm việc đang được chọn

  const [shiftId, setShiftId] = useState(0); // State lưu ID của ca làm đang được chọn

  const [shiftName, setShiftName] = useState(""); // State lưu tên ca làm đang được chọn

  const [startTime, setStartTime] = useState(""); // State lưu giờ bắt đầu của ca làm đang được chọn

  const [endTime, setEndTime] = useState(""); // State lưu giờ kết thúc của ca làm đang được chọn

  const handleDateChange = useCallback((date) => {
    setDisplayDate(getFirstDayOfWeek(date));
    setIsOpenDatePicker(false);
  }, []);

  const onNextClick = useCallback(() => {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() + 7)));
  }, [displayDate]);

  const onPrevClick = useCallback(() => {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() - 7)));
  }, [displayDate]);

  const onThisWeekClick = useCallback(() => {
    setDisplayDate(getFirstDayOfWeek(new Date()));
  }, []);

  const openAddShifts = useCallback((user, date) => {
    setUser(user);
    setChosenDate(date);
    setIsAddShifts(true);
  }, []);

  const handleChosenShifts = useCallback(
    (e) => {
      const newChosenShifts = new Set(chosenShifts);
      if (e.target.checked) {
        newChosenShifts.add(e.target.value);
      } else {
        newChosenShifts.delete(e.target.value);
      }
      setChosenShifts(newChosenShifts);
    },
    [chosenShifts]
  );

  const closeAddShifts = useCallback(() => {
    setIsAddShifts(false);
    setChosenShifts(new Set());
  }, []);

  const saveAddShifts = useCallback(() => {
    /* Gọi API */
    const chosenShiftsList = [...chosenShifts];
    const newWorkSchedules = chosenShiftsList.map((shiftId) => {
      return {
        id: workSchedules.length + shiftId,
        userId: user.userId,
        shiftId: shiftId,
        date: chosenDate,
        user: user.user,
        shift: shifts.filter((shift) => shift.id == shiftId)[0],
      };
    });
    setWorkSchedules([...workSchedules, ...newWorkSchedules]);
    closeAddShifts();
  }, [chosenShifts, chosenDate, shifts, user, workSchedules]);

  const saveCreateShift = useCallback(() => {
    /* Gọi API */
    const newShift = {
      id: shifts.length + 1,
      name: shiftName,
      startTime: startTime,
      endTime: endTime,
    };
    setShifts([...shifts, newShift]);
    closeCreateShift();
  }, [shiftName, startTime, endTime, shifts]);

  const closeCreateShift = useCallback(() => {
    setIsCreateShift(false);
    setShiftName("");
    setStartTime("");
    setEndTime("");
  }, []);

  const openEditShift = useCallback(
    (shiftId, shiftName, startTime, endTime) => {
      setShiftId(shiftId);
      setShiftName(shiftName);
      setStartTime(startTime);
      setEndTime(endTime);
      setIsEditShift(true);
    },
    []
  );

  const saveEditShift = useCallback(() => {
    /* Gọi API */
    const newShifts = shifts.map((shift) =>
      shift.id === shiftId
        ? {
            id: shiftId,
            name: shiftName,
            startTime: startTime,
            endTime: endTime,
          }
        : shift
    );
    setShifts(newShifts);

    const newWorkSchedules = workSchedules.map((schedule) =>
      schedule.shiftId === shiftId
        ? {
            ...schedule,
            shift: {
              id: shiftId,
              name: shiftName,
              startTime: startTime,
              endTime: endTime,
            },
          }
        : schedule
    );
    setWorkSchedules(newWorkSchedules);
    closeEditShift();
  }, [shiftId, shiftName, startTime, endTime, shifts, workSchedules]);

  const closeEditShift = useCallback(() => {
    setIsEditShift(false);
    setShiftId(0);
    setShiftName("");
    setStartTime("");
    setEndTime("");
  }, []);

  const deleteShift = useCallback(
    (shiftId) => {
      /* Gọi API */
      const newShifts = shifts.filter((shift) => shift.id !== shiftId);
      setShifts(newShifts);

      const newWorkSchedules = workSchedules.filter(
        (schedule) => schedule.shiftId !== shiftId
      );
      setWorkSchedules(newWorkSchedules);
    },
    [shifts, workSchedules]
  );

  const openDetailShift = useCallback(
    (id, employee, day, shiftName, startTime, endTime) => {
      setWorkScheduleId(id);
      setUser(employee);
      setChosenDate(formatDayToYYYYMMDD(day));
      setShiftName(shiftName);
      setStartTime(startTime);
      setEndTime(endTime);
      setIsDetailShift(true);
    },
    []
  );

  const closeDetailShift = useCallback(() => {
    setIsDetailShift(false);
    setWorkScheduleId(0);
    setUser(null);
    setChosenDate("");
    setShiftName("");
    setStartTime("");
    setEndTime("");
  }, []);

  const deleteWorkSchedule = useCallback(() => {
    /* Gọi API */
    const newWorkSchedules = workSchedules.filter(
      (schedule) => schedule.id !== workScheduleId
    );
    setWorkSchedules(newWorkSchedules);
    closeDetailShift();
  }, [workScheduleId, workSchedules]);

  const displayWeek = useMemo(() => {
    const startDate = formatDateToReactComponent(displayDate);
    const endDate = formatDateToReactComponent(
      new Date(displayDate).setDate(displayDate.getDate() + 6)
    );
    return (
      <span>
        {startDate} - {endDate}
      </span>
    );
  }, [displayDate]);

  const formatDayToYYYYMMDD = useCallback(
    (days) => {
      const newDate = new Date(displayDate);
      newDate.setDate(newDate.getDate() + days);

      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    [displayDate]
  );

  const searchByUserIdAndDay = useCallback(
    (userId, date) => {
      return workSchedules
        .filter(
          (schedule) => schedule.userId === userId && schedule.date === date
        )
        .sort((a, b) => {
          {
            const [aHours, aMinutes] = a.shift.startTime.split(":").map(Number);
            const [bHours, bMinutes] = b.shift.startTime.split(":").map(Number);

            const aTotalMinutes = aHours * 60 + aMinutes;
            const bTotalMinutes = bHours * 60 + bMinutes;

            return aTotalMinutes - bTotalMinutes;
          }
        });
    },
    [workSchedules]
  );

  return (
    <section className="h-screen w-full p-6 bg-[#f5f5f5]">
      <div className="flex justify-between items-center mb-2">
        <div className="text-2xl font-extrabold ml-6">Lịch làm việc</div>
        <button
          onClick={() => setIsShiftsList(true)}
          className="flex items-center rounded-md px-2 shadow-sm bg-[#333333] hover:bg-[hsl(0,0%,25%)] active:bg-[hsl(0,0%,30%)]"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-list w-4 h-4 text-white"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l11 0" />
            <path d="M9 12l11 0" />
            <path d="M9 18l11 0" />
            <path d="M5 6l0 .01" />
            <path d="M5 12l0 .01" />
            <path d="M5 18l0 .01" />
          </svg>
          <div className="p-2 text-sm text-white">Danh sách ca làm</div>
        </button>
      </div>
      <div className="table">
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
              placeholder="Tìm kiếm nhân viên"
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
                  className={`w-[240px] h-8 rounded-2xl ${
                    isOpenDatePicker ? "bg-[#fefefe] shadow-md" : ""
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
        <div className="header">
          <div className="employee-cell">Nhân viên</div>
          <div className="cell">SUN</div>
          <div className="cell">MON</div>
          <div className="cell">TUE</div>
          <div className="cell">WED</div>
          <div className="cell">THU</div>
          <div className="cell">FRI</div>
          <div className="cell">SAT</div>
        </div>
        <div className="max-h-[540px] overflow-auto">
          {users.map((employee) => (
            <div key={employee.userId} className="row">
              <div className="employee-cell">
                <div>{employee.user}</div>
                <div className="text-[#8c8c8c] text-sm font-light">
                  {employee.role}
                </div>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="cell">
                  <button
                    onClick={() =>
                      openAddShifts(employee, formatDayToYYYYMMDD(day.id))
                    }
                    className="new-btn"
                  >
                    + Thêm ca
                  </button>
                  {searchByUserIdAndDay(
                    employee.userId,
                    formatDayToYYYYMMDD(day.id)
                  )?.map((schedule) => (
                    <button
                      key={schedule.id}
                      onClick={() =>
                        openDetailShift(
                          schedule.id,
                          employee,
                          day.id,
                          schedule.shift.name,
                          schedule.shift.startTime,
                          schedule.shift.endTime
                        )
                      }
                      className="btn"
                    >
                      {schedule.shift.startTime} - {schedule.shift.endTime}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/** Modal xếp thêm ca cho nhân viên */}
      {isAddShifts && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
            <div>
              <div className="font-bold text-xl">
                {user.user}{" "}
                <span className="font-semibold text-base text-[#8c8c8c]">
                  ID: 000{user.userId}{" "}
                </span>
              </div>
              <div className="font-light text-sm text-[#8c8c8c]">
                {user.role}
              </div>
              <div className="font-bold text-lg mt-2">{chosenDate}</div>
            </div>
            <div className="pt-6 pb-6">
              <div className="font-bold text-xl">Chọn ca làm việc</div>
              <div className="flex flex-col gap-2 mt-2">
                {shifts.map((shift) => (
                  <label key={shift.id} className="space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={shift.id}
                      onChange={handleChosenShifts}
                    />
                    <span className="font-semibold">{shift.name}</span>
                    <span className="text-[#8c8c8c]">
                      {shift.startTime} - {shift.endTime}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 items-center mt-4">
              <button
                className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-[#333333] text-[#f7f7f7]"
                onClick={saveAddShifts}
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
                <div className="font-semibold">Lưu</div>
              </button>
              <button
                className="h-10 w-20 font-bold rounded"
                onClick={closeAddShifts}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Modal danh sách ca làm */}
      {isShiftsList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="mb-6 flex items-center gap-4">
              <div className="font-bold text-xl">Danh sách ca làm việc</div>
              <button
                onClick={() => setIsCreateShift(true)}
                title="Tạo mới"
                className="flex items-center justify-center h-6 w-6 bg-[#f5f5f5] rounded-full hover:bg-[#b1b1b1] hover:text-white"
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-plus h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            </div>
            <div className="flex items-center h-10 mt-2 p-2">
              <div className="basis-[30%] font-light text-sm text-[#8c8b8b]">
                Tên ca làm
              </div>
              <div className="basis-[50%] text-center font-light text-sm text-[#8c8b8b]">
                Thời gian
              </div>
            </div>
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="flex items-center h-10 mb-2 p-2 rounded-md border border-[#f5f5f5] hover:bg-[#fafafa]"
              >
                <div className="basis-[30%] font-bold">{shift.name}</div>
                <div className="basis-[50%] text-center font-semibold">
                  {shift.startTime} - {shift.endTime}
                </div>
                <button
                  onClick={() =>
                    openEditShift(
                      shift.id,
                      shift.name,
                      shift.startTime,
                      shift.endTime
                    )
                  }
                  title="Sửa"
                  className="basis-[10%] flex justify-center items-center"
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-edit text-base"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteShift(shift.id)}
                  title="Xóa"
                  className="basis-[10%] flex justify-center items-center"
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-eraser text-base"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                    <path d="M18 13.3l-6.3 -6.3" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="flex justify-end gap-3 items-center mt-10">
              <button
                className="h-10 w-20 font-bold rounded"
                onClick={() => setIsShiftsList(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Modal tạo ca làm mới */}
      {isCreateShift && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px]">
            <div className="font-bold text-xl mb-6">Tạo ca làm việc</div>
            <div className="flex items-center mb-4">
              <div className="w-28">Tên</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-72">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="Tên ca"
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-28">Giờ làm việc</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-28">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="hh:mm"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="w-16 text-center">Đến</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-28">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="hh:mm"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 items-center mt-10">
              <button
                className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-[#333333] text-[#f7f7f7]"
                onClick={saveCreateShift}
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
                <div className="font-semibold">Lưu</div>
              </button>
              <button
                className="h-10 w-20 font-bold rounded"
                onClick={closeCreateShift}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Modal chỉnh sửa thông tin ca làm */}
      {isEditShift && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px]">
            <div className="font-bold text-xl mb-6">
              Sửa thông tin ca làm việc
            </div>
            <div className="flex items-center mb-4">
              <div className="w-28">Tên</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-72">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="Tên ca"
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-28">Giờ làm việc</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-28">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="hh:mm"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="w-16 text-center">Đến</div>
              <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-28">
                <input
                  className="p-2 bg-transparent w-full outline-none"
                  type="text"
                  placeholder="hh:mm"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 items-center mt-10">
              <button
                className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-[#333333] text-[#f7f7f7]"
                onClick={saveEditShift}
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
                <div className="font-semibold">Lưu</div>
              </button>
              <button
                className="h-10 w-20 font-bold rounded"
                onClick={closeEditShift}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Modal thông tin chi tiết ca làm */}
      {isDetailShift && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px]">
            <div className="font-bold text-xl mb-6">Thông tin ca làm việc</div>
            <div className="flex items-center mb-4">
              <div className="w-32">Tên nhân viên</div>
              <div className="font-bold w-72">{user.user}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">ID</div>
              <div className="font-bold w-72">{user.userId}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Vị trí</div>
              <div className="font-bold w-72">{user.role}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Tên ca làm</div>
              <div className="font-bold w-72">{shiftName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32">Giờ làm việc</div>
              <div className="font-bold w-20">{startTime}</div>
              <div className="w-16">Đến</div>
              <div className="font-bold w-28">{endTime}</div>
            </div>
            <div className="flex justify-end gap-3 items-center mt-10">
              <button
                className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-red-700 text-[#f7f7f7]"
                onClick={deleteWorkSchedule}
              >
                <div className="font-semibold">Xóa</div>
              </button>
              <button
                className="h-10 w-20 font-bold rounded"
                onClick={closeDetailShift}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
