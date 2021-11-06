import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Lab from '../../../../../../models/lab';
import { labResponseData } from '../../../../../data/labResponseData';
import 'intersection-observer';
import LabCard from '../../../../../../app/studentPages/Dashboard/Labs/components/labCard';

const mockStore = configureMockStore([thunk]);

describe('Student - Lab Card', () => {
  let store;
  let lab;

  beforeEach(() => {
    store = mockStore({});
    lab = new Lab(labResponseData);
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabCard lab={lab} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(
      `${lab.department.code} ${lab.name}`,
    );
    const depComponent = screen.getByText(`Department: ${lab.department.name}`);
    const categoriesButton = screen.getByRole('button', {
      name: /View Categories/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(depComponent).toBeInTheDocument();
    expect(categoriesButton).toBeInTheDocument();
  });
});
