import React from 'react';

const ActionButton = ({ IconComponent, text, bgColor, textColor, iconColor }) => {
    return (
        <div className={`rounded-[40px] py-2.5 px-5 flex items-center justify-between gap-2.5 cursor-pointer bg-[${bgColor}]`}>
            <IconComponent className={`w-[26.8px] h-[26.8px] text-[${iconColor}]`} />
            <p className={`text-[12px] custom-poppins text-[${textColor}]`}>{text}</p>
        </div>
    );
};

export default ActionButton;


