interface DataItem {
    title: string;
    value: number;
    color: string;
    percent: number;
    sweepAngleRadians: number; 
  }
  import{
    SharedValue
  } from 'react-native-reanimated';
  interface Props{
    newData: DataItem[],
    progress: SharedValue<number>,
    duration: number,
  }
  interface SeperateProgress{
    timeProgress: number,
    ordinalNumber: number,
    waitingTime_On_ClockWise: number,
    waitingTime_On_CounterClockWise: number,
  }
  export default function HandleProgressTime({newData, progress,duration}: Props){
    const separateProgress: SeperateProgress[] = [];
    const waitingTime_On_CounterClockWise_Array: number[] = []
    const dataFor_Clockwise = [...newData]
    dataFor_Clockwise.forEach((item,i)=>{
      const timeProgress = (item.percent * duration) / 100;
      if(i === 0){
        separateProgress.push({
          timeProgress: timeProgress,
          ordinalNumber: i,
          waitingTime_On_ClockWise: 0,
          waitingTime_On_CounterClockWise: 0,
        });
      } else {
        const waitingTime_On_ClockWise = separateProgress[i-1].timeProgress + separateProgress[i-1].waitingTime_On_ClockWise;
        separateProgress.push({
          timeProgress: timeProgress,
          ordinalNumber: i,
          waitingTime_On_ClockWise: waitingTime_On_ClockWise,
          waitingTime_On_CounterClockWise: 0,
        });
  
      }
    });
    const separateProgress_Reverse = separateProgress.slice().reverse();
  
    separateProgress_Reverse.forEach((item,i)=>{
      if(i===0){
        waitingTime_On_CounterClockWise_Array.push(0);
        separateProgress_Reverse[i].waitingTime_On_CounterClockWise = 0
      } else{
        const waitingTime_CounterClockwise = separateProgress_Reverse[i-1].timeProgress + separateProgress_Reverse[i-1].waitingTime_On_CounterClockWise;
        separateProgress_Reverse[i].waitingTime_On_CounterClockWise = waitingTime_CounterClockwise
      }
    })
    const result = separateProgress_Reverse.reverse();
    return result
  }