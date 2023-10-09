
# How to use piechart-animation-tnbt
# Getting Started

>**Note**: I am a newbie in React Native. Here is my frist package which I publish to npm. If it make you waste your time, please dont blame me. 
I hope to disscuss about any the problem with you. Thank you !!!

### This package is for Android
## Test
You can clone this repo to test package.

## Installation using npm
   ```bash
   npm i piechart-animation-tnbt
   ```
## Import to your component
   ```bash
   import PieChart from "piechart-animation-tnbt"
   ```
   if typescript gives the error, you can try to create file name piechart-animation-tnbt.d.ts
   ```bash
   // file piechart-animation-tnbt.d.ts
   declare module "piechart-animation-tnbt"
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
#### typeNo = 1
   ![Type1 Image](https://github.com/tiennguyen12g/piechart-animation-tnbt/blob/main/src/assets/demoImage/type1.png)
#### typeNo = 2
   ![Type2 Image](https://github.com/tiennguyen12g/piechart-animation-tnbt/blob/main/src/assets/demoImage/type2.png)
#### annotations
   ![Annotaions Image](https://github.com/tiennguyen12g/piechart-animation-tnbt/blob/main/src/assets/demoImage/annotaions.png)

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
   ** Declare logo like this component
   ```bash
   interface CryptoLogos {
    [key: string]: {uri: string};
   }
   const BTC = require('./PNG/btc.png');
   const ETH = require('./PNG/eth.png');
  
     const Crypto_Logo_PNG: CryptoLogos = {
      "BTC": BTC,
      "ETH": ETH,
     };

   export default Crypto_Logo_PNG;
   ```
   ```bash
   const colorCustomList = ["green","red","black"], if you not pass this data, the code will auto create random color.
   ```
   > "animations" uses to add some decorates such as: animation (spin follow clockwise or couter_clockwise)
   > "decorPie" uses to add some decorates which something like as: Text, circular arc when touch, add logo.

## Congratulations! :tada:

You've successfully run and modified this package. :partying_face:

