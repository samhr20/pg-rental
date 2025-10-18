import React from 'react';

const ActionButton = ({ IconComponent, text, bgColor, textColor, iconColor ,onClick }) => {
    return (
        <div
        onClick={onClick}
            className="rounded-[40px] py-2.5 px-5 flex items-center justify-between gap-2.5 cursor-pointer"
            style={{ backgroundColor: bgColor }}
        >
            <IconComponent
                className="w-[26.8px] h-[26.8px]"
                style={{ color: iconColor }}
            />
            <p
                className="text-[12px] custom-poppins"
                style={{ color: textColor }}
            >
                {text}
            </p>
        </div>
    );
};

export default ActionButton;
