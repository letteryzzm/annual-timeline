import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Timeline from './components/Timeline/Timeline';
import { TimelineEvent } from './components/Timeline/types';

const theme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#1976d2',
  secondary: '#dc004e',
  border: '#e0e0e0',
  hover: '#f5f5f5'
};

function App() {
  const [events, setEvents] = useState<TimelineEvent[]>([
    // 添加一些示例事件
    {
      id: '1',
      title: '示例事件 1',
      description: '这是一个示例事件',
      startDate: new Date(2024, 2, 15), // 3月15日
      color: '#1976d2'
    },
    {
      id: '2',
      title: '示例事件 2',
      description: '这是另一个示例事件',
      startDate: new Date(2024, 5, 1), // 6月1日
      color: '#dc004e'
    }
  ]);

  const handleEventAdd = (event: TimelineEvent) => {
    setEvents([...events, { ...event, id: Date.now().toString() }]);
  };

  const handleEventUpdate = (updatedEvent: TimelineEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        padding: 20,
        maxWidth: 1200,
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <h1>年度时间线</h1>
        <Timeline
          year={2024}
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
    </ThemeProvider>
  );
}

export default App; 