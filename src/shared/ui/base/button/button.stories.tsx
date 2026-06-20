import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ExternalLink, Search, Settings } from "lucide-react"

import { Button } from "./button"

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
  "unstyled",
] as const

const sizes = [
  "xs",
  "sm",
  "default",
  "lg",
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
  "unstyled",
] as const

const meta = {
  title: "Shared/UI/Base/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} aria-label={size.includes("icon") ? size : undefined}>
          {size.includes("icon") ? <Search /> : size}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button aria-invalid>Invalid</Button>
      <Button variant="outline" aria-expanded>
        Expanded
      </Button>
      <Button>
        <Settings />
        With icon
      </Button>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AsChild: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Open link
        <ExternalLink />
      </a>
    </Button>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
