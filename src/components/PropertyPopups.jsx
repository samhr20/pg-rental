import React, { useState } from 'react'
import useProperties from '../context/PropertiesContext'
import { supabase } from '../call_handler/supabase-client'
import { useNavigate } from 'react-router-dom'

const PropertyPopups = ({
    children,
    heading,
    primaryColor = '#1f2937',
    subHeading,
    suretyMsg,
    firstButton = 'Cancel',
    secondButton = 'Confirm',
}) => {
    const { closePopup, popup } = useProperties()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [btnText, setBtnText] = useState('')
    const { setThisProperty } = useProperties()

    const deleteHandler = async (propertyId) => {

        try {
            setLoading(true)
            setErrorMsg(null)
            setBtnText('Deleting')

            const { data, error } = await supabase
                .from('Properties')
                .delete()
                .eq('id', propertyId)

            if (error) {
                setErrorMsg(error.message || 'Failed to delete property')
                setLoading(false)
                return
            }

            closePopup()
            navigate('/properties')
            alert('Property Deleted')
        } catch (err) {
            setErrorMsg(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const blockHandler = async (propertyId) => {
        try {
            setLoading(true)
            setErrorMsg(null)
            setBtnText("Blocking...")

            const { data, error } = await supabase
                .from('StatusControls')
                .update({
                    isBlocked: true,
                    active: false
                })
                .eq('pg_id', propertyId)

            if (error) {
                setErrorMsg(error.message || 'Failed to block property')
                setLoading(false)
                return
            }

            closePopup()
            alert('Property Blocked')
            setThisProperty(prev => ({
                ...prev,
                StatusControls: [
                    {
                        ...prev.StatusControls[0],
                        isBlocked: true,
                        active: false
                    }
                ]
            }));

        } catch (error) {
            setErrorMsg(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const unblockHandler = async (propertyId) => {
        try {
            setLoading(true)
            setErrorMsg(null)
            setBtnText("Unblocking...")

            const { data, error } = await supabase
                .from('StatusControls')
                .update({
                    isBlocked: false,
                    active: true
                })
                .eq('pg_id', propertyId)

            if (error) {
                setErrorMsg(error.message || 'Failed to unblock property')
                setLoading(false)
                return
            }

            closePopup()
            alert('Property Unblocked')
            setThisProperty(prev => ({
                ...prev,
                StatusControls: [
                    {
                        ...prev.StatusControls[0],
                        isBlocked: false,
                        active: true
                    }
                ]
            }));

        } catch (error) {
            setErrorMsg(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const verifyHandler = async (propertyId) => {
        try {
            setLoading(true)
            setErrorMsg(null)
            setBtnText("Verifying...")

            const { data, error } = await supabase
                .from('StatusControls')
                .update({
                    isVerified: true,
                    active: true
                })
                .eq('pg_id', propertyId)

            if (error) {
                setErrorMsg(error.message || 'Failed to verify property')
                setLoading(false)
                return
            }

            closePopup()
            alert('Property verified')
            setThisProperty(prev => ({
                ...prev,
                StatusControls: [
                    {
                        ...prev.StatusControls[0],
                        isVerified: true,
                    }
                ]
            }));

        } catch (error) {
            setErrorMsg(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleSecondButton = async () => {
        const type = popup?.type

        if (type === 'block') {
            await blockHandler(popup.propertyId)
        }
        else if (type === 'unblock') {
            await unblockHandler(popup.propertyId)
        } else if (type === 'verify') {
            await verifyHandler(popup.propertyId)
        } else if (type === 'delete') {
            await deleteHandler(popup.propertyId)
        } else {
            console.log('Unknown popup type', type)
        }
    }

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

                    {errorMsg && (
                        <p className="text-[13px] text-red-600">{errorMsg}</p>
                    )}

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
                            disabled={loading}
                        >
                            {firstButton}
                        </button>

                        <button
                            className="w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] text-[white] custom-poppins cursor-pointer text-[14px] transition-all duration-200 hover:opacity-80 disabled:opacity-60"
                            style={{
                                backgroundColor: primaryColor,
                                borderColor: primaryColor,
                            }}
                            onClick={handleSecondButton}
                            disabled={loading}
                        >
                            {loading ? btnText : secondButton}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyPopups
