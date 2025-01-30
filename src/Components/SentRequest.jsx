import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../Utils/axios';
import toastr from 'toastr';
import { UseCreatedContext } from '../Context/UserContext';

const SentRequest = ({ data, setData ,setTrigger}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { User } = UseCreatedContext();

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center text-2xl text-gray-500 h-40">
        No Sent Requests
      </div>
    );
  }

  const cancelRequest = (id) => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetcher
      .post(`friend/cancel-request`, {
        sender: User._id,
        receiver: id,
      })
      .then((res) => {
        const updatedData = data.filter((itm) => itm._id !== id);
        setData(updatedData);
        toastr.success('Friend request canceled successfully!');
        setTrigger(p=>!p)
      })
      .catch((err) => {
        toastr.error(err.response?.data?.message || 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full space-y-4 px-4">
      {data.map((itm, idx) => (
        <div
          className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          key={idx}
        >
          {/* Profile Picture */}
          <div className="w-fit">
            <img
              onClick={() => navigate(`/profile/${itm._id}`)}
              src={itm?.profile}
              className="cursor-pointer h-16 w-16 object-cover rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-200"
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col flex-grow text-white">
            <b className="text-lg md:text-xl">{itm.name}</b>
            <div className="mt-2">
              <button
                onClick={() => cancelRequest(itm._id)}
                disabled={loading}
                className={`py-2 px-4 rounded font-semibold transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-700 hover:bg-red-800'
                }`}
              >
                {loading ? 'Processing...' : 'Cancel Request'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentRequest;
