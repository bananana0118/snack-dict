import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SnackDictCriteriaAccordion } from ".";

const meta = {
  title: "Shared/UI/SnackDict/CriteriaAccordion",
  component: SnackDictCriteriaAccordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SnackDictCriteriaAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[343px] max-w-full">
      <SnackDictCriteriaAccordion />
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="w-[343px] max-w-full">
      <SnackDictCriteriaAccordion defaultOpen={false} />
    </div>
  ),
};
