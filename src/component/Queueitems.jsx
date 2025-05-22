import { SemiPie } from './Semipie';

const formatRemainingTime = (remaining) => {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const QueueItem = ({ item, index, progress }) => {
  const percentage = Math.min((progress / item.duration) * 100, 100);
  const remaining = item.duration - progress;
  const endTime = new Date(item.startTime.getTime() + item.duration * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-gradient-to-b from-[#393838] to-[#121624] w-[316px] h-[128px] rounded-md shadow-md px-3 py-2 text-white text-[9px] flex flex-col justify-between mb-4">
      {/* Top Row */}
      <div className="flex justify-between items-start px-1 pt-1">
        {/* Index + Name */}
        <div className="flex gap-2 items-center border-r border-gray-700 pr-3 mt-1">
          <span className="text-[20px] font-semibold">{index + 1}</span>
          <div className="leading-tight">
            <span className="text-[6px] text-gray-400">Name</span>
            <div className="text-[12px] font-medium">{item.name}</div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="relative flex items-center justify-center mt-1">
          <SemiPie percentage={percentage} />
          
        </div>

        {/* Remaining Time (same structure as "Name") */}
        <div className="flex gap-2 items-center border-l border-gray-700 pl-3 mt-1">
          <span className="text-[20px] font-semibold">{formatRemainingTime(remaining)}</span>
          <div className="leading-tight">
            <span className="text-[6px] text-gray-400">Remaining</span>
            <div className="text-[12px] font-medium">Time</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center text-[8px] px-2 pb-3 mt-1">
        {/* Start Time */}
        <div className="flex flex-col items-center">
          <span className="text-gray-400">Start Time</span>
          <span className="text-white text-[12px] font-medium">
            {item.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="h-[18px] border-r border-gray-700 mx-4"></div>

        {/* End Time */}
        <div className="flex flex-col items-center">
          <span className="text-gray-400">End Time</span>
          <span className="text-white text-[12px] font-medium">{endTime}</span>
        </div>
      </div>
    </div>
  );
};
