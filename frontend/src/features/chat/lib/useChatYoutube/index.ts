import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import { useEffect, useRef } from "react";
import { type TAddVote } from "../useChatVote";
import { userStore } from "@/entities/auth";
import { useRecoilValue } from "recoil";
import { gomokuIsPlayState } from "@/entities/game/model/gomoku";

interface IYoutubeMessagesResponse {
  items: IYoutubeMessage[];
  kind: "youtube#liveChatMessageListResponse";
  etag: string;
  pollingIntervalMillis: number;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken: string;
}

interface IYoutubeMessage {
  kind: "youtube#liveChatMessage";
  etag: string;
  id: string;
  snippet: {
    type: "textMessageEvent";
    liveChatId: string;
    authorChannelId: string;
    publishedAt: string;
    hasDisplayContent: boolean;
    displayMessage: string;
    textMessageDetails: {
      messageText: string;
    };
  };
  authorDetails: {
    channelId: string;
    channelUrl: string;
    displayName: string;
    profileImageUrl: string;
    isVerified: boolean;
    isChatOwner: boolean;
    isChatSponsor: boolean;
    isChatModerator: boolean;
  };
}

const YOUTUBE_CHAT_API_URL =
  "https://www.googleapis.com/youtube/v3/liveChat/messages";
const YOUTUBE_LIVE_CHANNEL_ID = "";
const YOUTUBE_ACCESS_TOKEN = "";

function useChatYoutube(addVote: TAddVote) {
  const { getIsLogin } = userStore();

  const pushChatQueue = usePushChatQueue();
  let isActive = false;

  const isPlay = useRecoilValue(gomokuIsPlayState);
  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const getNextMessages = async (pageToken?: string) => {
    const params = new URLSearchParams({
      liveChatId: YOUTUBE_LIVE_CHANNEL_ID,
      part: "id,snippet,authorDetails",
    });
    if (pageToken) {
      params.set("pageToken", pageToken);
    }
    const res = await fetch(`${YOUTUBE_CHAT_API_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YOUTUBE_ACCESS_TOKEN}`,
      },
    });
    const data = (await res.json()) as IYoutubeMessagesResponse;
    onMessageHandler(data.items);

    await new Promise((resolve) =>
      setTimeout(async () => {
        isActive && (await getNextMessages(data.nextPageToken));
        resolve(true);
      }, data.pollingIntervalMillis),
    );
  };

  const onMessageHandler = (items: IYoutubeMessage[]) => {
    items.forEach((item) => {
      const status = isPlayRef.current
        ? addVote(
            item.authorDetails.channelId,
            processCoord(item.snippet.displayMessage),
          )
        : "normal";

      pushChatQueue({
        name: item.authorDetails.displayName,
        content: item.snippet.displayMessage,
        status,
        provider: "youtube",
      });
    });
  };

  const init = async () => {
    if (!getIsLogin() || !YOUTUBE_LIVE_CHANNEL_ID) return;
    isActive = true;
    await getNextMessages();
  };

  const cleanup = () => {
    isActive = false;
  };

  return { init, cleanup };
}

export default useChatYoutube;
