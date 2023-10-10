
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
   import {PieChart} from "react-native-chart-tnbt"
   ```
   if typescript gives the error, you can try to create file name react-native-chart-tnbt.d.ts
   ```bash
   // file react-native-chart-tnbt.d.ts
   declare module "react-native-chart-tnbt"
   ```
#### typeNo = 1
   ![Type1 Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/type1.png)
#### typeNo = 2
   ![Type2 Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/type2.png)
#### annotations
   ![Annotaions Image](https://github.com/tiennguyen12g/react-native-chart-tnbt/blob/main/src/assets/demoImage/annotations.png)

## Available props
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
## Table list props
| Name                  | Type       | Default | Description                                                                                       |
|-----------------------|------------|---------|---------------------------------------------------------------------------------------------------|
| typyNo                | number     | 1       | Type of pie chart                                                                                |
| data                  | DataInput[]| no      | Data to pass to the pie chart                                                                    |
| duration              | number     | 2000    | Time for animation to run                                                                        |
| mainPie               |            |         | Parameter to create the main circle chart                                                        |
| size                  | number     | 280     | The size of the view box                                                                         |
| strokeWidth           | number     | 15      | The size of the stroke for the circle                                                            |
| decorPie              |            |         | Parameter to create a second circle for decorating the main circle                               |
| sizeDecorCircular     | number     | 150     | The size of the second circle                                                                    |
| strokeWidthDecorCircular | number   | 25      | The size of the stroke for the second circle                                                     |
| separateSlice         | boolean    | true    | Creates clear lines to cut graph pieces                                                          |
| opacityDecorCircular  | number     | 0.5     | Adds opacity for the circle decor                                                                |
| annotation            | boolean    | false   | Adds a note for each fund                                                                        |
| logoSize              | number     | 35      | The size for inserting a logo in annotations or each slice                                      |
| colorCustomList       | string[]   | see below| The size for inserting a logo in annotations or each slice                                      |
| clockwiseDirection    | string     | clockwise or counter_clockwise     | Direction of rotation of the circle |

Note: Ensure there's an empty line before and after the table in your Markdown for proper rendering.

   ```bash
   interface DataInput {
      title: string;
      value: number;
   }

   ```
   ## How to use
   ```bash
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
         <YourComponent>
            <PieChart
             typeNo={1}
             data={dataInput}
             duration={2000}
             mainPie={
               {
                  size: 280, 
                  strokeWidth: 15
               }
            }
             animations={{
               clockwiseDirection: 'clockwise', // counter_clockwise or clockwise
             }}
             decorPie={{
               sizeDecorCircular: 150,
               strokeWidthDecorCircular: 25,
               seperateSlice: true,
               opacityDecorCircular: 0.5,
               annotation: true,
             }}
           />
         </YourComponent>
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

   ** Note: The key for the logo must to the same with the title.
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
   // default color
   const colorCustomList = [
      'rgb(244,62,61)',
      'rgb(254,165,61)',
      'rgb(128,22,80)',
      'rgb(131,242,58)',
      'rgb(59,95,255)',
      'rgb(252,60,222)',
      'rgb(72,220,236)',
   ];
   If you not pass this data or your data is large, the code will auto create random color.
   ```

## I will try to build more type of chart.
## Congratulations! :tada:

You've successfully run and modified this package. :partying_face:

