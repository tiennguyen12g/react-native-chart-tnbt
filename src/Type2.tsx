import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import Svg, {Path, Text, Defs, Stop, LinearGradient} from 'react-native-svg';
import RenderSlice from './RenderSlice';
import FixData from './FixData';
import HandleProgressTime from './HandleProgressTime';
import NoteBalance from './NoteBalance';
import {
  PieChartProps,
  DataItem,
  SeperateProgress,
  FixDataResult,
} from './DeclareInterface';

interface Type2Props extends PieChartProps {
  data: DataItem[]; // default: []
}

const {PI} = Math;
const AnimatedPath = Animated.createAnimatedComponent(Path);
export default function Type2({
  data,
  duration = 2000,
  mainPie = {size: 280, strokeWidth: 15},
  decorPie = {
    sizeDecorCircular: 150,
    strokeWidthDecorCircular: 25,
    seperateSlice: true,
    opacityDecorCircular: 0.5,
    annotation: false,
  },
  animations = {
    clockwiseDirection: 'clockwise',
  },
}: Type2Props) {
  const {size = 200, strokeWidth = 30} = mainPie;
  const radius = (size - strokeWidth) / 2 - 40;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * PI * radius;
  const clockwiseDirection = animations.clockwiseDirection;
  const logoSize = decorPie.logoSize || 40;
  const lodoData = decorPie.logoData || {};
  const {newData, totalValue, pathLists} = FixData({
    data,
    cx,
    cy,
    radius,
    clockwiseDirection,
  }) || {newData: [], totalValue: 0, pathLists: []};
  let decorPieCircular: FixDataResult = {
    newData: [],
    totalValue: 0,
    pathLists: [],
  };
  let sizeDecorCircular: number = 0;
  let strokeWidthDecorCircular: number = 0;
  if (decorPie) {
    sizeDecorCircular = decorPie.sizeDecorCircular;
    strokeWidthDecorCircular = decorPie.strokeWidthDecorCircular;
    const radiusDecorCircular =
      (sizeDecorCircular - strokeWidthDecorCircular) / 2;
    decorPieCircular = FixData({
      data,
      cx,
      cy,
      radius: radius + strokeWidth,
      clockwiseDirection,
    }) || {newData: [], totalValue: 0, pathLists: []};
  }
  const progressTimeRatio = 1 + strokeWidth / radius;
  const progress = useSharedValue(0);
  const progressTimes: SeperateProgress[] = HandleProgressTime({
    newData,
    progress,
    duration,
  });
  const [onRunStatus, setOnRunStatus] = useState<boolean>(false);
  const [currentHighlight, setCurrentHighlight] = useState<string>('');
  let startAngleRadianText: number[] = [];
  let initialRadian = 0;
  if (animations.clockwiseDirection === 'counter_clockwise') {
    newData.forEach(item => {
      startAngleRadianText.push(initialRadian);
      initialRadian += -item.sweepAngleRadians;
    });
  } else if (animations.clockwiseDirection === 'clockwise') {
    newData.forEach(item => {
      startAngleRadianText.push(initialRadian);
      initialRadian += item.sweepAngleRadians;
    });
  }
  return (
    <View style={[styles.container, {height: 'auto'}]}>
      <Svg width={size} height={size} style={styles.svg}>
        {newData.map((item, i) => {
          const desiredLength = radius * 1.4; // Set the desired length
          // How to calculate? Get ratio rectange (x1,y1) with rectangle(xNew,yNew), find the value of edge for new rectangle.
          // xNew = cx + edge correspond; yNew = cy + edge correspond
          const addX = cx + (desiredLength * (pathLists[i].x - cx)) / radius;
          const addY = cy + (desiredLength * (pathLists[i].y - cy)) / radius;
          const centerCircular = item.sweepAngleRadians / 2;
          let angleRadian = 0;
          if (animations.clockwiseDirection === 'counter_clockwise') {
            angleRadian = startAngleRadianText[i] - centerCircular;
          } else {
            angleRadian = startAngleRadianText[i] + centerCircular;
          }
          // const angleRadian = startAngleRadianText[i] - centerCircular; // Calculate the angle for the text
          const x = cx + radius * Math.cos(angleRadian);
          const y = cy + radius * Math.sin(angleRadian);
          return (
            <React.Fragment key={i}>
              <Defs>
                <LinearGradient
                  id={`gradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="20%"
                  y2="25%">
                  <Stop offset="0" stopColor="gray" stopOpacity={1} />
                  <Stop offset="1" stopColor={item.color} stopOpacity={1} />
                </LinearGradient>
              </Defs>
              <RenderSlice
                color={item.color}
                path={pathLists[i].path}
                circumference={circumference}
                angleRadian={item.sweepAngleRadians}
                title={item.title}
                progressTime={progressTimes[i]}
                percent={item.percent}
                centerX={cx}
                centerY={cy}
                animations={animations}
                opacity={1}
                strokeWidth={strokeWidth * 2}
                triggerAnimated={true}
                setCurrentHighlight={setCurrentHighlight}
              />
              {decorPieCircular.newData[i].title === currentHighlight ? (
                <RenderSlice
                  color={item.color}
                  path={decorPieCircular.pathLists[i].path}
                  circumference={circumference * 1.5}
                  angleRadian={item.sweepAngleRadians}
                  title={item.title}
                  progressTime={progressTimes[i]}
                  percent={item.percent}
                  centerX={cx}
                  centerY={cy}
                  animations={animations}
                  opacity={decorPie?.opacityDecorCircular || 0.5}
                  strokeWidth={strokeWidthDecorCircular}
                  triggerAnimated={false}
                  progressTimeRatio={progressTimeRatio}
                />
              ) : (
                <Text>Hello</Text>
              )}
              {item.percent > 3 ? (
                <Text
                  fontSize={18}
                  x={x}
                  y={y}
                  dy="0.3em"
                  textAnchor="middle"
                  fill="white"
                  fontWeight="500"
                  onPress={() => setCurrentHighlight(item.title)}>
                  {`${(item.value / 1000).toFixed(1)}k`}
                </Text>
              ) : (
                ''
              )}

              {decorPie?.seperateSlice === true ? (
                <AnimatedPath
                  key={i}
                  stroke="white"
                  fill="none"
                  d={`M ${cx} ${cy} L ${addX} ${addY}`}
                  strokeWidth={i === newData.length - 1 ? 2.5 : 5}
                  // transform={`rotate(${(item.sweepAngleRadians * 180) / Math.PI} ${cx} ${cy})`}
                />
              ) : (
                ''
              )}
            </React.Fragment>
          );
        })}
        {newData.map((item, j) => {
          return (
            <React.Fragment key={`text${j}`}>
              {item.title === currentHighlight ? (
                <View>
                  <Text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    fontSize={30}
                    fontWeight={800}
                    fill={item.color}>
                    {`$${item.value.toLocaleString('en-Us', {
                      minimumFractionDigits: 0,
                    })}`}
                  </Text>
                  <Text
                    x={cx}
                    y={cy + 25}
                    textAnchor="middle"
                    fontSize={26}
                    opacity={0.6}>
                    {`${item.percent}%`}
                  </Text>
                  <Text
                    x={cx}
                    y={cy + 50 }
                    textAnchor="middle"
                    fontSize={26}
                    opacity={0.6}>
                    {item.title}
                  </Text>
                </View>
              ) : (
                ''
              )}
            </React.Fragment>
          );
        })}
        {currentHighlight === '' ? (
          <React.Fragment>
            <Text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize={20}
              fontWeight={400}>
              Total Value:
            </Text>
            <Text
              x={cx}
              y={cy + 20}
              textAnchor="middle"
              fontSize={30}
              fontWeight={500}>
              {`$${totalValue.toLocaleString('en-US')}`}
            </Text>
          </React.Fragment>
        ) : (
          ''
        )}
      </Svg>
      {decorPie.annotation === true ? (
        <NoteBalance
          data={newData}
          setCurrentHighlight={setCurrentHighlight}
          currentHighlight={currentHighlight}
          logoData={lodoData}
        />
      ) : (
        ''
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  svg: {
    position: 'relative',
    top: 0,
    left: 0,
    borderBlockColor: 'red',
  },
});
