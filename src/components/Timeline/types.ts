export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  color?: string;
  category?: string;
}

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  hover: string;
} 