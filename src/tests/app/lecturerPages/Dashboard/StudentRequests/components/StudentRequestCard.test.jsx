import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LecturerRequest from '../../../../../../models/lecturerRequest';
import { lecturerRequestResponseData } from '../../../../../data/lecturerRequestResponseData';
import 'intersection-observer';
import StudentRequestCard from '../../../../../../app/lecturerPages/Dashboard/StudentRequests/components/StudentRequestCard';

const mockStore = configureMockStore([thunk]);

describe('Lecturer - Request Card', () => {
  let store;
  let request;

  beforeEach(() => {
    store = mockStore({});
    request = new LecturerRequest(lecturerRequestResponseData);
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestCard studentReq={request} />
        </BrowserRouter>
      </Provider>,
    );
    const idComponent = screen.getByText(
      `Student Index : ${request.student.student_id}`,
    );
    const emailComponent = screen.getByText(`Email : ${request.student.email}`);
    const labComponent = screen.getByText(`Lab : ${request.lab.name}`);

    const button = screen.getByRole('button', {
      name: /View Request/i,
    });
    expect(idComponent).toBeInTheDocument();
    expect(emailComponent).toBeInTheDocument();
    expect(labComponent).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
