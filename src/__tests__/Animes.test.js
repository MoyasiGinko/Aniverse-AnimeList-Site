import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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
            id: 1,
            name: 'Anime 1',
            type: 'Type 1',
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
        <Animes />
      </Provider>,
    );

    const animeNameElement = screen.getByText('Anime 1');
    expect(animeNameElement).toBeInTheDocument();

    // Add more assertions as needed
  });

  it('dispatches cancelReservation action when Cancel Reservation button is clicked', () => {
    render(
      <Provider store={store}>
        <Animes />
      </Provider>,
    );

    const cancelReserveButton = screen.getByTestId('cancel-reservation-button');
    fireEvent.click(cancelReserveButton);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
  });
});
