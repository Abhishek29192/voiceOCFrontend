import React, { useEffect, useState } from 'react'
import { useFetchNewMessageTemplate, useTemplateData } from '../../hooks/useQueryApi';
import { Base2 } from '../../components/Typography';
import { InputFieldWithoutCounter } from '../../components/InputField';
import { PrimaryButton } from '../../components/Button';
import { useAppCommonDataProvider } from '../../components/AppCommonDataProvider/AppCommonDataProvider';

export const NewTemplate = ({ setNewMessageTemplate, selectedMobileNumber }) => {
    const [templateData, setTemplateData] = useState()
    const [customVariable, setCustomVaraible] = useState([]);

    const { refetch } = useTemplateData();
    const { mutateAsync: newTemplate } = useFetchNewMessageTemplate()

    useEffect(() => {
        refetch().then((res) => setTemplateData(res?.data.data)).catch((err) => console.log(err))

    }, [])

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

    const handleSendTemplate = (ele) => {
        newTemplate({
            mobileNumber: selectedMobileNumber, customValues: customVariable, templateName: ele?.template_name,
        }).catch((err) => console.log(err?.message))
        setNewMessageTemplate(false)

    }


    return (
        <div className='w-[95%] mx-2 py-5 bg-white flex absolute bottom-28 z-50 h-[40vh] overflow-y-scroll rounded-xl'>
            <div className='px-4'>
                <div className=' '>
                    {templateData && templateData.map(ele => {
                        return (<>
                            <div className="bg-white px-3 my-2 h-[screen] flex flex-col border-b-[1px] py-2 ">
                                <Base2 Base2 className="poppins text-sm font-extrabold text-[#000000] items-center" >
                                    {ele?.template_name}
                                </Base2>
                                <div>{ele?.Body}</div>
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
                                                    onChange={(e) =>
                                                        handleCustomVariable(e)
                                                    }
                                                />
                                            </div>

                                        </div>
                                    );
                                })}
                                <div className='flex right-0 py-4 justify-end'>
                                    <PrimaryButton text="Send" value={ele} onClick={() => handleSendTemplate(ele)} />
                                </div>
                            </div>
                        </>)
                    })
                    }
                </div>
            </div>
        </div >
    )
}
