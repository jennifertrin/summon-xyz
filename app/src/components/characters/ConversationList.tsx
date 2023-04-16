import { Conversation } from "@xmtp/xmtp-js";

type ConversationList = {
  conversations: Conversation[] | undefined;
};

export default function ConversationList({ conversations }: ConversationList) {
  const headers = ["Conversation Name", "Scene"];

  function getConversationName(
    conversationId: string | undefined
  ): string | null {
    if (!conversationId) return null;
    const regex = /(?<=postIndustrial\/Mayor-).*/;
    const match = conversationId?.match(regex);
    return match ? match[0] : null;
  }

  function getSceneName(conversationId: string | undefined): string | null {
    if (!conversationId) return null;
    const regex = /(?<=postIndustrial\/Mayor-).*/;
    const match = conversationId.match(regex);
    if (match) {
      return match[0].replace(/-/g, " ");
    } else {
      return null;
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
      <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {conversations?.map((conversation) => (
            <tr className="bg-blue-500 border-b border-blue-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {getConversationName(conversation?.context?.conversationId)}
              </th>
              <td className="px-6 py-4">
                {getSceneName(conversation?.context?.conversationId)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
