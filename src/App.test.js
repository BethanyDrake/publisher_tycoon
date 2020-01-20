import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

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
  const { getByText } = render(<App />);
  const submission = getByText(/A Submission/i);
  expect(submission).toBeDefined();
});

test('after clicking done, a different submisison is displayed', () => {
  const { getByText } = render(<App />);
  const doneButton = getByText(/Done/i);
  fireEvent.click(doneButton)
  const submission = getByText(/A Different Submission/i);
  expect(submission).toBeDefined();
});
