import React from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import BroadcastOptions from '../../../components/BroadcastOptions'
import { PrimaryButton } from '../../../components/Button';
import { InputFieldWithoutCounter } from '../../../components/InputField';
import Navbar from '../../../components/Navbar'
import ContactTable from '../../../components/Table/contactTable';
import { Base2 } from '../../../components/Typography';
import styles from "./BroadcastHistory.module.css";

export const ScheduledBroadcast = () => {

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            // renderCell: (params) => {
            //   return (
            //     <div className="flex flex-wrap text-2xl">
            //       headerName: 'First name',
            //     </div>
            //   );
            // },
            // headerName: 'First name',
            renderHeader: (params) => (
                <p className='text-lg font-bold'>Broadcast name</p>
            ),
            width: 300,
            editable: true,
        },
        {
            field: 'lastName',
            // headerName: 'Last name',
            renderHeader: (params) => (
                <p className='text-lg font-bold'>Scheduled</p>
            ),
            width: 300,
            editable: true,
        },
        {
            field: 'age',
            // headerName: 'Age',
            renderHeader: (params) => (
                <p className='text-lg font-bold ml-5'>Action</p>
            ),
            type: 'number',
            width: 110,
            editable: true,
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

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
                            rows={rows}
                            columns={columns}
                            rowHeight={140}
                        // checkboxSelection={"none"}
                        // onSelectionModelChange={onSelectionModelChange}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}   
