import { FaCalendarDay, FaChess } from "react-icons/fa";
import { AiOutlineLock, AiOutlineStock } from "react-icons/ai";
import { getScheduledLessons } from "../apis/backend-api.tsx";
import { useEffect, useState } from "react";
import { Lesson } from "../types.tsx";

const DailyTactics = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getScheduledLessons();
        const parsedLessons = data.map((lesson: Lesson) => {
          return {
            day: lesson["day"],
            icon: FaChess,
            theme: lesson["theme"],
            improvement: `+${lesson["improvement"]} elo`,
            isPremium: false,
          };
        });
        setLessons(parsedLessons);
        setLoading(false);
      } catch (err) {
        console.error("Error + " + err);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-3">Training Schedule</h2>
      <ul className="space-y-2">
        {!loading &&
          lessons.map((item) => (
            <li
              key={`day-${item.day}`}
              className={`border-b last:border-0 pb-2 last:pb-0 ${
                item.isPremium ? "opacity-50" : ""
              }`}
            >
              {!item.isPremium ? (
                <a href="#" className="text-gray-600 hover:text-black">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                      {/*<item.icon className="w-5 h-5" />*/}
                      <div className="flex flex-col">
                        <div className="font-medium">{item.day}</div>
                        <div>{item.theme}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineStock className="w-4 h-4" />
                      <span>{item.improvement}</span>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                      {/*<item.icon className="w-5 h-5" />*/}
                      <div className="flex flex-col">
                        <div className="font-medium">{item.day}:</div>
                        <div>{item.theme}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineLock />
                      <span>Premium</span>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
      {/* Premium CTA */}
      <div className="mt-4 text-center">
        <button className="bg-gray-500 text-white px-4 py-2 border-none rounded-md hover:bg-gray-600 transition-colors">
          <div className="flex flew-row gap-1">
            <FaCalendarDay />
            <div>Full Schedule</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DailyTactics;
