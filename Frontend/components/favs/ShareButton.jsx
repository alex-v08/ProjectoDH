'use client'

import React, { useState, useEffect, useRef } from 'react'
import MediaShare from '../mediaShare/MediaShare'

export default function ShareButton() {
  const [isMediaShareVisible, setIsMediaShareVisible] = useState(false)
  const buttonRef = useRef(null)
  const mediaShareRef = useRef(null)

  const toggleMediaShare = () => {
    setIsMediaShareVisible(!isMediaShareVisible)
  }

  const handleClickOutside = event => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      mediaShareRef.current &&
      !mediaShareRef.current.contains(event.target)
    ) {
      setIsMediaShareVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative'>
      <button onClick={toggleMediaShare} ref={buttonRef}>
        <svg
          width='20'
          height='21'
          viewBox='0 0 20 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.3332 15.9143L6.9546 12.9808C6.43831 13.4933 5.78184 13.8414 5.06797 13.9814C4.35409 14.1213 3.61476 14.0468 2.94319 13.7672C2.27162 13.4875 1.69786 13.0153 1.29427 12.4101C0.890668 11.8049 0.675293 11.0937 0.675293 10.3662C0.675293 9.63875 0.890668 8.92757 1.29427 8.32233C1.69786 7.7171 2.27162 7.2449 2.94319 6.96527C3.61476 6.68564 4.35409 6.6111 5.06797 6.75104C5.78184 6.89098 6.43831 7.23915 6.9546 7.75164L12.3332 4.81814C12.1487 3.95265 12.282 3.04968 12.7085 2.27436C13.1351 1.49903 13.8265 0.903156 14.6563 0.595704C15.4861 0.288252 16.3989 0.289766 17.2276 0.59997C18.0564 0.910174 18.7458 1.50834 19.1698 2.28508C19.5938 3.06181 19.7241 3.96522 19.5367 4.83009C19.3494 5.69496 18.857 6.4635 18.1496 6.99516C17.4422 7.52682 16.567 7.78608 15.6842 7.72553C14.8013 7.66498 13.9698 7.28866 13.3416 6.66539L7.96295 9.59889C8.0701 10.1045 8.0701 10.6269 7.96295 11.1325L13.3416 14.067C13.9698 13.4438 14.8013 13.0674 15.6842 13.0069C16.567 12.9463 17.4422 13.2056 18.1496 13.7373C18.857 14.2689 19.3494 15.0375 19.5367 15.9023C19.7241 16.7672 19.5938 17.6706 19.1698 18.4473C18.7458 19.2241 18.0564 19.8222 17.2276 20.1325C16.3989 20.4427 15.4861 20.4442 14.6563 20.1367C13.8265 19.8293 13.1351 19.2334 12.7085 18.4581C12.282 17.6827 12.1487 16.7798 12.3332 15.9143Z'
            fill='#0EA5E9'
          />
        </svg>
      </button>
      {isMediaShareVisible && (
        <div ref={mediaShareRef}>
          <MediaShare />
        </div>
      )}
    </div>
  )
}
