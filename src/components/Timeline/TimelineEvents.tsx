import React, { useRef } from 'react';
import styled from 'styled-components';
import { DraggableCore } from 'react-draggable';
import { TimelineEvent } from './types';

const EventContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Event = styled.div<{ color?: string }>`
  position: absolute;
  background: ${props => props.color || '#1976d2'};
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }
`;

interface TimelineEventsProps {
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent) => void;
  onEventDrag: (event: TimelineEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const TimelineEventItem: React.FC<{
  event: TimelineEvent;
  containerWidth: number;
  onEventClick: (event: TimelineEvent) => void;
  onEventDrag: (event: TimelineEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}> = ({ event, containerWidth, onEventClick, onEventDrag, onDragStart, onDragEnd }) => {
  const eventRef = useRef<HTMLDivElement>(null!) as React.MutableRefObject<HTMLDivElement>;
  
  const calculatePosition = (date: Date) => {
    const month = date.getMonth();
    return `${(month / 12) * containerWidth}px`;
  };

  return (
    <DraggableCore
      nodeRef={eventRef}
      onStart={onDragStart}
      onStop={(e, data) => {
        onDragEnd();
        const newMonth = Math.floor((data.x / containerWidth) * 12);
        const newDate = new Date(event.startDate.getFullYear(), newMonth, 1);
        onEventDrag({ ...event, startDate: newDate });
      }}
    >
      <Event
        ref={eventRef}
        style={{ left: calculatePosition(event.startDate) }}
        color={event.color}
        onClick={() => onEventClick(event)}
      >
        {event.title}
      </Event>
    </DraggableCore>
  );
};

const TimelineEvents: React.FC<TimelineEventsProps> = ({
  events,
  onEventClick,
  onEventDrag,
  onDragStart,
  onDragEnd
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = containerRef.current?.clientWidth || 1200;

  return (
    <EventContainer ref={containerRef}>
      {events.map((event) => (
        <TimelineEventItem
          key={event.id}
          event={event}
          containerWidth={containerWidth}
          onEventClick={onEventClick}
          onEventDrag={onEventDrag}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </EventContainer>
  );
};

export default TimelineEvents; 