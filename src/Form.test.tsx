import { expect, test, describe, beforeAll, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import { setupServer } from 'msw/node';

import Meta, * as Stories from './Form.stories';
import { userEvent } from '@storybook/test';

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('Form', () => {
  test.concurrent(
    'should submit correct data',
    server.boundary(async () => {
      // Arrange
      server.use(...Stories.mockHandlers);
      const submitHandler = vi.fn();

      const Form = composeStory(Stories.Default, Meta);
      render(<Form onSubmit={submitHandler} />);

      await waitFor(() => {
        // check if the combobox has options
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
      });

      const combobox = screen.getByRole('combobox');
      // select the second option
      await userEvent.selectOptions(combobox, '2');

      const submitButton = await screen.findByRole('button', {
        name: 'Submit',
      });

      // Act
      await userEvent.click(submitButton);

      // Assert
      await expect(submitHandler).toHaveBeenCalledWith({ option: '2' });
    })
  );
});
