import React from 'react'
import useProperties from '../context/PropertiesContext'

const PropertyPopups = ({
    children,
    heading,
    primaryColor,
    subHeading,
    suretyMsg,
    firstButton,
    secondButton,
}) => {
    const { closePopup } = useProperties()
    

    return (
        <>
            <div
                onClick={closePopup}
                className="fixed inset-0 bg-black/80 z-[50]"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
                <div
                    className="bg-white w-[440px] rounded-[20px] p-[30px] flex flex-col gap-5 shadow-xl pointer-events-auto"
                >
                    <div className='flex flex-col gap-2'>
                        <p
                            className="custom-medium text-[18px]"
                            style={{ color: primaryColor }}
                        >
                            {heading}
                        </p>
                        <p className="text-[14px] custom-poppins">{subHeading}</p>
                    </div>

                    {children}

                    <p className="text-[12px] custom-poppins italic text-[#838383]">
                        {suretyMsg}
                    </p>

                    <div className="flex items-center justify-center gap-[20px]">
                        <button
                            className="cursor-pointer w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] custom-medium text-[14px] transition-all duration-200 hover:opacity-80"
                            style={{
                                borderColor: primaryColor,
                                color: primaryColor,
                                backgroundColor: 'transparent',
                            }}
                            onClick={closePopup}
                        >
                            {firstButton}
                        </button>

                        <button
                            className="w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] text-[white] custom-poppins cursor-pointer text-[14px] transition-all duration-200 hover:opacity-80"
                            style={{
                                backgroundColor: primaryColor,
                                borderColor: primaryColor,
                            }}
                        >
                            {secondButton}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyPopups
