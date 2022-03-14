/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AuthorForm from '../components/forms/authorForm';
import user from '@testing-library/user-event';

describe('Create Author Form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(
      <MockedProvider>
        <AuthorForm onFormSubmit={onSubmit} />
      </MockedProvider>
    );
  });

  it('onSubmit is called when all field validations ara passed', async () => {
    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    });
    user.type(firstName, 'Matthew');
    const surName = screen.getByRole('textbox', {
      name: /sur name/i,
    });
    user.type(surName, 'Gandy');
    const birthYear = screen.getByRole('spinbutton', {
      name: /birth year/i,
    });
    user.type(birthYear, '1967');
    user.click(screen.getByRole('button', { name: /Save/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      birthYear: '1967',
      firstName: 'Matthew',
      surName: 'Gandy',
    });
  });

  it('The form has three required fields', async () => {
    user.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sur Name is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Birth Year is required')).toBeInTheDocument();
    });
  });
});
