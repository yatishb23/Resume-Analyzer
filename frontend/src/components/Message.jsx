import React from 'react';

function Message({ text }) {
  return (
    <div className="flex justify-end my-2">
      <div className="bg-gray-700 text-white p-2.5 px-4 rounded-lg shadow-md max-w-[70%] break-words">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
