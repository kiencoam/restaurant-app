"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css"; // Import custom CSS
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Modal, Box, TextField, Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const sampleEvents = [
  {
    id: 1,
    title: "Event 1",
    start: new Date(2024, 10, 3, 11, 0),
    end: new Date(2024, 10, 3, 13, 0),
    resourceId: "table1",
  },
  {
    id: 2,
    title: "Event 2",
    start: new Date(2024, 10, 3, 14, 0),
    end: new Date(2024, 10, 3, 16, 0),
    resourceId: "table2",
  },
];

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(null);
  const [duration, setDuration] = useState(1);
  const [resourceId, setResourceId] = useState(null);

  const resources = [
    { id: "table1", title: "Phòng VIP 1" },
    { id: "table2", title: "Phòng VIP 2" },
    { id: "table3", title: "Phòng VIP 3" },
    { id: "table4", title: "Phòng VIP 4" },
    { id: "table5", title: "Phòng VIP 5" },
    { id: "table6", title: "Phòng VIP 6" },
    { id: "table7", title: "Phòng VIP 7" },
    { id: "table8", title: "Phòng VIP 8" },
    { id: "table9", title: "Phòng VIP 9" },
    { id: "table10", title: "Phòng VIP 10" },
    { id: "table11", title: "Phòng VIP 11" },
    // Add more tables as needed
  ];

  const handleEventResize = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const handleEventDrop = ({ event, start, end, resourceId }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, resourceId }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setDuration(1);
    setStart(null);
    setResourceId(null);
  };

  const handleSaveEvent = () => {
    const end = start.add(duration, "hour");

    if (selectedEvent) {
      const nextEvents = events.map((existingEvent) => {
        return existingEvent.id === selectedEvent.id
          ? {
              ...existingEvent,
              title,
              start: start.toDate(),
              end: end.toDate(),
              resourceId,
            }
          : existingEvent;
      });
      setEvents(nextEvents);
      handleCloseModal();
    } else {
      const newEvent = {
        id: events.length + 1,
        title,
        start: start.toDate(),
        end: end.toDate(),
        resourceId,
      };
      setEvents([...events, newEvent]);
      handleCloseModal();
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setStart(dayjs(event.start));
    setDuration((event.end - event.start) / (1000 * 60 * 60));
    setResourceId(event.resourceId);
    setModalOpen(true);
  };

  const handleSelectSlot = ({ start, end, resourceId }) => {
    setStart(dayjs(start));
    setDuration((end - start) / (1000 * 60 * 60));
    setResourceId(resourceId);
    setTitle("");
    setModalOpen(true);
  };

  const handleOpenManualEventCreation = () => {
    setStart(dayjs());
    setTitle("");
    setModalOpen(true);
  };

  const onPrevClick = useCallback(() => {
    setSelectedDate(moment(selectedDate).subtract(1, "d").toDate());
  }, [selectedDate]);

  const onNextClick = useCallback(() => {
    setSelectedDate(moment(selectedDate).add(1, "d").toDate());
  }, [selectedDate]);

  const onTodayClick = useCallback(() => {
    setSelectedDate(new Date());
  }, [selectedDate]);

  const dateText = useMemo(() => {
    return moment(selectedDate).format("dddd, MMMM DD");
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-6 bg-[#fafbfc] h-screen">
        <div className="">
          <div className="toolbar flex justify-between items-center mb-6">
            <div className="font-bold text-xl">{dateText}</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-between bg-white border-2 rounded-lg shadow-sm w-36 h-10 p-2">
                <button onClick={onPrevClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left w-5 h-5 text-black"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                </button>
                <button className="font-semibold" onClick={onTodayClick}>
                  Today
                </button>
                <button onClick={onNextClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right w-5 h-5 text-black"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </button>
              </div>
              <DatePicker
                label=""
                value={dayjs(selectedDate)}
                onChange={(newDate) => setSelectedDate(newDate.toDate())}
                margin="normal"
              />
              <button
                className="flex items-center rounded-md px-2 shadow-sm bg-[#333333] hover:bg-[hsl(0,0%,25%)] active:bg-[hsl(0,0%,30%)]"
                onClick={handleOpenManualEventCreation}
              >
                <div className="p-2 text-sm text-white">Tạo mới</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-plus w-4 h-4 text-white"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            </div>
          </div>
          <DnDCalendar
            localizer={localizer}
            date={selectedDate}
            onNavigate={(date) => {
              setSelectedDate(date);
            }}
            toolbar={false}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.DAY}
            views={{ day: true }}
            step={30}
            timeslots={1}
            resources={resources}
            resourceIdAccessor="id"
            resourceTitleAccessor="title"
            style={{ height: 650 }}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            resizable
            draggable
          />
        </div>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <div className="p-6 flex flex-col">
              <div>Tạo mới đặt bàn</div>
              <form className="flex flex-col gap-6" onSubmit={handleSaveEvent}>
                <div>
                  <TextField
                    fullWidth
                    label="Tên sự kiện"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                  />
                </div>
                <div>
                  <DateTimePicker
                    label="Thời điểm đến"
                    value={start}
                    onChange={(newStart) => setStart(newStart)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Thời lượng (h)"
                    type="number"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    required
                    fullWidth
                    slotProps={{
                      input: {
                        inputProps: {
                          min: 0,
                          max: 24,
                          step: "0.5",
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  <TextField
                    select
                    label="Chọn bàn"
                    value={resourceId}
                    onChange={(event) => setResourceId(event.target.value)}
                    required
                    fullWidth
                    margin="normal"
                  >
                    {resources.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md shadow-sm h-10 w-20 text-white bg-[#333333] hover:bg-[hsl(0,0%,25%)] active:bg-[hsl(0,0%,30%)]"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </LocalizationProvider>
  );
};

export default MyCalendar;
