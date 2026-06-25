import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from ".";

const meta = {
  title: "Shared/UI/Base/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[343px] max-w-full">
      <Accordion type="single" defaultValue="item-1" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>아코디언 제목</AccordionTrigger>
          <AccordionContent>아코디언 내용</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="w-[343px] max-w-full">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>아코디언 제목</AccordionTrigger>
          <AccordionContent>아코디언 내용</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
