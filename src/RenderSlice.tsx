import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  SharedValue,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
  useAnimatedStyle
} from 'react-native-reanimated';
import { useEffect, useCallback, Dispatch,SetStateAction } from 'react';
interface Props {
  color: string;
  path: string;
  circumference: number;
  angleRadian: number;
  title: string;
  progressTime: SeperateProgress;
  percent: number;
  centerX: number;
  centerY: number;
  animations?: {
    clockwiseDirection?: string; // option "clockwise" or 'counter_clockwise'
  };
  opacity: number,
  strokeWidth: number,
  triggerAnimated: boolean,
  setCurrentHighlight?: Dispatch<SetStateAction<string>>,
  progressTimeRatio?: number
}
interface SeperateProgress {
  timeProgress: number,
  ordinalNumber: number,
  waitingTime_On_ClockWise: number,
  waitingTime_On_CounterClockWise: number,
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
export default function RenderSlice({
  color,
  path,
  circumference,
  angleRadian,
  title,
  progressTime,
  percent,
  centerX,
  centerY,
  animations={
    clockwiseDirection:'clockwise'
  },
  opacity,
  strokeWidth,
  triggerAnimated,
  setCurrentHighlight,
  progressTimeRatio
}: Props) {
  const angle = (angleRadian * 180) / Math.PI;
  const progress: SharedValue<number> = useSharedValue(0);
  const opacityValue: SharedValue<number> = useSharedValue(0);
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value
    }
  })
useEffect(() => {
  let animationStarted = false;
  const startAnimation = () => {
    if (!animationStarted) {
      // Animation for strokeDashoffset
      if(triggerAnimated) {
        progress.value = withDelay(
          progressTime.waitingTime_On_ClockWise,
            withTiming(
              1,
              { duration: progressTime.timeProgress, easing: Easing.linear },
              () => {
                animationStarted = true;
              }
            )
        );
      } else {
        progress.value = withTiming(
          1,
          {duration: progressTime.timeProgress, easing: Easing.linear},
            () => {
              animationStarted = true;
            }
          )
      }

      opacityValue.value = withTiming(0.5,{duration: progressTime.timeProgress})
    }
  };
  // Start animation once the progress value is initialized
  progress.value !== undefined && startAnimation();
}, [progress, progressTime, circumference, animations,opacityValue]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [ circumference,circumference * (1 - percent / 100)]
    );
    return {
      strokeDashoffset,
    };
  });

  return (
          <TouchableWithoutFeedback onPress={()=> {if(setCurrentHighlight){setCurrentHighlight(title)}}}>
      <AnimatedPath
        stroke={color}
        fill="none"
        strokeDasharray={`${circumference}`}
        d={path}
        strokeWidth={strokeWidth}
        // animatedProps={animatedProps}
        animatedProps={animatedProps}
        opacity={opacity}
      />
    </TouchableWithoutFeedback>
  );
}