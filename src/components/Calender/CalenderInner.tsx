import styled from 'styled-components';
import ColumnHeader from './ColumnHeader';
import type { Attendence } from '../../api/attendence';
import type Calender from '../../factory/Calender/Caldender';

interface Props {
  calender: Calender;
  onClickItem?: React.MouseEventHandler<HTMLDivElement>;
  items: Attendence[];
}

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const CalenderInner = ({ calender, onClickItem, items }: Props) => (
  <GridContainer>
    <Row>
      {days.map((day, index) => (
        <Title key={day} isWeekend={index === 0 || index === 6}>
          {day}
        </Title>
      ))}
    </Row>
    <Container>
      {calender.calender.map(({ id, week }) => (
        <Row key={id}>
          {week.map((day, index) => (
            <Column
              key={day.id}
              isWeekend={index === 0 || index === 6}
              onClick={onClickItem}
            >
              <ColumnHeader
                calenderMonth={calender.month}
                date={day.date}
                month={day.month}
                year={day.year}
              />
              {/** ANCHOR: Let' consider a better solution */}
              <div>
                {items.find((item) => {
                  const date = new Date(item.timeStamp);
                  return (
                    date.getFullYear() === day.year &&
                    date.getMonth() === day.month &&
                    date.getDate() === day.date
                  );
                })
                  ? '출석'
                  : null}
              </div>
            </Column>
          ))}
          {/** TODO: data is passed here, data will be passed in as props and displayed */}
        </Row>
      ))}
    </Container>
  </GridContainer>
);

export default CalenderInner;

interface CalenderColumnProps {
  isWeekend: boolean;
}

const Title = styled.div<CalenderColumnProps>`
  position: relative;
  border-right: 1px solid rgb(233, 233, 231);
  border-bottom: 1px solid rgb(233, 233, 231);
  padding: 0.5rem;
  background-color: ${({ isWeekend }) =>
    isWeekend ? 'rgb(251, 251, 250)' : '#ffffff'};
  font-size: 14px;
  font-weight: 500;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto repeat(6, minmax(100px, max-content));
  grid-auto-rows: 1fr;
  border-top: 1px solid rgb(233, 233, 231);
  border-left: 1px solid rgb(233, 233, 231);
  border-radius: 2px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-columns: 1fr;
  position: relative;
`;

const Column = styled.div<CalenderColumnProps>`
  position: relative;
  min-height: 100px;
  padding: 0.5rem;
  border-right: 1px solid rgb(233, 233, 231);
  border-bottom: 1px solid rgb(233, 233, 231);
  background-color: ${({ isWeekend }) =>
    isWeekend ? 'rgb(251, 251, 250)' : '#ffffff'};

  cursor: pointer;

  &:hover {
    background-color: rgba(233, 233, 231, 0.3);
  }
`;

const Container = styled.div`
  position: relative;
`;
