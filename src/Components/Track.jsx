import { Music } from 'lucide-react';
function Track({trackname, trackduration}) {

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
  }

  const inminutes = millisToMinutesAndSeconds(trackduration)
  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors duration-200 cursor-pointer border-l-4 border-indigo-400">
      <div className="flex items-center">
        <div className="p-2 mr-3 bg-indigo-400 rounded-full text-indigo-800">
          <Music className="h-5 w-5" />
        </div>
        <div className="text-indigo-900 font-medium">{trackname}</div>
      </div>
      <div className="text-indigo-600 text-sm">{inminutes}</div>
    </div>
  );
}


export default Track