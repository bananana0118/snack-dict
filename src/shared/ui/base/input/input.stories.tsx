import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "."

const meta = {
  title: "Shared/UI/Base/Input",
  component: Input,
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
    type: {
      control: "text",
    },
    "aria-invalid": {
      control: "boolean",
    },
  },
  args: {
    placeholder: "Input",
    type: "text",
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    "aria-label": "기본 입력",
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
}

export const Placeholder: Story = {
  args: {
    "aria-label": "플레이스홀더 입력",
    placeholder: "텍스트를 입력하세요",
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    "aria-label": "비활성 입력",
    disabled: true,
    value: "Disabled",
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
}

export const Invalid: Story = {
  args: {
    "aria-label": "오류 입력",
    "aria-invalid": true,
    value: "Invalid",
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
}
