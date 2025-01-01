import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { TimelineEvent } from './types';
import TimelineHeader from './TimelineHeader';
import TimelineGrid from './TimelineGrid';
import TimelineEvents from './TimelineEvents';
import EventForm from './EventForm';

interface TimelineProps {
  year: number;
  events: TimelineEvent[];
  onEventAdd: (event: TimelineEvent) => void;
  onEventUpdate: (event: TimelineEvent) => void;
  onEventDelete: (eventId: string) => void;
}

const TimelineContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  margin: 20px 0;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
`;

export const Timeline: React.FC<TimelineProps> = ({
  year,
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete
}) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEventClick = useCallback((event: TimelineEvent) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  }, []);

  const handleEventDrag = useCallback((event: TimelineEvent) => {
    onEventUpdate(event);
  }, [onEventUpdate]);

  return (
    <TimelineContainer>
      <ScrollContainer ref={containerRef}>
        <TimelineHeader year={year} />
        <TimelineGrid year={year} scale={scale} />
        <TimelineEvents
          events={events}
          onEventClick={handleEventClick}
          onEventDrag={handleEventDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        />
      </ScrollContainer>
      {showEventForm && (
        <EventForm
          event={selectedEvent}
          year={year}
          onSubmit={(eventData) => {
            if (selectedEvent) {
              onEventUpdate({ ...selectedEvent, ...eventData });
            } else {
              onEventAdd(eventData as TimelineEvent);
            }
            setShowEventForm(false);
          }}
          onDelete={() => {
            if (selectedEvent) {
              onEventDelete(selectedEvent.id);
            }
            setShowEventForm(false);
          }}
          onClose={() => setShowEventForm(false)}
        />
      )}
    </TimelineContainer>
  );
};

export default Timeline; 