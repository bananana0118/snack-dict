import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import type { SnackDictSearchInputProps } from ".";
import { SnackDictSearchInput } from ".";

const meta = {
  title: "Shared/UI/SnackDict/SearchInput",
  component: SnackDictSearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
  args: {
    "aria-label": "과자 검색",
    placeholder: "과자명 검색",
  },
} satisfies Meta<typeof SnackDictSearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function ActiveSearchInputExample(args: SnackDictSearchInputProps) {
  const [active, setActive] = useState(args.active);
  const [value, setValue] = useState(String(args.value ?? ""));

  return (
    <div className="w-96">
      <SnackDictSearchInput
        {...args}
        active={active}
        value={value}
        onFocus={() => setActive(true)}
        onChange={(event) => setValue(event.currentTarget.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <SnackDictSearchInput {...args} />
    </div>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <div className="w-80">
      <SnackDictSearchInput
        {...args}
        onSearch={(value) => {
          console.info("search", value);
        }}
      />
    </div>
  ),
};

export const ActivePlaceholder: Story = {
  args: {
    active: true,
    "aria-label": "활성 과자 검색",
    placeholder: "과자명 검색",
  },
  render: (args) => <ActiveSearchInputExample {...args} value="" />,
};

export const ActiveWithValue: Story = {
  args: {
    active: true,
    "aria-label": "활성 과자 검색",
    value: "새우깡",
  },
  render: (args) => <ActiveSearchInputExample {...args} />,
};
