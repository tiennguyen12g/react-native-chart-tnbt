import Type1 from "./Type1"
import Type2 from "./Type2";
import ConvertData from './ConvertData';
import { PieChartProps, DataItem } from './DeclareInterface';

export default function PieChart({   typeNo = 1,
  data,
  duration = 2000,
  mainPie = { size: 280, strokeWidth: 15 },
  decorPie = {
    sizeDecorCircular:150,
    strokeWidthDecorCircular: 25,
    seperateSlice: true,
    opacityDecorCircular: 0.5,
    annotation: false,
    logoData:{},
    logoSize: 35,
    colorCustomList: [],
  },
  animations={
    clockwiseDirection:'clockwise'
  }, }: PieChartProps){

  const convertData: DataItem[] = ConvertData({data,colorCustomList: decorPie.colorCustomList })
  let chartComponent;
  if (typeNo === 1) {
    chartComponent = <Type1 
    data={convertData} 
    duration={duration} 
    mainPie={mainPie} 
    decorPie={decorPie} 
    animations={animations}
    />;
  } else if (typeNo === 2) {
    chartComponent = <Type2 
    data={convertData} 
    duration={duration} 
    mainPie={mainPie} 
    decorPie={decorPie} 
    animations={animations}
    />;
  }

  return (
    <>
      {chartComponent}
    </>
  );
}