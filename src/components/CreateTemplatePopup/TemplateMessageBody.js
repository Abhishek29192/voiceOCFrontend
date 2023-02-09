import React from "react";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { SecondaryButton } from "../Button";
import { InputTextArea } from "../InputField";
import { Caption1, Paragraph3 } from "../Typography";

export const TemplateMessageBody = () => {
  const { createTemplateValues, setCreateTemplateValues } =
    useAppCommonDataProvider();
  const { body } = createTemplateValues;

  return (
    <div className="p-3">
      <Paragraph3 className="p-2">Body</Paragraph3>
      <Caption1 className="p-2">
        To add a custom variable, please add a variable in double curly brackets
        without a space.
      </Caption1>
      <div className="p-2">
        <SecondaryButton
          text="Add Variables"
          onClick={() => {
            console.log("hfg", body.length);
          }}
        />
      </div>
      <div>
        <InputTextArea
          placeholder="Template Message..."
          className={" h-24 m-2 p-2 text-[12px]"}
          text={body}
          onChange={(e) =>
            setCreateTemplateValues?.({
              ...createTemplateValues,
              body: e.target.value,
            })
          }
          charCount={body.length}
          maxLength={1024}
        />
      </div>
    </div>
  );
};
