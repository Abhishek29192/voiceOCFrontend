import React from 'react'
import Modal from 'react-responsive-modal'
import { Base2 } from '../../../components/Typography'
import { BrodcastHistoryOverview } from '../../../components/BroadcastHistoryOverview/BrodcastHistoryOverview'
import { AiOutlineEye } from 'react-icons/ai'
import { RiCheckDoubleLine } from 'react-icons/ri'
import { BiCheck } from 'react-icons/bi'
import { TbCornerUpLeftDouble } from 'react-icons/tb'
import { MdOutlineSmsFailed } from 'react-icons/md'
import { HiOutlineArrowPath, HiOutlineQueueList } from 'react-icons/hi2'

const SingleBroadcastStatus = ({
    isOpen,
    onClose,
    className,
    classes,
    singleRowData,
}) => {

    console.log(singleRowData, "jmhn")
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            showCloseIcon
            center
            classNames={{ modal: `${className} ${classes}` }}
        >
            <div className="">
                <Base2 className="poppins p-3">Overview</Base2>
                <div className="flex flex-wrap pr-3 pl-3">
                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={<BiCheck size={"1.3rem"} color={"#5536db"} />}
                            statusText={"Sent"}
                            count={singleRowData?.sent}
                        />
                    </div>
                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={
                                <RiCheckDoubleLine size={"1.3rem"} color={"#5536db"} />
                            }
                            statusText={"Delivered"}
                            count={singleRowData?.sent}
                        />
                    </div>
                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={<AiOutlineEye size={"1.3rem"} color={"#5536db"} />}
                            statusText={"Read"}
                            count={singleRowData?.read}
                        />
                    </div>
                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={
                                <TbCornerUpLeftDouble size={"1.3rem"} color={"#5536db"} />
                            }
                            statusText={"Replied"}
                            count={singleRowData?.replied}
                        />
                    </div>

                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={
                                <MdOutlineSmsFailed size={"1.3rem"} color={"#5536db"} />
                            }
                            statusText={"Failed"}
                            count={singleRowData?.failed}
                        />
                    </div>
                    <div className="p-2">
                        <BrodcastHistoryOverview
                            component={
                                <HiOutlineArrowPath size={"1.3rem"} color={"#5536db"} />
                            }
                            statusText={"Processing"}
                            count={singleRowData?.contactCount - singleRowData?.sent}
                        />
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default SingleBroadcastStatus