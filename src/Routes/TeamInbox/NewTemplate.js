import React, { useEffect, useState } from "react";
import {
    useFetchNewMessageTemplate,
    useTemplateData,
} from "../../hooks/useQueryApi";
import { Base2 } from "../../components/Typography";
import {
    FileUploadbutton,
    InputFieldWithoutCounter,
} from "../../components/InputField";
import { PrimaryButton } from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewTemplate = ({ setNewMessageTemplate, selectedMobileNumber }) => {
    const [templateData, setTemplateData] = useState();
    const [customVariable, setCustomVaraible] = useState([]);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState({});

    const { refetch } = useTemplateData();
    const { mutateAsync: newTemplate } = useFetchNewMessageTemplate();

    useEffect(() => {
        refetch()
            .then((res) => setTemplateData(res?.data.data))
            .catch((err) => console.log(err));
    }, []);

    const handleCustomVariable = (e) => {
        const { name, value } = e.target;
        if (customVariable.length === 0) {
            setCustomVaraible([
                ...customVariable,
                {
                    [name]: value,
                },
            ]);
        } else {
            const data = [...customVariable];
            const doesExist = data.find((e) => Object.keys(e).includes(name));
            const index = data.findIndex((e) => Object.keys(e).includes(name));

            if (doesExist === undefined) {
                data.push({
                    [name]: value,
                });
            } else {
                data[index][name] = value;
            }
            setCustomVaraible(data);
        }
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0], "grthhhj,")
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleSendTemplate = (ele) => {
        let data;
        if (ele.Type == "MEDIA") {
            if (fileName) {
                data = new FormData();
                data.set("mobileNumber", selectedMobileNumber);
                data.set("templateName", ele?.template_name);
                data.set("customValues", JSON.stringify(customVariable));
                data.append("media", file);


            } else {
                toast.error(`Upload file!!!`, {
                    autoClose: 1500,
                    closeOnClick: true,
                    position: "top-right",
                });
            }
        } else {
            data = {
                mobileNumber: selectedMobileNumber,
                customValues: JSON.stringify(customVariable),
                templateName: ele?.template_name,
            };
        }
        newTemplate(data).catch((err) => console.log(err?.message));
        setNewMessageTemplate(false);
        setFile({})
    };



    return (
        <div className="w-[95%] mx-2 py-5 bg-white flex absolute bottom-28 z-50 h-[50vh] overflow-y-scroll rounded-xl">
            <div className="px-4">
                <div className=" ">
                    {templateData &&
                        templateData.map((ele) => {
                            return (
                                <>
                                    <div className="bg-white px-3 my-2 h-[screen] flex flex-col border-b-[1px] py-2 ">
                                        <Base2
                                            Base2
                                            className="poppins text-sm font-extrabold text-[#000000] items-center"
                                        >
                                            {ele?.template_name}
                                        </Base2>
                                        <div>{ele?.Body}</div>

                                        <div className="w-full flex justify-end items-center">
                                            {ele.Type === "MEDIA" ? (
                                                (ele.MediaType === "image" ? (
                                                    <div className=" w-[100%] my-3  items-center flex">
                                                        {console.log(ele.MediaType, "image")}
                                                        <FileUploadbutton
                                                            accept={"image/*"}
                                                            className={"h-8"}
                                                            onChange={(e) => {
                                                                handleFileChange(e);
                                                            }}
                                                            fileName={fileName ? fileName : "Select a file"}
                                                        />
                                                        <ToastContainer theme="light" />
                                                    </div>
                                                ) : (
                                                    ele.MediaType === "document" ? (
                                                        <div className=" w-[100%] my-3  items-center flex">
                                                            {console.log(ele.MediaType, "document")}
                                                            <FileUploadbutton
                                                                accept={"image/*"}
                                                                className={"h-8"}
                                                                onChange={(e) => {
                                                                    handleFileChange(e);
                                                                }}
                                                                fileName={fileName ? fileName : "Select a file"}
                                                            />
                                                            <ToastContainer theme="light" />
                                                        </div>
                                                    ) : (
                                                        <div className=" w-[100%] my-3  items-center flex">
                                                            <FileUploadbutton
                                                                accept={"image/*"}
                                                                className={"h-8"}
                                                                onChange={(e) => {
                                                                    handleFileChange(e);
                                                                }}
                                                                fileName={fileName ? fileName : "Select a file"}
                                                            />
                                                            <ToastContainer theme="light" />
                                                        </div>
                                                    )
                                                ))
                                                // <div className=" w-[100%] my-3  items-center flex">
                                                //     <FileUploadbutton
                                                //         accept={"image/*,.doc, .docx,.mp4,.pdf"}
                                                //         className={"h-8"}
                                                //         onChange={(e) => {
                                                //             handleFileChange(e);
                                                //         }}
                                                //         fileName={fileName ? fileName : "Select a file"}
                                                //     />
                                                //     <ToastContainer theme="light" />
                                                // </div>
                                            ) : null}
                                        </div>
                                        {ele?.customFields?.map((e, index) => {
                                            return (
                                                <div>
                                                    <div className="poppins mx-1 mt-2 font-semibold">
                                                        Custom Fields : {index + 1}
                                                    </div>
                                                    <div className="my-1 font-semibold">
                                                        <InputFieldWithoutCounter
                                                            placeholder={"Custom Fields"}
                                                            name={`customField${index}`}
                                                            className="w-full bg-slate-200"
                                                            onChange={(e) => handleCustomVariable(e)}
                                                        />
                                                    </div>
                                                </div>

                                            );
                                        })}
                                        <div className="flex py-4 ">
                                            <PrimaryButton
                                                text="Send"
                                                value={ele}
                                                onClick={() => handleSendTemplate(ele)}
                                            />
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
