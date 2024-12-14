/*
  Gọi API lấy dữ liệu User, Shift ở dòng 339
  Gọi API lấy dữ liệu WorkSchedule ở dòng 350
  Gọi API tạo thêm WorkSchedule ở dòng 431
  Gọi API tạo thêm Shift ở dòng 459
  Gọi API chỉnh sửa Shift ở dòng 496
  Gọi API xóa Shift ở dòng 547
  Gọi API xóa WorkSchedule ở dòng 572
  (Số dòng có thể không đúng vì đã thêm code mới)
  Trong page này chỉ gọi api và cập nhật ở FE, còn page khác gọi api và getAll lại từ đầu
 */

"use client";
import { useState, useMemo, ChangeEventHandler, use, useEffect } from "react";
import DatePicker from "react-datepicker";

import {
  getFirstDayOfWeek,
  formatDateToReactComponent,
  formatDateToYYYYMMDD,
} from "@/utils/timeUtils";

import "./StaffSchedule.css";
import "react-datepicker/dist/react-datepicker.css";

import { createWorkSchedule, deleteWorkSchedule, getAllWorkSchedules, WorkScheduleEntity } from "@/app/api-client/WorkScheduleService";
import { getAllUsers, UserEntity } from "@/app/api-client/UserService";
import { createShift, deleteShift, getAll, ShiftEntity, updateShift } from "@/app/api-client/ShiftService";
import { CreateWorkScheduleRequest } from "@/app/api-client/WorkScheduleService";
import { newDate } from "react-datepicker/dist/date_utils";

const daysOfWeek = [
  { id: 0, name: "SUN" },
  { id: 1, name: "MON" },
  { id: 2, name: "TUE" },
  { id: 3, name: "WED" },
  { id: 4, name: "THU" },
  { id: 5, name: "FRI" },
  { id: 6, name: "SAT" },
];

// const sampleWorkSchedules: WorkScheduleEntity[] = [
//   {
//     id: 1,
//     userId: 1,
//     shiftId: 101,
//     date: "2024-11-17",
//     user: {
//       id: 1,
//       name: "Johny Đặng",
//       email: "johny.dang@example.com",
//       phoneNumber: "123456789",
//       gender: "Male",
//       dateOfBirth: new Date("1990-01-01"),
//       roleId: 1,
//       cccd: "123456789",
//       cvImg: "path/to/cvImg.jpg",
//       position: "Chef",
//       salaryType: "Hourly",
//       salaryPerHour: 15,
//       salaryPerMonth: 0,
//       role: {
//         id: 3,
//         name: "Chef",
//         description: "Đầu bếp",
//       },
//     },
//     shift: {
//       id: 101,
//       name: "Day",
//       startTime: "08:00",
//       endTime: "16:00",
//       status: "active",
//     },
//   },
//   {
//     id: 2,
//     userId: 2,
//     shiftId: 102,
//     date: "2024-11-18",
//     user: {
//       id: 2,
//       name: "Mary Janes",
//       email: "mary.janes@example.com",
//       phoneNumber: "987654321",
//       gender: "Female",
//       dateOfBirth: new Date("1992-02-02"),
//       roleId: 1,
//       cccd: "123456789",
//       cvImg: "path/to/cvImg.jpg",
//       position: "Chef",
//       salaryType: "Hourly",
//       salaryPerHour: 15,
//       salaryPerMonth: 0,
//       role: {
//         id: 4,
//         name: "Waiter",
//         description: "Phục vụ",
//       },
//     },
//     shift: {
//       id: 102,
//       name: "Night",
//       startTime: "16:00",
//       endTime: "00:00",
//       status: "active",
//     },
//   },
//   {
//     id: 3,
//     userId: 1,
//     shiftId: 101,
//     date: "2024-11-19",
//     user: {
//       id: 1,
//       name: "Johny Đặng",
//       email: "johny.dang@example.com",
//       phoneNumber: "123456789",
//       gender: "Male",
//       dateOfBirth: new Date("1990-01-01"),
//       roleId: 1,
//       cccd: "123456789",
//       cvImg: "path/to/cvImg.jpg",
//       position: "Chef",
//       salaryType: "Hourly",
//       salaryPerHour: 15,
//       salaryPerMonth: 0,
//       role: {
//         id: 3,
//         name: "Chef",
//         description: "Đầu bếp",
//       },
//     },
//     shift: {
//       id: 101,
//       name: "Day",
//       startTime: "08:00",
//       endTime: "16:00",
//       status: "active",
//     },
//   },
// ];

