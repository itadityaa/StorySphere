{
  /* import React from "react";
import { formattedDate } from "../../utils/FormatDate";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatData = (stories) => {
  return stories.map((story) => ({
    name: formattedDate(story.createdAt),
    story: story.title.length,
    pv: story.pageViews || 0,
    amt: story.amt || 0,
  }));
};
const StoriesChart = ({ stories }) => {
  const data = formatData(stories);
  console.log(data);
  return (
    <div className="p-g bg-bgSecondary rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-4 text-center text-accentSecondary">
        Website Stats!
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type={"monotone"}
              dataKey="story"
              stroke="#d05549"
              fill="#d05549"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StoriesChart;  */
}

import React from "react";
import { formattedDate } from "../../utils/FormatDate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  defs,
  linearGradient,
} from "recharts";

const formatData = (stories) => {
  return stories.map((story) => ({
    name: formattedDate(story.createdAt),
    storyLength: story.title.length, // Length of the story title
  }));
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-bgSecondary text-accentSecondary p-2 rounded-lg shadow-md">
        <p>{`Date: ${payload[0].payload.name}`}</p>
        <p>{`Story Length: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const StoriesLengthChart = ({ stories }) => {
  const data = formatData(stories);

  return (
    <div className="p-g bg-bgSecondary rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-accentSecondary">
        Story Length Over Time
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorStoryLength" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d05549" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d05549" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d62828" />
            <XAxis dataKey="name" tick={{ fill: "#d05549" }}>
              <Label
                value="Date"
                offset={-10}
                position="insideBottom"
                fill="#d05549"
              />
            </XAxis>
            <YAxis tick={{ fill: "#d05549" }}>
              <Label
                value="Story Length"
                angle={-90}
                position="insideLeft"
                fill="#d05549"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="storyLength"
              stroke="url(#colorStoryLength)"
              strokeWidth={3}
              dot={{ stroke: "#d05549", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              fillOpacity={1}
              fill="url(#colorStoryLength)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StoriesLengthChart;
