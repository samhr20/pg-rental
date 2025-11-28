import React from 'react';

const DetailRow = ({ label, value ,textColor , multiline = false }) => {
    return (
        <div className='flex  items-start justify-between'>
            <p className='text-[#838383] text-[12px] custom-poppins capitalize'>{label}</p>
            <p className={`${textColor ? `text-[${textColor}]` : 'text-black' } text-[12px] custom-poppins text-right  ${multiline ? "w-[147px]" : ' '}`}>{value}</p>
        </div>
    );
};

export default DetailRow;   