import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


const Calandar = () => {

  const formatDate = ({month, year}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month]} ${2000 +year}`;
  }

  const nextMonth = ({month, year}) => {
    if (month === 11) return {
      month: 0,
      year: year + 1,
    }
    return {
      month: month +1,
      year,
    }
  }
  const [date, setDate] = useState({month:0, year: 0});
  let i = 0;
  const onClickDone = () => {
    i++;
    setDate(nextMonth(date));
  }
  return (
    <div className="App">
      Current date: {formatDate(date)}
      <button onClick={onClickDone}> Done </button>
    </div>
  );




}

function App() {
  return <Calandar/>
}

export default App;
