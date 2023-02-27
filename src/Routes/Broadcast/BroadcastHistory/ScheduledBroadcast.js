import { CommentsDisabledOutlined } from '@mui/icons-material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import BroadcastOptions from '../../../components/BroadcastOptions'
import { PrimaryButton } from '../../../components/Button';
import { InputFieldWithoutCounter } from '../../../components/InputField';
import Navbar from '../../../components/Navbar'
import ContactTable from '../../../components/Table/contactTable';
import { Base2 } from '../../../components/Typography';
import { useSchedulBroadcastData } from '../../../hooks/useQueryApi';
import styles from "./BroadcastHistory.module.css";

export const ScheduledBroadcast = () => {
    let rowss = [];
    const { refetch } = useSchedulBroadcastData();
    const [scheduleBroadcastdata, setScheduleBroadcastData] = useState([])
    const [tableRows, setTableRows] = useState([]);


    const columns = [
        {
            field: 'broadcastName',
            renderHeader: (params) => (
                <p className='text-lg font-bold'>Broadcast name</p>
            ),
            width: 400,
            editable: true,
        },
        {
            field: 'scheduleDate',
            // headerName: 'Last name',
            renderHeader: (params) => (
                <p className='text-lg font-bold ml-5' >Scheduled</p>
            ),
            width: 400,
            editable: true,
        },
        {
            field: 'scheduleTime',
            // headerName: 'Age',
            renderHeader: (params) => (
                <p className='text-lg font-bold ml-7'>Time</p>
            ),
            type: 'number',
            width: 110,
            editable: true,
        },
    ];

    useEffect(() => {
        refetch().then((res) => {
            console.log(res.data.data, "ressssssssss")
            setScheduleBroadcastData(res?.data.data);

        }).catch((error) => console.log(error, "erroeeee"))
    }, [])


    useEffect(() => {
        let rowss =
            scheduleBroadcastdata?.map((e, index) => (
                {
                    id: index,
                    broadcastName: e.broadCastName,
                    scheduleDate: e.date,
                    scheduleTime: e.time
                }))
        setTableRows(rowss)
        console.log(rowss, "rowssss dataaaa")
    }, [scheduleBroadcastdata])


    return (
        <div>
            <Navbar />
            <div className="flex">
                <BroadcastOptions />
                <div className={styles.Brodcast_section}>
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                            <Base2 className={styles.sort__text}>Scheduled Broadcast</Base2>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <div className={styles.input__container}>
                            <InputFieldWithoutCounter
                                type={'text'}
                                placeholder="Search ..."
                                className={"h-11 w-60"}
                            />
                            <IoSearchOutline
                                className="absolute top-[0.65rem] right-2"
                                size={"1.6rem"}
                            />
                        </div>
                        <PrimaryButton text={"New Broadcast"} />
                    </div>
                    <div className='mt-12'>
                        <ContactTable
                            tableContent="broadcastData" // rows={createData(data?.data)}
                            rows={tableRows}
                            columns={columns}
                            rowHeight={100}
                        // checkboxSelection={"none"}
                        // onSelectionModelChange={onSelectionModelChange}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}   