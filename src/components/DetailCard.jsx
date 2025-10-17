import React from 'react';

const DetailCard = ({ title, children }) => {
    return (
        <div className='w-full rounded-[14px] border border-[#EEEDED] flex flex-col gap-4 p-5'>
            <p className='custom-medium text-[14px] text-[#FF6A00]'>{title}</p>
            {children}
        </div>
    );
};

export default DetailCard;