
import { render, screen, fireEvent, waitFor, act, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import Login from '../login'
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
const storeRender = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )
}


describe("Request Services Component Tests", function () {

  test('login Heading', () => {
    storeRender();
    const linkElement = screen.getByTestId("login-header");
    expect(linkElement).toBeTruthy();
  })
  test('mail lable text', () => {
    storeRender();
    const linkElement = screen.getByTestId("login-mail");
    expect(linkElement).toBeTruthy();
  })
  test('mailInputField', () => {
    storeRender();
    const linkElement = screen.getByTitle("login-mailID");
    expect(linkElement).toBeTruthy();
  })
  test('password lable text', () => {
    storeRender();
    const linkElement = screen.getByTitle("login-password");
    expect(linkElement).toBeTruthy();
  })
  test('passwordINputField', () => {
    storeRender();
    const linkElement = screen.getByTitle("login-passcode");
    expect(linkElement).toBeTruthy();
  })
  test('login_btn', () => {
    storeRender();
    const linkElement = screen.getByTestId("login-btn1");
    expect(linkElement).toBeTruthy();
  })
  test('form', () => {
    storeRender();
    const linkElement = screen.getByTestId("form");
    expect(linkElement).toBeTruthy();
  })

});

describe("Component Tests", function () {

  test('password input event testing', () => {
    storeRender();
    fireEvent.change(screen.getByTitle('login-passcode'), { target: { value: '12344' } });
    expect(screen.getByTitle('login-passcode').value).toBe('12344');
  })

  test('mail input event testing', () => {
    storeRender();
    fireEvent.change(screen.getByTitle('login-mailID'), { target: { value: 'mail@gmai.com' } });
    expect(screen.getByTitle('login-mailID').value).toBe('mail@gmai.com');
  })

  test('Error message for empty email box',  () => {
    storeRender()
      fireEvent.change(screen.getByTestId('EID'), {target: { value: '' },});
      fireEvent.click(screen.getByTestId('login-btn'))
    expect(screen.getByTestId('mailValidity')).toHaveTextContent("please enter something")
  });

  test('Error message for empty password box and filled email box', async () => {
    storeRender()
    fireEvent.change(screen.getByTitle('login-mailID'), { target: { value: 'mail@gmai.com' } });
    expect(screen.getByTitle('login-mailID').value).toBe('mail@gmai.com');
    await act(async () => {
      fireEvent.change(screen.getByTestId('login-pass'), {target: { value: '' },})
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('login-btn'))
    });
    expect(screen.getByTestId('validation')).toHaveTextContent("please enter something")
  });

  test('Error message for empty email box and filled password box', async () => {
    storeRender()
    await act(async () => {
      fireEvent.change(screen.getByTestId('EID'), {
        target: { value: '' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('login-btn'))
    });
    fireEvent.change(screen.getByTitle('login-passcode'), { target: { value: '12344' } });
    expect(screen.getByTitle('login-passcode').value).toBe('12344');
    expect(screen.getByTestId('mailValidity')).toHaveTextContent("please enter something")
  });

  test('Dissapearing Error message for filled email box and passwordBox', async () => {
    storeRender()
    fireEvent.click(screen.getByTestId('login-btn'))
    expect(screen.getByTestId('mailValidity')).toHaveTextContent("please enter something")
    await waitFor(async () => {
      fireEvent.change(screen.getByTitle('login-mailID'), {
        target: { value: 'mail@gmail.com' },
      });
      expect(screen.queryByTestId('mailValidity')).not.toBeInTheDocument("please enter something")
    });
    fireEvent.click(screen.getByTestId('login-btn'))
    expect(screen.getByTestId('validation')).toHaveTextContent("please enter something")
    await waitFor(async () => {
      fireEvent.change(screen.getByTitle('login-passcode'), {
        target: { value: '123444' },
      });
      expect(screen.queryByTestId('validation')).not.toBeInTheDocument("please enter something")
    });

  });

  test('Call handleLogin by Clicking login-btn', () => {
    storeRender();
    fireEvent.click(screen.getByTestId("login-btn"));
    expect(screen.getByTestId("login-btn")).toBeTruthy();
  })
})

