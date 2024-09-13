import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { http, HttpResponse } from 'msw';

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
    onSubmit: action('submit'),
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {};
