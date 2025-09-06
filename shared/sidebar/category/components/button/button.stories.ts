import type { Meta, StoryObj } from '@storybook/react';
import { CategoryButton } from './button';

const meta: Meta<typeof CategoryButton> = {
    title: 'Components/CategoryButton',
    component: CategoryButton,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategoryButton>;

export const Default: Story = {
    args: {
        name: '技術',
    },
};
