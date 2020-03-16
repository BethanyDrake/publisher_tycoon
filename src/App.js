import React, {useState} from 'react';
import './App.css';
import RandomTitleGenerator from './TitleGenerator';

const PublishButton = ({onClick}) => {
  return <button onClick={onClick}>Publish</button>
}

const PublishedBooks = ({books}) => {
    return <div>{books.map(book => <div key={book}>{book}</div>)}</div>
}

const Submission = ({title, setPublishedBooks}) => {
  let [status, setStatus] = useState('new');


  const publishBook = () => {
    setStatus('published');
    setPublishedBooks(l => [...l, title]);
  }

  if (status === 'new') {
    return <div> <span className={"submission--"+status}>{title}</span>

    <PublishButton onClick={publishBook}/>
    </div>
  } else {
    return <div> <span className={"submission--"+status}>{title}</span>
    </div>
  }
}

const Submissions = ({setPublishedBooks, books}) => {

  return (

      books.map(book =>
        <Submission key={book} title={book} setPublishedBooks={setPublishedBooks}/>
      )

  )

}

const MoneyDisplay = ({money}) => {
  return (
  <div data-testid='money-display'>{'$' + money}</div>
  )
}

const Calandar = ({date, setDate, onMonthEnd}) => {

  const formatDate = (timeInMonths) => {

    const year = Math.floor(timeInMonths / 12);
    const month = timeInMonths % 12;
    const months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month]} ${2000 +year}`;
  }

  const onClickDone = () => {

    setDate(date + 1);
    onMonthEnd();
  }
  return (
    <div className="App">
      Current date: {formatDate(date)}
      <button onClick={onClickDone}> Done </button>
    </div>
  );
}

const App = ({getNextTitle = RandomTitleGenerator}) => {
  const [date, setDate] = useState(0);
  const [money, setMoney] = useState(0);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [submittedBooks, setSubmittedBooks] = useState([getNextTitle(0)]);

  const onMonthEnd = () => {
    setMoney(money+publishedBooks.length);
    setSubmittedBooks([getNextTitle(date+1)])
  }
  return <div>
  <PublishedBooks books={publishedBooks}/>
  <Submissions setPublishedBooks={setPublishedBooks} books={submittedBooks}/>
  <Calandar date={date} setDate={setDate} onMonthEnd={onMonthEnd}/>
  <MoneyDisplay money={money}/>
  </div>
}

export default App;
