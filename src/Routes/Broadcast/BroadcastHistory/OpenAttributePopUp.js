import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { Base2 } from '../../../components/Typography';
import { useAppCommonDataProvider } from '../../../components/AppCommonDataProvider/AppCommonDataProvider';
import { SelectOptionButton } from '../../../components/SelectOptions';
import { PrimaryButton } from '../../../components/Button';
import styles from "./BroadcastHistory.module.css";

export const OpenAttributePopUp = ({
    isOpen,
    onClose,
    className,
    classes,
    selectedTabelRow,
}) => {
    const [number, setNumber] = useState()
    const { attributesData, setAttributesData, selectedContactRowData } = useAppCommonDataProvider()
    const [attributes, setAttributes] = useState([])

    const arr = [{
        0: number,
    },
    { 1: attributes }
    ]


    useEffect(() => {
        setAttributesData(arr)
    }, [attributes, number])



    const options = selectedTabelRow[0]?.customAttributes?.map((e, index) => {
        return { label: e, value: e }
    })


    const bg = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0)",
        },
        modal: {
            height: "770px",
        },
    };

    const colourStyles1 = {
        control: (styles) => {
            return {
                ...styles,
                backgroundColor: "white",
                width: "full",
                height: "2.7rem",
                boxShadow: "none",
                fontSize: "15px",
                fontFamily: "poppins",
                marginTop: "2px",
                // border: "1px solid #5536db",
                // "&:hover": {
                //   border: "1px solid #5536db",
                // },
            };
        },
        option: (styles, { data, isDisabled }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? "red" : "white",
                color: "#000",
                width: "full",
                fontSize: "15px",
                fontFamily: "poppins",
                cursor: isDisabled ? "not-allowed" : "pointer",
            };
        },
    };

    const handleNumber = (e) => {
        setNumber(e)
    }

    const handleCustomAttribute = (index, value) => {
        if (attributes.length === 0) {
            setAttributes([
                ...attributes,
                { [index]: value }
            ]);
        } else {
            const data = [...attributes];
            const doesExist = data.find((e) => Object.keys(e).includes(index + ''));
            const i = data.findIndex((e) => Object.keys(e).includes(index + ''));
            if (doesExist === undefined) {
                data.push(
                    { [index]: value },
                );
            } else {
                data[i][index] = value;
            }

            setAttributes(data);
        }
    }


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            showCloseIcon
            center
            styles={bg}
            classNames={{ modal: `${className} ${classes}` }}
        >
            <div>
                <div>
                    <Base2 className='text-2xl py-3 border-b-2'>{selectedTabelRow[0]?.basicInfo}</Base2>
                </div>
                <div>
                    <Base2>{selectedContactRowData?.Body}</Base2>
                </div>
                <div className='py-2'>
                    <Base2>Phone Number :</Base2>
                    <SelectOptionButton
                        options={options}
                        className={colourStyles1}
                        placeholder="Phone Number"
                        onChange={(e) => {
                            handleNumber(e.value)
                        }}
                    />
                </div>
                <div>
                    {
                        selectedContactRowData?.customFields?.map((e, index) => {
                            return (<div className='py-2'>
                                CustomField{index + 1}  : <SelectOptionButton
                                    options={options}
                                    className={colourStyles1}
                                    placeholder="Template Message"
                                    onChange={(e) => {
                                        handleCustomAttribute(index, e.value)
                                    }}

                                />

                            </div>)
                        })
                    }
                </div>
                <div className='flex justify-end my-3'>
                    <PrimaryButton text={"save"} disabled={!attributes} onClick={() => (attributes.length !== selectedContactRowData?.customFields.length - 1) ? onClose() : null} />
                </div>
            </div>
        </Modal>
    )
}
