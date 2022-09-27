import { ResponsivePie } from "@nivo/pie";
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '../social/Cookie';


const data = [
  {
    id: "1주차",
    value: 4,
  },
  {
    id: "Tue",
    value: 5,
  },
  {
    id: "Wen",
    value: 12,
  },
  {
    id: "Thu",
    value: 2,
  },
  {
    id: "Fri",
    value: 8,
  },
  {
    id: "Sat",
    value: 16,
  },
  {
    id: "Sun",
    value: 9,
  },
];
const Weekly = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token: string = getCookie("token") as string;

//오늘 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month  + '-' + day;

  
  const dayStudyData = async () => {
    return await axios
    .get(`${BASE_URL}/api/v1/weekStudies/details?date=${dateString}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((res) => {
      console.log('요일별',res)
    })
  };
  
  useEffect(() => {
    dayStudyData();
  }, []);

  return (
    <ResponsivePie
    enableArcLinkLabels={false}
    data={data}
    margin={{ top: 35, right: 35, bottom: 35, left: 35 }}
    innerRadius={0.5}
    padAngle={2}
    cornerRadius={7}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "yellow_orange_red" }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="black"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 30,
        itemsSpacing: 2,
        itemWidth: 40,
        itemHeight: 20,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 10,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
  )
  }
;
export default Weekly;
