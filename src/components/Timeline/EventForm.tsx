import React from 'react';
import styled from 'styled-components';
import { TimelineEvent } from './types';

interface EventFormProps {
  event?: TimelineEvent | null;
  year: number;
  onSubmit: (event: Partial<TimelineEvent>) => void;
  onDelete?: () => void;
  onClose: () => void;
}

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.form`
  background: ${props => props.theme.background};
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
`;

const EventForm: React.FC<EventFormProps> = ({
  event,
  year,
  onSubmit,
  onDelete,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onSubmit({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : undefined,
      color: formData.get('color') as string,
      category: formData.get('category') as string,
    });
  };

  return (
    <FormOverlay onClick={onClose}>
      <FormContainer onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>{event ? '编辑事件' : '新建事件'}</h3>
        <input
          name="title"
          defaultValue={event?.title}
          placeholder="事件标题"
          required
        />
        <textarea
          name="description"
          defaultValue={event?.description}
          placeholder="事件描述"
        />
        <input
          type="date"
          name="startDate"
          defaultValue={event?.startDate.toISOString().split('T')[0]}
          required
        />
        <input
          type="date"
          name="endDate"
          defaultValue={event?.endDate?.toISOString().split('T')[0]}
        />
        <input
          type="color"
          name="color"
          defaultValue={event?.color}
        />
        <input
          name="category"
          defaultValue={event?.category}
          placeholder="类别"
        />
        <button type="submit">保存</button>
        {event && onDelete && (
          <button type="button" onClick={onDelete}>删除</button>
        )}
        <button type="button" onClick={onClose}>取消</button>
      </FormContainer>
    </FormOverlay>
  );
};

export default EventForm; 