import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, waitFor, within, expect, fn } from '@storybook/test';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    msw: {
      handlers: [
        http.get('/api/options', () => {
          return HttpResponse.json({
            options: [
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ],
          });
        }),
      ],
    },
  },
  args: {
    onSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('select option 2', async () => {
      await waitFor(() =>
        expect(canvas.getByRole('combobox')).toHaveTextContent('Option 1')
      );
      await userEvent.selectOptions(canvas.getByRole('combobox'), '2');
    });

    await step('submit form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    });

    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith({ option: '2' })
    );
  },
};
