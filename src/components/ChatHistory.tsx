import React, { useRef, useState, useMemo } from "react";
import { Chat } from "../types/chat";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteUserChat } from "../api/chat";
import { FiMessageSquare, FiSearch } from "react-icons/fi";

interface ChatHistoryProps {
  chats: Chat[];
  onSelectChat: (id: number) => void;
  onNewConversation: () => void;
  refreshChats: () => void;
  loading: boolean; 
  onDeleteChat: (id: number) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chats,
  onSelectChat,
  onNewConversation,
  refreshChats,
  loading,
  onDeleteChat,
}) => {
  const dragData = useRef<{ [key: string]: { startX: number; currentX: number } }>({});
  const [deletedChatIds, setDeletedChatIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      (chat.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, chats]);

  const handleDragStart = (
    e: React.TouchEvent | React.MouseEvent,
    id: string | number
  ) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragData.current[id] = { startX: clientX, currentX: clientX };
  };

  const handleDragMove = (
    e: React.TouchEvent | React.MouseEvent,
    id: string | number
  ) => {
    if (!dragData.current[id]) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragData.current[id].currentX = clientX;

    const deltaX = clientX - dragData.current[id].startX;
    const el = document.getElementById(`chat-card-${id}`);
    if (el) {
      el.style.transform = `translateX(${Math.min(0, deltaX)}px)`;
    }
  };

  const handleDragEnd = async (
    _e: React.TouchEvent | React.MouseEvent,
    id: number
  ) => {
    if (!dragData.current[id]) return;
    const { startX, currentX } = dragData.current[id];
    const deltaX = currentX - startX;

    const el = document.getElementById(`chat-card-${id}`);
    if (el) {
      if (deltaX < -100) {
        try {
          await deleteUserChat(id);
          toast.success("Chat Deleted Successfully!");
          setDeletedChatIds((prev) => [...prev, id]);
          refreshChats();
          onDeleteChat(id);
        } catch {
          toast.error("Failed to delete chat");
          el.style.transition = "transform 0.3s ease";
          el.style.transform = "translateX(0)";
          setTimeout(() => {
            if (el) el.style.transition = "";
          }, 300);
        }
      } else {
        el.style.transition = "transform 0.3s ease";
        el.style.transform = "translateX(0)";
        setTimeout(() => {
          if (el) el.style.transition = "";
        }, 300);
      }
    }

    delete dragData.current[id];
  };

  const renderSkeletonItem = (key: number) => (
    <div key={`skeleton-${key}`} className="animate-pulse flex items-start p-4 bg-gray-100 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex flex-col gap-4 flex-1 pt-4 overflow-auto">
        <div className="pb-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {loading ? (
          <>
            {renderSkeletonItem(1)}
            {renderSkeletonItem(2)}
            {renderSkeletonItem(3)}
          </>
         ) : filteredChats.filter((chat) => !deletedChatIds.includes(chat.id)).length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
            <div className="border border-gray-300 rounded-full bg-gray-100 p-4 mb-4">
              <FiMessageSquare className="w-14 h-14 text-gray-400" />
            </div>
            
            <h2 className="text-xl font-semibold">No Chats Yet</h2>
            <p className="text-sm text-gray-500 mt-1">When you start a new conversation with our team, it will appear hear.</p>
          </div>
        ) : (
          filteredChats
            .filter((chat) => !deletedChatIds.includes(chat.id))
            .map((chat) => {
              const preview = chat.last_message?.content
                ? chat.last_message.content.slice(0, 80)
                : "No message yet";

              const adminInitial = chat.assigned_admin_info?.first_name?.trim()
                ? chat.assigned_admin_info.first_name.trim().charAt(0).toUpperCase()
                : chat.assigned_admin_info?.email?.charAt(0).toUpperCase() || "?";

              return (
                <div key={chat.id} className="relative">
                  <div className="absolute top-0 bottom-0 right-0 w-20 bg-red-600 flex items-center justify-center rounded-lg">
                    <MdDeleteOutline className="h-10 w-10 text-white" />
                  </div>

                  <div
                    id={`chat-card-${chat.id}`}
                    onClick={() => onSelectChat(chat.id)}
                    onMouseDown={(e) => handleDragStart(e, chat.id)}
                    onTouchStart={(e) => handleDragStart(e, chat.id)}
                    onMouseMove={(e) => handleDragMove(e, chat.id)}
                    onTouchMove={(e) => handleDragMove(e, chat.id)}
                    onMouseUp={(e) => handleDragEnd(e, chat.id)}
                    onTouchEnd={(e) => handleDragEnd(e, chat.id)}
                    onMouseLeave={(e) => handleDragEnd(e, chat.id)}
                    className="cursor-pointer flex items-start p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition relative z-10"
                    style={{ touchAction: "pan-y" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#023E8A] text-white flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                      {adminInitial}
                    </div>

                    <div className="flex flex-col">
                      <h3 className="font-semibold">{chat.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{preview}</p>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>

      <div className="border-t bg-white p-4 flex justify-center">
        <button
          onClick={onNewConversation}
          className="w-full max-w-[100%] md:max-w-[500px] bg-[#023E8A] text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
        >
          Start New Conversation
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;