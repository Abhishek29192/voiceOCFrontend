import React from "react";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { InputField } from "../InputField";
import { Caption1, Paragraph3 } from "../Typography";

export const TemplateFooter = () => {
  const { createTemplateValues } = useAppCommonDataProvider();
  const { footer } = createTemplateValues;
  return (
    <div>
      <Paragraph3 className="p-2 pt-4">Footer (Optional)</Paragraph3>
      <Caption1 className="p-2">
        Add a short line of text to the bottom of your message template.
      </Caption1>
      <InputField
        placeholder="Enter text.."
        value={footer}
        className={"bg-slate-100 w-[97%] p-4 m-2 text-[12px] mb-5 "}
        charCountInput={footer?.length}
        maxLength={60}
      />
    </div>
  );
};
