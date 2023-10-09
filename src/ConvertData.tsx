import { StyleSheet } from 'react-native'

interface ConvertDataInput{
    title: string,
    value: number,
}
interface ConvertDataOutput{
  title: string;
  value: number;
  color: string;
  percent: number;
  sweepAngleRadians: number;
}
interface ConvertDataProps{
  data: ConvertDataInput[], 
  colorCustomList?: string[]
}
export default function ConvertData({data, colorCustomList} :ConvertDataProps): ConvertDataOutput[] {
    const defaultColor = [
      'rgb(244,62,61)',
      'rgb(254,165,61)',
      'rgb(128,22,80)',
      'rgb(131,242,58)',
      'rgb(59,95,255)',
      'rgb(252,60,222)',
      'rgb(72,220,236)',
    ];
    console.log('data',colorCustomList);
      
      let colorLists: string[] = defaultColor;
      if (colorCustomList !== undefined && colorCustomList.length > 0 ){
        colorLists = colorCustomList
      }

      if(data.length > colorLists.length){
        const numberColorAdd = data.length - colorLists.length;
        for (let index = 0; index < numberColorAdd ; index++) {
          colorLists.push(MakeColor_RGB())
        }
      }
      const convertedData: ConvertDataOutput[] = data.map((item, index) => {
        return {
          ...item,
          color: colorLists[index],
          percent: 0,
          sweepAngleRadians: 0,
        };
      });
      // console.log(convertedData);
      return convertedData;
}

const styles = StyleSheet.create({});
function MakeColor_RGB(){
  const minColorValue = 30;  // Minimum color value to avoid being too close to black
  const maxColorValue = 225; // Maximum color value to avoid being too close to white

  const r = Math.floor(Math.random() * (maxColorValue - minColorValue + 1)) + minColorValue;
  const g = Math.floor(Math.random() * (maxColorValue - minColorValue + 1)) + minColorValue;
  const b = Math.floor(Math.random() * (maxColorValue - minColorValue + 1)) + minColorValue;
  // console.log(`rgb(${r},${g},${b})`);
  return `rgb(${r},${g},${b})`;
}
function MakeColor_HEX(){
   // Define an array of hexadecimal digits
   const hexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  // Generate an array of six random indices from 0 to 15
  const hexIndices = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 16)
  );
  // Map each index to its corresponding hex digit and join them into a string
  const hexCode = hexIndices.map((i) => hexChars[i]).join('');
  // Return the string with a "#" prefix
  return `#${hexCode}`;
}
function MakeColor_HSL(){
  // Define an async function that returns a random number within a range
  const getRandomNumber = (min: number, max: number) =>
    Math.round(Math.random() * (max - min) + min);

  // Destructure an object that contains three random numbers for hue, saturation and lightness
  const { hue, saturation, lightness } = {
    hue: getRandomNumber(0, 360),
    saturation: getRandomNumber(0, 100),
    lightness: getRandomNumber(0, 100),
  };
  // Return the string with hsl prefix
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}