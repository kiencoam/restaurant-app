"use client";

import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css"; // Import custom CSS
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Modal, Box, TextField, Button, Grid } from "@mui/material";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const sampleEvents = [
  {
    id: 1,
    title: "Event 1",
    start: new Date(2024, 10, 2, 11, 0),
    end: new Date(2024, 10, 2, 13, 0),
    resourceId: "table1",
  },
  {
    id: 2,
    title: "Event 2",
    start: new Date(2024, 10, 2, 14, 0),
    end: new Date(2024, 10, 2, 16, 0),
    resourceId: "table2",
  },
];

const MyCalendar = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [newEventStart, setNewEventStart] = useState(null);
  const [newEventEnd, setNewEventEnd] = useState(null);
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

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      const nextEvents = events.map((existingEvent) => {
        return existingEvent.id === selectedEvent.id
          ? { ...existingEvent, title }
          : existingEvent;
      });
      setEvents(nextEvents);
      handleCloseModal();
    } else if (newEventStart && newEventEnd) {
      const newEvent = {
        id: events.length + 1,
        title,
        start: newEventStart,
        end: newEventEnd,
        resourceId,
      };
      setEvents([...events, newEvent]);
      handleCloseModal();
    }
  };

  const handleSelectSlot = ({ start, end, resourceId }) => {
    setNewEventStart(start);
    setNewEventEnd(end);
    setResourceId(resourceId);
    setTitle("");
    setModalOpen(true);
  };

  const handleOpenManualEventCreation = () => {
    setNewEventStart(new Date());
    setNewEventEnd(new Date());
    setResourceId(resources[0].id);
    setTitle("");
    setModalOpen(true);
  };

  return (
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
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.DAY}
          views={{ day: true }}
          step={60}
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
          <TextField
            fullWidth
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleSaveEvent} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default MyCalendar;
