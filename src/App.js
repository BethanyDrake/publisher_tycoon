import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const Submissions = ({date}) => {

  const submissions = ['A submission', 'A Different Submission'];

  return <div> {submissions[date]} </div>
}

const Calandar = ({date, setDate}) => {

  const formatDate = (timeInMonths) => {

    const year = Math.floor(timeInMonths / 12);
    const month = timeInMonths % 12;
    const months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month]} ${2000 +year}`;
  }

  const onClickDone = () => {

    setDate(date + 1);
  }
  return (
    <div className="App">
      Current date: {formatDate(date)}
      <button onClick={onClickDone}> Done </button>
    </div>
  );
}

function App() {
  const [date, setDate] = useState(0);
  return <div>
  <Submissions date={date}/>
  <Calandar date={date} setDate={setDate}/>
  </div>
}

export default App;
