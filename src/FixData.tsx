import HandleSweepCoordinate from './HandleSweepCoordinate';
import HandleCounterClockwise from './HandleCounterClockwise';
import { DataItem } from './DeclareInterface';
interface Props {
  data: DataItem[];
  cx: number;
  cy: number;
  radius: number;
  clockwiseDirection: string
}
interface ParamForDraw {
  x: number;
  y: number;
  path: string;
}
interface FixDataResult {
  newData: DataItem[];
  totalValue: number;
  pathLists: ParamForDraw[]; // Ensure clockwiseDirection is always present in the result
}
function FixData({ data, cx, cy, radius,clockwiseDirection }: Props): FixDataResult {
  data.sort((item1, item2) => {
    return item2.value - item1.value;
  });
  let totalValue = 0;
  for (const item of data) {
    totalValue += item.value;
  }

  let newData: DataItem[] = [];
  let objectOther: DataItem = {
      title: 'Other',
      value: 0,
      color: "rgb(167, 58, 240)",
      percent: 0,
      sweepAngleRadians: 0,
  };
  data.forEach((item,i)=>{
    const percent = (+item.value / +totalValue) * 100;
    const angleSweep = (+item.value / +totalValue) * 360;
    const angleToRadians = (angleSweep * Math.PI) / 180;
    if(percent < 3){
      objectOther.percent += +percent.toFixed(2);
      objectOther.value += +item.value;
    } else {
        data[i].percent = +percent.toFixed(2);
        data[i].sweepAngleRadians = angleToRadians;
        newData.push(data[i])
    }
    if(i + 1 === data.length && objectOther.value !== 0){
      const angleSweep = (+objectOther.value / +totalValue) * 360;
      const angleToRadians = (angleSweep * Math.PI) / 180;
      objectOther.sweepAngleRadians = angleToRadians;
      newData.push(objectOther)
    }
  })
  let pathLists: ParamForDraw[] = []

  if(clockwiseDirection === "clockwise"){
    pathLists = HandleSweepCoordinate({ data: newData, cx, cy, radius });
  } else if (clockwiseDirection === "counter_clockwise"){
    pathLists = HandleCounterClockwise({ data: newData, cx, cy, radius });
  }

  const result = { newData, totalValue, pathLists };
  return result;
}
export default FixData;
