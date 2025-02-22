const UserActions = ({ roomId, userId, onBlockUser, onPrivilegeLift }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="space-y-4 w-1/2 max-w-md">
      <button
        onClick={() => onBlockUser({ room_id: roomId, user_id: userId })}
        className="w-full p-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
      >
        Block User
      </button>
      <button
        onClick={() => onPrivilegeLift({ room_id: roomId, user_id: userId })}
        className="w-full p-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Lift Privilege
      </button>
    </div>
  </div>
);

export default UserActions;
