import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

interface TimelineGridProps {
  year: number;
  scale: number;
}

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px; // 设置一个固定高度
  background: ${props => props.theme.background};
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  border: 1px solid ${props => props.theme.border};
`;

const MonthColumn = styled.div`
  border-right: 1px solid ${props => props.theme.border};
  position: relative;
  padding: 8px;
  
  &::after {
    content: attr(data-month);
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 14px;
    color: ${props => props.theme.text};
  }
`;

const TimelineGrid: React.FC<TimelineGridProps> = ({ year, scale }) => {
  return (
    <GridContainer>
      <MonthGrid>
        {Array.from({ length: 12 }, (_, i) => {
          const date = new Date(year, i);
          return (
            <MonthColumn
              key={i}
              data-month={format(date, 'MMM')}
            />
          );
        })}
      </MonthGrid>
    </GridContainer>
  );
};

export default TimelineGrid; 