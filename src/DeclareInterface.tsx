import {SvgProps} from 'react-native-svg';

interface DataItem {
  title: string;
  value: number;
  color: string;
  percent: number;
  sweepAngleRadians: number;
}
interface CryptoLogoPNG {
  [key: string]: {uri: string};
}
interface CryptoLogoSVG {
  [key: string]: React.FC<SvgProps>;
}
interface DataInput {
  title: string;
  value: number;
}
interface ParamForDraw {
  x: number;
  y: number;
  path: string;
}
interface FixDataResult {
  newData: DataItem[];
  totalValue: number;
  pathLists: ParamForDraw[];
}
interface SeperateProgress {
  timeProgress: number;
  ordinalNumber: number;
  waitingTime_On_ClockWise: number;
  waitingTime_On_CounterClockWise: number;
}
interface PieChartProps {
  typeNo?: number; // default: 1
  data: DataInput[]; // default: []
  duration?: number; // default: 3000ms
  mainPie?: {
    size?: number; // default: 200
    strokeWidth?: number; // default: 30
  };
  decorPie?: {
    sizeDecorCircular: number;
    strokeWidthDecorCircular: number;
    seperateSlice: boolean;
    opacityDecorCircular: number;
    annotation?: boolean;
    logoData?: CryptoLogoPNG;
    logoSize?: number;
    colorCustomList?: string[]
  };
  animations?: {
    clockwiseDirection: string; // option "clockwise" or 'counter_clockwise'
  };
}

export type {
    CryptoLogoPNG,
    CryptoLogoSVG,
    DataItem,
    PieChartProps,
    SeperateProgress,
    FixDataResult,
    ParamForDraw,
}