// const users: UserEntity[] = [
//   {
//     id: 1,
//     name: "Johny Đặng",
//     email: "johny.dang@example.com",
//     phoneNumber: "123456789",
//     gender: "Male",
//     dateOfBirth: new Date("1990-01-01"),
//     roleId: 1,
//     cccd: "123456789",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Chef",
//     salaryType: "Hourly",
//     salaryPerHour: 15,
//     salaryPerMonth: 0,
//     role: {
//       id: 3,
//       name: "Chef",
//       description: "Đầu bếp",
//     },
//   },
//   {
//     id: 2,
//     name: "Mary Janes",
//     email: "mary.janes@example.com",
//     phoneNumber: "987654321",
//     gender: "Female",
//     dateOfBirth: new Date("1992-02-02"),
//     roleId: 2,
//     cccd: "987654321",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Waiter",
//     salaryType: "Hourly",
//     salaryPerHour: 12,
//     salaryPerMonth: 0,
//     role: {
//       id: 4,
//       name: "Waiter",
//       description: "Phục vụ",
//     },
//   },
//   {
//     id: 3,
//     name: "Cristiano Ronaldo",
//     email: "cristiano.ronaldo@example.com",
//     phoneNumber: "123123123",
//     gender: "Male",
//     dateOfBirth: new Date("1985-02-05"),
//     roleId: 3,
//     cccd: "123123123",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Receptionist",
//     salaryType: "Hourly",
//     salaryPerHour: 20,
//     salaryPerMonth: 0,
//     role: {
//       id: 5,
//       name: "Receptionist",
//       description: "Tiếp tân",
//     },
//   },
//   {
//     id: 4,
//     name: "Alexander Kiên Phạm",
//     email: "alexander.kien.pham@example.com",
//     phoneNumber: "321321321",
//     gender: "Male",
//     dateOfBirth: new Date("1993-03-03"),
//     roleId: 4,
//     cccd: "321321321",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Bartender",
//     salaryType: "Hourly",
//     salaryPerHour: 18,
//     salaryPerMonth: 0,
//     role: {
//       id: 6,
//       name: "Bartender",
//       description: "Pha chế",
//     },
//   },
//   {
//     id: 5,
//     name: "Cong Phuong Nguyen",
//     email: "cong.phuong.nguyen@example.com",
//     phoneNumber: "456456456",
//     gender: "Male",
//     dateOfBirth: new Date("1995-05-05"),
//     roleId: 1,
//     cccd: "456456456",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Chef",
//     salaryType: "Hourly",
//     salaryPerHour: 15,
//     salaryPerMonth: 0,
//     role: {
//       id: 3,
//       name: "Chef",
//       description: "Đầu bếp",
//     },
//   },
//   {
//     id: 6,
//     name: "Antony Nguyễn",
//     email: "antony.nguyen@example.com",
//     phoneNumber: "789789789",
//     gender: "Male",
//     dateOfBirth: new Date("1996-06-06"),
//     roleId: 2,
//     cccd: "789789789",
//     cvImg: "path/to/cvImg.jpg",
//     position: "Waiter",
//     salaryType: "Hourly",
//     salaryPerHour: 12,
//     salaryPerMonth: 0,
//     role: {
//       id: 4,
//       name: "Waiter",
//       description: "Phục vụ",
//     },
//   },
// ];

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

