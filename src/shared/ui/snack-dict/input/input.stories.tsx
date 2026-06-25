import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SnackDictInput } from "."

const meta = {
  title: "Shared/UI/SnackDict/Input",
  component: SnackDictInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    "aria-invalid": {
      control: "boolean",
    },
  },
  args: {
    placeholder: "과자명 검색",
  },
} satisfies Meta<typeof SnackDictInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    "aria-label": "과자명",
  },
  render: (args) => (
    <div className="w-80">
      <SnackDictInput {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    "aria-label": "비활성 과자명",
    disabled: true,
    value: "허니버터칩",
  },
  render: (args) => (
    <div className="w-80">
      <SnackDictInput {...args} />
    </div>
  ),
}

export const Invalid: Story = {
  args: {
    "aria-label": "오류 과자명",
    "aria-invalid": true,
    value: "없는 과자",
  },
  render: (args) => (
    <div className="w-80">
      <SnackDictInput {...args} />
    </div>
  ),
}
