import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'




  const getNextTitle = (i) => {
    const titles = ["A Submission", "A Different Submission", "Title A", "Title B", ];
    return titles[i];
  }


test('At first, the date is Jan 2000', () => {
  const { getByText } = render(<App />);
  const dateText = getByText(/Jan 2000/i);
  expect(dateText).toBeDefined();
});

test('When you click next, you progress to Feb 2000', () => {
  const { getByText } = render(<App />);
  const doneButton = getByText(/Done/i);
  fireEvent.click(doneButton)
  const dateText = getByText(/Feb 2000/i);
  expect(dateText).toBeDefined();
});

test('If you click done 14 times, you end up at Mar 2001', () => {
  const { getByText } = render(<App />);
  const doneButton = getByText(/Done/i);
  for (let i=0; i < 14; i++){
     fireEvent.click(doneButton)
  }
  const dateText = getByText(/Mar 2001/i);
  expect(dateText).toBeDefined();
});

test('to start, a submission is displayed', () => {
  const { getByText } = render(<App getNextTitle={getNextTitle} />);
  const submission = getByText(/A Submission/i);
  expect(submission).toBeDefined();
});

test('title generator makes the submission titles different', () => {
  const generatorA = () => "Title A";
  const { queryByText } = render(<App getNextTitle={generatorA}/>);

  {
    const submissionA = queryByText(/Title A/);
    expect(submissionA).not.toBeNull();
  }

});

test('after clicking done, a different submisison is displayed', () => {
  const { getByText } = render(<App getNextTitle={getNextTitle}/>);
  const doneButton = getByText(/Done/i);
  fireEvent.click(doneButton)
  const submission = getByText(/A Different Submission/i);
  expect(submission).toBeDefined();
});


test('if you dont publish a submission, it dissapears next month;', () => {
  const { getByText, queryByText } = render(<App getNextTitle={getNextTitle}/>);
  const submission = queryByText(/A Submission/i);
  expect(submission).not.toBeNull();
  finishMonth(getByText);

  const submissionAfter = queryByText(/A Submission/i);
  expect(submissionAfter).toBeNull();
});

test('if you publish a submission, it doesnt dissapear next month;', () => {
  const { getByText, queryByText } = render(<App getNextTitle={getNextTitle}/>);

  const publishButton = getByText(/Publish/i);
  fireEvent.click(publishButton)
  finishMonth(getByText);

  const submissionAfter = queryByText(/A Submission/i);

  expect(submissionAfter).not.toBeNull();
});


test('if you publish a submission, it looks different, and the publish button dissapears', () => {
  const { getByText, queryByText } = render(<App getNextTitle={getNextTitle}/>);
  const submission = getByText(/A Submission/i);
  expect(submission).toHaveClass('submission--new')


  const publishButton = getByText(/Publish/i);
  fireEvent.click(publishButton)

  expect(submission).toHaveClass('submission--published');

  const publishButtonAfter = queryByText(/Publish/i);

  expect(publishButtonAfter).toBeNull();

});

const finishMonth = (getByText) => {
  const doneButton = getByText(/Done/i)
  fireEvent.click(doneButton)
}

test('after you publish a book, theres a new submission next month that you can publish', () => {
  const { getByText, queryByText } = render(<App getNextTitle={getNextTitle}/>);

  const publishButton = getByText(/Publish/i);
  fireEvent.click(publishButton)

  const publishButtonAfter = queryByText(/Publish/i);
  expect(publishButtonAfter).toBeNull();

  finishMonth(getByText);

  const publishButtonAfterAfter = queryByText(/Publish/i);
  expect(publishButtonAfterAfter).not.toBeNull();
  const newSubmission = getByText(/A Different Submission/i);
  expect(newSubmission).toHaveClass("submission--new");
});



test('if you dont publish anything you dont get any money', () => {
  const { getByTestId, getByText } = render(<App getNextTitle={getNextTitle}/>)

  //at the start, you have no money
  const moneyDisplay = getByTestId("money-display")
  expect(moneyDisplay).toHaveTextContent('$0')

  finishMonth(getByText);

  //now you have money!
  const moneyDisplayAfter = getByTestId("money-display")
  expect(moneyDisplayAfter).toHaveTextContent('$0')

});

test('published submissions give money each month.', () => {
  const { getByTestId, getByText } = render(<App getNextTitle={getNextTitle}/>)

  //at the start, you have no money
  const moneyDisplay = getByTestId("money-display")
  expect(moneyDisplay).toHaveTextContent('$0')

  //then you publish a book and go forward by a month
  const publishButton = getByText(/Publish/i)
  fireEvent.click(publishButton)
  finishMonth(getByText);

  //now you have money!
  const moneyDisplayAfter = getByTestId("money-display")
  expect(moneyDisplayAfter).toHaveTextContent('$1')

  //and after another month you have even more!
  finishMonth(getByText);
  const moneyDisplayAfterAfter = getByTestId("money-display")
  expect(moneyDisplayAfterAfter).toHaveTextContent('$2')
});

test('if you publish more books, you get more money', () => {
  const { getByTestId, getByText } = render(<App getNextTitle={getNextTitle}/>)

  //then you publish a book and go forward by a month
  const publishButton = getByText(/Publish/i)
  fireEvent.click(publishButton)
  finishMonth(getByText);

  //now you have money!
  const moneyDisplayAfter = getByTestId("money-display")
  expect(moneyDisplayAfter).toHaveTextContent('$1')

  //publish another book
  const publishButton2 = getByText(/Publish/i)
  fireEvent.click(publishButton2)
  finishMonth(getByText);

  //that book stays on display too
  getByText(/A Different Submission/);

  //and you have even more moeny!
  const moneyDisplayAfterAfter = getByTestId("money-display")
  expect(moneyDisplayAfterAfter).toHaveTextContent('$3')

});
