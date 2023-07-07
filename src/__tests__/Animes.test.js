import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Animes from '../components/Animes';

const mockStore = configureMockStore([thunk]);

describe('Animes component', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    store = mockStore({
      animes: {
        animes: [
          {
            mal_id: 1,
            title: 'Anime 1',
            images: { jpg: { image_url: 'image1.jpg' } },
            reserved: true,
          },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    store.dispatch = dispatchSpy;
  });

  it('renders Animes component correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Animes />
        </BrowserRouter>
      </Provider>
    );

    const animeNameElement = screen.getByText('Anime 1');
    expect(animeNameElement).toBeInTheDocument();

    // Add more assertions as needed
  });

  it('dispatches cancelReservation action when Cancel Reservation button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Animes />
        </BrowserRouter>
      </Provider>,
    );

    const cancelReserveButton = screen.getByTestId('cancel-reservation-button');
    fireEvent.click(cancelReserveButton);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
  });
});
