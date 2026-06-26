import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  SnackDictAccordion,
  SnackDictAccordionContent,
  SnackDictAccordionItem,
  SnackDictAccordionTrigger,
} from ".";

const meta = {
  title: "Shared/UI/SnackDict/Accordion",
  component: SnackDictAccordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SnackDictAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: (args) => (
    <div className="w-[343px] max-w-full">
      <SnackDictAccordion {...args}>
        <SnackDictAccordionItem value="item-1">
          <SnackDictAccordionTrigger>아코디언 제목</SnackDictAccordionTrigger>
          <SnackDictAccordionContent>
            <div className="py-4 text-[17px] leading-[1.4] tracking-[-1px]">
              아코디언 내용입니다.
            </div>
          </SnackDictAccordionContent>
        </SnackDictAccordionItem>
      </SnackDictAccordion>
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <div className="w-[343px] max-w-full">
      <SnackDictAccordion {...args}>
        <SnackDictAccordionItem value="item-1">
          <SnackDictAccordionTrigger>아코디언 제목</SnackDictAccordionTrigger>
          <SnackDictAccordionContent>
            <div className="py-4 text-[17px] leading-[1.4] tracking-[-1px]">
              접힌 상태에서 시작하는 아코디언 내용입니다.
            </div>
          </SnackDictAccordionContent>
        </SnackDictAccordionItem>
      </SnackDictAccordion>
    </div>
  ),
};

export const MultipleItems: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: (args) => (
    <div className="w-[343px] max-w-full">
      <SnackDictAccordion {...args}>
        <SnackDictAccordionItem value="item-1">
          <SnackDictAccordionTrigger>첫 번째 기준</SnackDictAccordionTrigger>
          <SnackDictAccordionContent>
            <div className="py-4 text-[17px] leading-[1.4] tracking-[-1px]">
              첫 번째 기준 내용입니다.
            </div>
          </SnackDictAccordionContent>
        </SnackDictAccordionItem>
        <SnackDictAccordionItem value="item-2">
          <SnackDictAccordionTrigger>두 번째 기준</SnackDictAccordionTrigger>
          <SnackDictAccordionContent>
            <div className="py-4 text-[17px] leading-[1.4] tracking-[-1px]">
              두 번째 기준 내용입니다.
            </div>
          </SnackDictAccordionContent>
        </SnackDictAccordionItem>
      </SnackDictAccordion>
    </div>
  ),
};
