
# How to use react-native-chart-tnbt
# Getting Started

>**Note**: 
I am a newbie in React Native. Here is my frist package which I publish to npm. 
If it make you waste your time, please dont blame me. I hope to disscuss about any the problem with you. Thank you !!!

### This package is for Android
## Test
You can clone this repo to test package.

## Installation using npm
   ```bash
   npm i react-native-chart-tnbt
   ```
# 1. PieChart
## Import to your component
   ```bash
   import PieChart from "react-native-chart-tnbt"
   ```
   if typescript gives the error, you can try to create file name react-native-chart-tnbt.d.ts
   ```bash
   // file react-native-chart-tnbt.d.ts
   declare module "react-native-chart-tnbt"
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
   ![Type1 Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/type1.png)
#### typeNo = 2
   ![Type2 Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/type2.png)
#### annotations
   ![Annotaions Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/annotations.png)

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
        opacityDecorCircular: number; // Value 0-1
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
   ## Circular Arc
   When you touch to the slice, the circular arc will display with its animation.
   ```bash
      ** value should be greater or less than maic circle radius
      sizeDecorCircular: number; 
      ** thickness depend on you
      strokeWidthDecorCircular: number;
      ** Value 0-1
      opacityDecorCircular: number; 
   ```
   ## seperateSlice
   ```bash
      // this attribute will add the line which split circle to circular are clearly
      seperateSlice: true or false
   ```
   ## Declare logo like this component
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

   ** Note: The key for the logo have to the same with the title.
   Example: 
   const dataInput = [{
      title: 'BTC',
      value: 23900.52,
   }];
   const Crypto_Logo_PNG: CryptoLogos = {
      "BTC": BTC,
   };
   The title "BTC" have to equal the key of object logo "BTC" in this case.

   ```
   ## Add your favorite colors
   ```bash
   const colorCustomList = ["green","red","black"]
   If you not pass this data, the code will auto create random color.
   ```
   ## animations
   uses to add some decorates such as: animation (spin follow clockwise or couter_clockwise)
   ## decorPie 
   uses to add some decorates which something like as: Text, circular arc when touch, add logo.
## I will try to build more type of chart.
## Congratulations! :tada:

You've successfully run and modified this package. :partying_face:

