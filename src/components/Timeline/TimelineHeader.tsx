import React from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const MonthCell = styled.div`
  padding: 8px;
  text-align: center;
  font-weight: 500;
  border-right: 1px solid #e0e0e0;
  
  &:last-child {
    border-right: none;
  }
`;

interface TimelineHeaderProps {
  year: number;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({ year }) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  return (
    <HeaderContainer>
      {months.map((date, index) => (
        <MonthCell key={index}>
          {format(date, 'MMM')}
        </MonthCell>
      ))}
    </HeaderContainer>
  );
};

export default TimelineHeader; 