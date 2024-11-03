"use client";

import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css"; // Import custom CSS
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Modal, Box, TextField, Button, Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} style={{ overflowX: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenManualEventCreation}
            style={{ marginBottom: "10px" }}
          >
            Create New Event
          </Button>
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
            style={{ height: 600 }}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            resizable
            draggable
          />
        </Grid>
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
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">Edit Event</h2>
            <form onSubmit={handleSaveEvent}>
              <TextField
                fullWidth
                label="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <DateTimePicker
                label="Controlled picker"
                value={start}
                onChange={(newStart) => setStart(newStart)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Thời lượng (h)"
                type="number"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                variant="standard"
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
              <TextField
                select
                label="Chọn bàn"
                value={resourceId}
                onChange={(event) => setResourceId(event.target.value)}
                required
                margin="normal"
              >
                {resources.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </form>
          </Box>
        </Modal>
      </Grid>
    </LocalizationProvider>
  );
};

export default MyCalendar;