export default function StaffSchedulePage() {
  const [workSchedules, setWorkSchedules] =
    useState<WorkScheduleEntity[]>([]);

  const [shifts, setShifts] = useState<ShiftEntity[]>([]);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false); // Mở lịch chọn ngày

  const [isAddShifts, setIsAddShifts] = useState<boolean>(false); // Mở modal thêm ca làm cho nhân viên

  const [isShiftsList, setIsShiftsList] = useState<boolean>(false); // Mở modal danh sách ca làm

  const [isCreateShift, setIsCreateShift] = useState<boolean>(false); // Mở modal tạo ca làm mới

  const [isEditShift, setIsEditShift] = useState<boolean>(false); // Mở modal chỉnh sửa thông tin ca làm

  const [isDetailSchedule, setIsDetailSchedule] = useState<boolean>(false); // Mở modal chi tiết ca làm

  const [displayDate, setDisplayDate] = useState<Date>(
    getFirstDayOfWeek(new Date())
  );

  const [user, setUser] = useState<UserEntity>(null); // State lưu nhân viên đang được chọn

  const [chosenDate, setChosenDate] = useState<string>(""); // State lưu ngày đang được chọn

  const [chosenShiftIds, setChosenShiftIds] = useState<Set<string>>(new Set()); // State lưu các ca làm đang được chọn ở mục Thêm ca

  const [shiftId, setShiftId] = useState<number>(0); // State lưu ID của ca làm đang được chọn

  const [shiftName, setShiftName] = useState<string>(""); // State lưu tên ca làm đang được chọn

  const [startTime, setStartTime] = useState<string>(""); // State lưu giờ bắt đầu của ca làm đang được chọn

  const [endTime, setEndTime] = useState<string>(""); // State lưu giờ kết thúc của ca làm đang được chọn

  const [selectedSchedule, setSelectedSchedule] =
    useState<WorkScheduleEntity>(null); // State lưu thông tin ca làm đang được chọn

  const [currWorkSchedules, setCurrWorkSchedules] = useState<WorkScheduleEntity[]>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  const [displayUsers, setDisplayUsers] = useState<UserEntity[]>([]);

  const [allUsers, setAllUsers] = useState<UserEntity[]>([]); // Lưu trữ tất cả người dùng

  // console.log("shift:", shifts);
  //console.log("workSche: ",workSchedules);

  useEffect(() => {
    /* Gọi API lấy nhân viên và shifts */
    //Tạm thời chỉ giới hạn ở 100 nv
    getAllUsers("page=0&page_size=100").then((res) => {
      setDisplayUsers(res.second);
      setAllUsers(res.second)
    });
    getAll().then((res) => {
      const formattedShifts: ShiftEntity[] = res.map((shift) => ({
        ...shift,
        startTime: shift.startTime.slice(0, 5),
        endTime: shift.endTime.slice(0, 5),
      }));
      setShifts(formattedShifts);
    });
  }, []);

  // useEffect(() => {
  //   const deleteShifts = () => {
  //     const deletee = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //     const deletePromises = deletee.map(num =>
  //       deleteShift(num)
  //         .then(() => console.log(`Shift ${num} deleted`))
  //         .catch((error) => console.error(`Error deleting shift ${num}:`, error))
  //     );

  //     // Chờ tất cả các Promise hoàn thành
  //     Promise.all(deletePromises)
  //       .then(() => {
  //         console.log("All shifts deleted.");
  //       })
  //       .catch(() => {
  //         console.log("Some shifts failed to delete.");
  //       });
  //   };

  //   deleteShifts(); // Gọi hàm xóa trong useEffect
  // }, []); // Chỉ chạy 1 lần khi component mount

  useEffect(() => {
    /* Gọi API lấy work schedules*/
    const startDate = formatDateToYYYYMMDD(displayDate);
    const endDate = formatDateToYYYYMMDD(
      new Date(new Date(displayDate).setDate(displayDate.getDate() + 6))
    );
    const query = `start_date=${startDate}&end_date=${endDate}`;
    getAllWorkSchedules(query).then((res) => {
      const formattedSchedules: WorkScheduleEntity[] = res.map((sche) => ({
        ...sche,
        shift: {
          ...sche.shift,
          startTime: sche.shift.startTime.slice(0, 5),
          endTime: sche.shift.endTime.slice(0, 5),
        },
      }));

      setWorkSchedules(formattedSchedules);
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
        // Nếu có input tìm kiếm, lọc dữ liệu
        const regex = new RegExp(searchInput, "i");
        const newDisplayUsers = allUsers.filter((user) => regex.test(user.name));
        setDisplayUsers(newDisplayUsers);
      } else {
        // Nếu không có input tìm kiếm, khôi phục lại dữ liệu gốc
        setDisplayUsers(allUsers);
      }
    }
  };

  const openAddShifts = (user: UserEntity, date: string) => {
    if (new Date(date) < new Date()){
      return;
    }
    setCurrWorkSchedules(searchByUserIdAndDate(user.id, date))
    setUser(user);
    setChosenDate(date);
    setIsAddShifts(true);

  };

  console.log(currWorkSchedules)

  const handleChosenShifts: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newChosenShifts = new Set(chosenShiftIds);
    if (e.target.checked) {
      newChosenShifts.add(e.target.value);
    } else {
      newChosenShifts.delete(e.target.value);
    }
    setChosenShiftIds(newChosenShifts);
  };

  const closeAddShifts = () => {
    setIsAddShifts(false);
    setChosenShiftIds(new Set());
    setCurrWorkSchedules([])

  };

  const saveAddShifts = () => {
    const chosenShiftIdsList: number[] = Array.from(chosenShiftIds).map(Number);

    /* Gọi API tạo work schedules mới*/
    const payload: CreateWorkScheduleRequest[] = chosenShiftIdsList.map(
      (shiftId) => ({
        userId: user.id,
        shiftId: shiftId,
        date: chosenDate,
      })
    );
    try {
      Promise.all(
        payload.map((schedule) =>
          createWorkSchedule(schedule).then((res) => {
            console.log("Work Schedule created:", res);
          })
        )
      )
        .then(() => {
          // Sau khi tất cả API hoàn thành
          //Có thể dùng getAll
          setShifts(shifts => [...shifts]) //gọi lại useEffect của getAllSchedule API
          closeAddShifts();
        })
        .catch((error) => {
          console.log("Error creating schedules:", error);
        });
    } catch (error) {
      alert("Trùng với các ca làm việc khác");
    }
  };

  const saveCreateShift = (e) => {
    /* Gọi API tạo shift mới*/
    e.preventDefault();
    const formattedStartTime = startTime.includes(":")
      ? `${startTime}:00`
      : startTime;

    const formattedEndTime = endTime.includes(":")
      ? `${endTime}:00`
      : endTime;
    const payload = {
      name: shiftName,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
    try {
      createShift(payload).then((res) => {
        getAll().then((res) => {
          const formattedShifts: ShiftEntity[] = res.map((shift) => ({
            ...shift,
            startTime: shift.startTime.slice(0, 5),
            endTime: shift.endTime.slice(0, 5),
          }));
          setShifts(formattedShifts);
        });
        closeCreateShift();
      })
        .catch((error) => {
          alert("Trùng với các ca làm việc khác");;
        });
    }
    catch (error) {
      alert("Trùng với các ca làm việc khác");
    }
  };

  const closeCreateShift = () => {
    setIsCreateShift(false);
    setShiftName("");
    setStartTime("");
    setEndTime("");
  };

  const openEditShift = (shift: ShiftEntity) => {
    setShiftId(shift.id);
    setShiftName(shift.name);
    setStartTime(shift.startTime);
    setEndTime(shift.endTime);
    setIsEditShift(true);
  };

  const saveEditShift = (e) => {
    e.preventDefault();
    /* Gọi API chỉnh sửa shift*/
    const formattedStartTime = startTime.includes(":")
      ? `${startTime}:00`
      : startTime;

    const formattedEndTime = endTime.includes(":")
      ? `${endTime}:00`
      : endTime;
    const payload = {
      id: shiftId,
      name: shiftName,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
    try {
      updateShift(shiftId, payload).then((res) => {
        console.log("updated");
        //Gọi lại getAll API
        getAll().then((res) => {
          const formattedShifts: ShiftEntity[] = res.map((shift) => ({
            ...shift,
            startTime: shift.startTime.slice(0, 5),
            endTime: shift.endTime.slice(0, 5),
          }));
          setShifts(formattedShifts);
          closeEditShift();
        });
      })
        .catch((error) => {
          alert("Trùng với các ca làm việc khác");;
        });
    } catch (error) {
      alert("Trùng với các ca làm việc khác");;
    }
  };

  const closeEditShift = () => {
    setIsEditShift(false);
    setShiftId(0);
    setShiftName("");
    setStartTime("");
    setEndTime("");
  };

  const delShift = (shiftId: number) => {
    /* Gọi API xóa shift*/
    delSchedulesByShiftId(shiftId);
    deleteShift(shiftId)
      .then(() => {
        console.log("deleted")
        getAll().then((res) => {
          const formattedShifts: ShiftEntity[] = res.map((shift) => ({
            ...shift,
            startTime: shift.startTime.slice(0, 5),
            endTime: shift.endTime.slice(0, 5),
          }));
          setShifts(formattedShifts);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openDetailSchedule = (schedule: WorkScheduleEntity) => {
    setSelectedSchedule(schedule);
    setIsDetailSchedule(true);
  };

  const closeDetailShift = () => {
    setIsDetailSchedule(false);
    setSelectedSchedule(null);
  };

  const delSchedule = () => {
    /* Gọi API xóa work schedule*/
    deleteWorkSchedule(selectedSchedule.id)
      .then(() => {
        console.log("deleted")
        const newWorkSchedules = workSchedules.filter(
          (schedule) => schedule.id !== selectedSchedule.id
        );
        setWorkSchedules(newWorkSchedules);
        closeDetailShift();
      })
      .catch((error) => {
        alert("Có lỗi khi xóa schedule.");
        console.error(error);
      });

  };

  //Xóa các schedule trước khi xóa shift
  const delSchedulesByShiftId = (shiftIdToDelete) => {
    const schedulesToDelete = workSchedules.filter(schedule => schedule.shiftId === shiftIdToDelete && new Date(schedule.date) >= new Date());
    console.log(schedulesToDelete)
    const idsToDelete = schedulesToDelete.map(schedule => schedule.id);
    console.log(idsToDelete)

    Promise.all(idsToDelete.map(id => deleteWorkSchedule(id)))
      .then(() => {
        console.log("Deleted schedules:", idsToDelete);
      })
      .catch((error) => {
        alert("Không thể xóa lịch trong quá khứ !");
        console.error(error);
      });
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

  const searchByUserIdAndDate = (userId: number, date: string) => {
    if (!workSchedules) return;
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
  };

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
      <div className="sche-table">
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
        <div className="sche-header">
          <div className="employee-cell">Nhân viên</div>
          <div className="sche-cell">SUN</div>
          <div className="sche-cell">MON</div>
          <div className="sche-cell">TUE</div>
          <div className="sche-cell">WED</div>
          <div className="sche-cell">THU</div>
          <div className="sche-cell">FRI</div>
          <div className="sche-cell">SAT</div>
        </div>
        <div className="max-h-[540px] overflow-auto">
          {displayUsers.map((employee) => (
            <div key={employee.id} className="sche-row">
              <div className="employee-cell">
                <div>{employee.name}</div>
                <div className="text-[#8c8c8c] text-sm font-light">
                  {employee.role.name}
                </div>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="sche-cell">
                  <button
                    onClick={() =>
                      openAddShifts(employee, formatDayToYYYYMMDD(day.id))
                    }
                    className="sche-new-btn"
                  >
                    + Thêm ca
                  </button>
                  {searchByUserIdAndDate(
                    employee.id,
                    formatDayToYYYYMMDD(day.id)
                  )?.map((schedule) => (
                    <button
                      key={schedule.id}
                      onClick={() => openDetailSchedule(schedule)}
                      className="sche-btn"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <div className="mb-4">
              <div className="font-bold text-xl">
                {user.name}{" "}
                <span className="font-semibold text-base text-[#8c8c8c]">
                  ID: 000{user.id}{" "}
                </span>
              </div>
              <div className="font-light text-sm text-[#8c8c8c]">
                {user.role.name}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Ngày làm việc</div>
              <div className="font-bold">{chosenDate}</div>
            </div>
            <div className="font-bold text-xl mb-4">Chọn ca làm việc</div>
            <div className="flex flex-wrap mb-4 gap-y-3">
              {shifts && shifts.filter(shift =>
                !currWorkSchedules.some(work => work.shiftId === shift.id)
              ).map((shift) => (
                <label key={shift.id} className="basis-1/2 space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={shift.id}
                    onChange={handleChosenShifts}
                  />
                  <span className="font-semibold">{shift.name}</span>
                  <span className="text-[#8c8c8c] text-sm">
                    {shift.startTime} - {shift.endTime}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 items-center mt-10">
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
                <div>Lưu</div>
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
            {shifts && shifts.map((shift) => (
              <div
                key={shift.id}
                className="flex items-center h-10 mb-2 p-2 rounded-md border border-[#f5f5f5] hover:bg-[#fafafa]"
              >
                <div className="basis-[30%] font-bold">{shift.name}</div>
                <div className="basis-[50%] text-center font-semibold">
                  {shift.startTime} - {shift.endTime}
                </div>
                <button
                  onClick={() => openEditShift(shift)}
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
                  onClick={() => delShift(shift.id)}
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
            <form onSubmit={saveCreateShift}>
              <div className="flex items-center mb-4">
                <div className="w-28">Tên</div>
                <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-72">
                  <input
                    className="p-2 bg-transparent w-full outline-none"
                    type="text"
                    placeholder="Tên ca"
                    value={shiftName}
                    onChange={(e) => setShiftName(e.target.value)}
                    required
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
                    pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
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
                    pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
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
                  onClick={closeCreateShift}
                >
                  Hủy
                </button>
              </div>
            </form>
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
            <form onSubmit={saveEditShift}>
              <div className="flex items-center mb-4">
                <div className="w-28">Tên</div>
                <div className="border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-72">
                  <input
                    className="p-2 bg-transparent w-full outline-none"
                    type="text"
                    placeholder="Tên ca"
                    value={shiftName}
                    onChange={(e) => setShiftName(e.target.value)}
                    required
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
                    pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
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
                    pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
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
                  onClick={closeEditShift}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/** Modal thông tin chi tiết ca làm */}
      {isDetailSchedule && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <div className="font-bold text-xl mb-6">Thông tin ca làm việc</div>
            <div className="flex items-center mb-4">
              <div className="w-32">Tên nhân viên</div>
              <div className="font-bold">{selectedSchedule.user.name}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">ID</div>
              <div className="font-bold">{selectedSchedule.user.id}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Vị trí</div>
              <div className="font-bold">{selectedSchedule.user.position}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Tên ca làm</div>
              <div className="font-bold">{selectedSchedule.shift.name}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Giờ làm việc</div>
              <div className="font-bold w-20">
                {selectedSchedule.shift.startTime}
              </div>
              <div className="w-16">Đến</div>
              <div className="font-bold">{selectedSchedule.shift.endTime}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-32">Ngày làm việc</div>
              <div className="font-bold">{selectedSchedule.date}</div>
            </div>
            <div className="flex justify-end gap-3 items-center mt-10">
              <button
                className="flex items-center justify-center gap-1 h-10 w-20 rounded-md px-2 shadow-sm bg-red-700 text-[#f7f7f7]"
                onClick={delSchedule}
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
