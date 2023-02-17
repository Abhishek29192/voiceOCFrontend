import React from 'react'
import vid from "../../components/Videos/vid.mp4"
import { useAppCommonDataProvider } from '../AppCommonDataProvider/AppCommonDataProvider';
import { VideoPlayer } from '../VideoPlayer';

export const PreviewSection = () => {
    const { createTemplateValues, createSampleData } =
        useAppCommonDataProvider();
    const { body, footer } = createTemplateValues;
    const { contentOne, contentTwo, headerText } = createSampleData;
    const { mediaType } = createTemplateValues;
    console.log(mediaType, "media type")
    const content = body;
    const data = content.replace("{{1}}", `${contentOne}`)


    return (
        <>
            {(mediaType === "image") && (
                <div className='flex flex-col bg-white w-full rounded-md p-2 pt-4 pb-7 '>
                    <div className='font-bold'>{headerText}</div>
                    <div className='text-xs flex-wrap'>{data}</div>
                    <div>{footer}</div>
                    <div className='pt-4 pb-5 text-xs'>{contentTwo}</div>
                </div>
            )}
            {(mediaType === "IMAGES" || mediaType === "images") && (
                <div className='flex flex-col bg-white w-full rounded-md p-2 pt-4 pb-7 '>
                    <div className='font-bold'>{headerText}</div>
                    <div className='text-xs flex-wrap'>{data}</div>
                    <div>{footer}</div>
                    <div className='pt-4 pb-5 text-xs'>{contentTwo}</div>
                </div>
            )}
            {(mediaType === "DOCUMENT" || mediaType === "document") && (
                <div className='flex flex-col bg-white w-full rounded-md p-2 pt-4 pb-7 '>
                    <object title='document' className='border rounded-lg mb-4'></object>
                    <div className='font-bold'>{headerText}</div>
                    <div className='text-xs flex-wrap'>{data}</div>
                    <div>{footer}</div>
                    <div className='pt-4 pb-2 text-xs'>{contentTwo}</div>
                </div>
            )}
            {(mediaType === "VIDEO" || mediaType === "video") && (
                <div className='flex flex-col bg-white w-full rounded-md p-2 pt-4 pb-7 '>
                    {/* <object title='document' className='border rounded-lg mb-4'></object> */}
                    <div className='pb-5'>
                        {/* <video width="280" height="400" controls>
                            <source src={vid} type="video/mp4" />
                        </video> */}
                        <VideoPlayer videoUrl={vid} />
                    </div>
                    <div className='font-bold'>{headerText}</div>
                    <div className='text-xs flex-wrap pl-4 pr-4'>{data}</div>
                    <div>{footer}</div>
                    <div className='pt-4 pb-2 text-xs'>{contentTwo}</div>
                </div>
            )}
            {/* <div className='flex flex-col bg-white w-full rounded-md p-2 pt-4 pb-7 '>
                <div className='font-bold'>{headerText}</div>
                <div className='text-xs flex-wrap'>{data}</div>
                <div>{footer}</div>
                <div className='pt-4 pb-5 text-xs'>{contentTwo}</div>
            </div> */}
        </>
    )
}
