import { Music } from 'lucide-react';
function Track({trackname, trackduration}) {

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
  }

  const inminutes = millisToMinutesAndSeconds(trackduration)
  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors duration-200 cursor-pointer border-l-4 border-slate-700">
      <div className="flex items-center">
        <div className="p-2 mr-3 bg-slate-800 rounded-full">
          <Music className="h-5 w-5 text-slate-300" />
        </div>
        <div className="text-white font-medium">{trackname}</div>
      </div>
      <div className="text-slate-400 text-sm">{inminutes}</div>
    </div>
  );
}


export default Track