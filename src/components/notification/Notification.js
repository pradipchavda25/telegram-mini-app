import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

const Notification = ({ show, setShow, type = 'success', title, message }) => {
  const icons = {
    success: <CheckCircleIcon className="h-4 w-4 text-green-400" aria-hidden="true" />,
    warning: <ExclamationTriangleIcon className="h-4 w-4 text-red-400" aria-hidden="true" />,
    info: <InformationCircleIcon className="h-4 w-4 text-blue-400" aria-hidden="true" />,
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, setShow]);


  return (
    <div aria-live="assertive" className="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-2 sm:items-start sm:p-6">
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-300 transition" 
          leaveFrom="opacity-100 sm:translate-x-0"
          leaveTo="opacity-0 sm:translate-x-2"
          className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[#0C0C0C] shadow-lg ring-1 ring-neutral-800 border border-neutral-700 ring-opacity-5"
        >
          <div className="p-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {icons[type]}
              </div>
              <div className="ml-3 w-0 flex-1">
                {/* <p className="text-[12px] font-medium text-neutral-200">{title}</p> */}
                <p className="text-[14px] text-neutral-300">{message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-[#0C0C0C] text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setShow(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Notification;
