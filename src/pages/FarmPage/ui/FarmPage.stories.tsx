import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ThemeDecorator} from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {Theme} from "app/providers/ThemeProvider";
import FarmPage from "./FarmPage";

export default {
  title: "pages/MainPage",
  component: FarmPage,
  argTypes: {
    backgroundColor: {control: "color"},
  },
} as ComponentMeta<typeof FarmPage>;

const Template: ComponentStory<typeof FarmPage> = () => <FarmPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
