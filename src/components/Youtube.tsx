import {useEffect, useState} from "react";

const API_KEY = '';
export default function Youtube({ channelId = 'UCTJ0TIW_e3t3ToV_nGKgexw' }: { channelId?: string }) {
  // Initializing state variables to store the data fetched from the YouTube API
  const [channelName, setChannelName] = useState<string | null>(null);
  const [channelHandle, setChannelHandle] = useState<string | null>(null);
  const [channelBio, setChannelBio] = useState<string | null>(null);
  const [channelProfileUrl, setChannelProfileUrl] = useState<string | null>(null);
  const [subCount, setSubCount] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [joinDate, setJoinDate] = useState<string | null>(null);

  // Fetching data from the YouTube API
  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length < 1) {
          console.log(`Failed fetching ${channelId}!`);
        } else {
          // console.log(data);
          const snippet = data.items[0].snippet;
          const statistics = data.items[0].statistics;

          setChannelName(snippet.title);
          setChannelHandle(snippet.customUrl);
          setChannelBio(snippet.description);
          setChannelProfileUrl(snippet.thumbnails.default.url);
          setSubCount(statistics.subscriberCount);
          setVideoCount(statistics.videoCount);
          setViewCount(statistics.viewCount);
          setJoinDate(snippet.publishedAt);
        }
      })
  }, [channelId]);

  return (
    <div>
      <img src={channelProfileUrl || ''} alt="Channel Profile Picture" />
      <h1>{channelName || 'Channel Name'}</h1>
      <h2>({subCount || '...'} subscribers @{channelHandle})</h2>
      This channel has {videoCount || '...'} videos and {viewCount || '...'} views.
      <p>{channelBio}</p>
      <p>Joined on {joinDate || '...'}</p>
    </div>
  )
}