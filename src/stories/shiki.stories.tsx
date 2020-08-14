import React from "react";
import data from "../data.json";
import { storiesOf } from "@storybook/react";

const stories = storiesOf("Shiki", module);
for (const [key] of Object.entries(data)) {
  stories.add(key, () => {
    return <div dangerouslySetInnerHTML={{ __html: data[key] }} />;
  });
}
