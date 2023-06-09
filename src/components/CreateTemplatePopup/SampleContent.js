import React from "react";
import {useAppCommonDataProvider} from "../AppCommonDataProvider/AppCommonDataProvider";
import {PrimaryButton, SecondaryButton} from "../Button";
import {InputField} from "../InputField";
import {Paragraph3} from "../Typography";

export const SampleContent = () => {
  const {createSampleData, setCreateSampleData} = useAppCommonDataProvider();
  const {contentOne, contentTwo} = createSampleData;
  return (
    <>
      <div className="p-3">
        <Paragraph3 className="p-2 pt-4">Sample Content</Paragraph3>
        <InputField
          placeholder="Enter text.."
          value={contentOne}
          onChange={(e) => {
            setCreateSampleData?.({
              ...createSampleData,
              contentOne: e.target.value,
            });
          }}
          className={"bg-slate-100 w-[97%] p-4 m-2 text-[12px] mb-5 "}
          charCountInput={"0"}
          maxLength={200}
        />
        <InputField
          placeholder="Enter text.."
          className={"bg-slate-100 w-[97%] p-4 m-2 text-[12px] mb-5 "}
          charCountInput={"0"}
          maxLength={200}
          value={contentTwo}
          onChange={(e) => {
            setCreateSampleData?.({
              ...createSampleData,
              contentTwo: e.target.value,
            });
          }}
        />
        <InputField
          placeholder="Enter text.."
          className={"bg-slate-100 w-[97%] p-4 m-2 text-[12px] mb-1 "}
          charCountInput={"0"}
          maxLength={200}
        />
        <Paragraph3 className="p-2 w-full text-xs">
          Make sure not to include any actual user or customer information, and
          provide only sample content in your examples.
        </Paragraph3>
      </div>
      <div className="float-right flex m-2">
        <div className="mr-4 ">
          <SecondaryButton text="Save as draft" className="h-full w-full" />
        </div>
        <div>
          <PrimaryButton text="Save and Submit" />
        </div>
      </div>
    </>
  );
};
