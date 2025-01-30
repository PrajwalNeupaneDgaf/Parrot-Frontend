import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseCreatedContext } from '../Context/UserContext';
import fetcher from '../Utils/axios';
import toastr from 'toastr';

const ReceivedRequest = ({ data, setData ,setTrigger }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { User } = UseCreatedContext();

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center text-2xl text-gray-500 h-40">
        No Received Requests
      </div>
    );
  }

  const cancelRequest = (id) => {
    if (loading) return;

    setLoading(true);
    fetcher
      .post(`friend/cancel-request`, {
        sender: id,
        receiver: User._id,
      })
      .then((res) => {
        const updatedData = data.filter((itm) => itm._id !== id);
        setData(updatedData);
        toastr.success('Friend request rejected successfully!');
        setTrigger(p=>!p)
      })
      .catch((err) => {
        toastr.error(err.response?.data?.message || 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAccept = (id) => {
    if (loading) return;

    setLoading(true);
    fetcher
      .post(`friend/accept-request`, {
        sender: id,
        receiver: User._id,
      })
      .then((res) => {
        const updatedData = data.filter((itm) => itm._id !== id);
        setData(updatedData);
        toastr.success('Friend request accepted successfully!');
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
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          key={idx}
        >
          {/* Profile Picture */}
          <div className="w-fit">
            <img
              onClick={() => navigate(`/profile/${itm._id}`)}
              src={itm?.profile}
              className="cursor-pointer h-16 w-16 object-cover rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform duration-200"
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col text-white">
            <b className="text-lg md:text-xl">{itm.name}</b>
            <div className="flex gap-2 pt-3">
              {/* Reject Button */}
              <button
                onClick={() => cancelRequest(itm._id)}
                disabled={loading}
                className={`py-2 px-4 rounded font-semibold transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
              {/* Accept Button */}
              <button
                onClick={() => handleAccept(itm._id)}
                disabled={loading}
                className={`py-2 px-4 rounded font-semibold text-white transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-700 hover:bg-green-800'
                }`}
              >
                {loading ? 'Processing...' : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedRequest;
