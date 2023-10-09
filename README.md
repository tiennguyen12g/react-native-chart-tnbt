
# How to use piechart-animation-tnbt
# Getting Started

>**Note**: I am a newbie in React Native. Here is my frist package which I publish to npm. If it make you waste your time, please dont blame me. 
I hope to disscuss about any the problem with you. Thank you !!!

### This package is for Android


## Installation using npm
   ```bash
   npm i piechart-animation-tnbt
   ```
## Import to your component
   ```bash
   import PieChart from "piechart-animation-tnbt"
   ```
## How to use
   ```bash
         <PieChart
          typeNo={1}
          data={dataBalance}
          duration={2000}
          mainPie={{size: size, strokeWidth: 15}}
          animations={{
            clockwiseDirection: 'clockwise', // counter_clockwise or clockwise
          }}
          decorPie={{
            sizeDecorCircular: size - 100,
            strokeWidthDecorCircular: 25,
            seperateSlice: true,
            opacityDecorCircular: 0.5,
            annotation: true,
          }}
        />
   ```
### Parameter
   ```bash
   interface PieChartProps {
      typeNo?: number; // default: 1 or option 2
      data: DataInput[]; 
      duration?: number; // default: 2000ms
      mainPie?: {
        size?: number; // default: 280
        strokeWidth?: number; // default: 15
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
   ```
   ```bash
   interface DataInput {
      title: string;
      value: number;
   }

   Example: 
   const dataInput = [
   {
     title: 'Gold',
     value: 23900.52,
   },
   {
     title: 'USD',
     value: 11100,
   }]
   ```
   ```bash
   interface DataInput {
      title: string;
      value: number;
   }

   Example: 
   const dataInput = [
   {
     title: 'Gold',
     value: 23900.52,
   },
   {
     title: 'USD',
     value: 11100,
   }]
   ```
| react-native-svg | react-native |
| ---------------- | ------------ |
| 3.2.0            | 0.29         |
| 4.2.0            | 0.32         |
| 4.3.0            | 0.33         |
| 4.4.0            | 0.38         |
| 4.5.0            | 0.40         |
| 5.1.8            | 0.44         |
| 5.2.0            | 0.45         |
| 5.3.0            | 0.46         |
| 5.4.1            | 0.47         |
| 5.5.1            | >=0.50       |
| >=6              | >=0.50       |
| >=7              | >=0.57.4     |
| >=8              | >=0.57.4     |
| >=9              | >=0.57.4     |
| >=12.3.0         | >=0.64.0     |

## Congratulations! :tada:

You've successfully run and modified this package. :partying_face:

