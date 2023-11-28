import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text as RNText,
  Image as RNImage,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import Svg, {Path, Text as SvgText, Image as SVGImage} from 'react-native-svg';
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
interface Type1Props extends PieChartProps {
  data: DataItem[]; // default: []
}

const {PI} = Math;
const {width} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
export default function Type1({
  data,
  duration = 2000,
  mainPie = {size: 280, strokeWidth: 15},
  decorPie = {
    sizeDecorCircular: 150,
    strokeWidthDecorCircular: 25,
    seperateSlice: true,
    opacityDecorCircular: 0.5,
    annotation: false,
    logoData: {},
    logoSize: 35,
  },
  animations = {
    clockwiseDirection: 'clockwise',
  },
}: Type1Props) {
  const {size = 200, strokeWidth = 30} = mainPie;
  const radius = (size - strokeWidth) / 2;
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
      radius: radiusDecorCircular - strokeWidth,
      clockwiseDirection,
    }) || {newData: [], totalValue: 0, pathLists: []};
  }
  const progress = useSharedValue(0);
  const progressTimes: SeperateProgress[] = HandleProgressTime({
    newData,
    progress,
    duration,
  });
  const [currentHighlight, setCurrentHighlight] = useState<string>('');
  return (

    //This view contain piechart and annotation
    <View style={[styles.container, {height: 'auto'}]}>

      {/* This view contain chart and some detail about value */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: logoSize/2,
          borderColor:"green"
        }}>

          {/* this view show logo and its value */}
        <View
          style={{
            zIndex: 1,
            flexDirection: 'row',
            borderColor:"green",
            backgroundColor: "transparent",
            position:"absolute",
            top: 0.65 * size
          }}>
          {newData.map((item, i) => {
            if (lodoData !== undefined && Object.keys(lodoData).length > 0) {
              const url = lodoData[item.title];
              return (
                <React.Fragment key={i}>
                  {item.title === currentHighlight && url ? (
                    <React.Fragment>
                      <RNImage
                        source={url}
                        style={{width: logoSize, height: logoSize}}
                      />
                      <RNText style={{marginLeft: 0, fontSize: logoSize - 10, color: "red"}}>
                        {item.title}
                      </RNText>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={i}>
                  {item.title === currentHighlight ? (
                    <RNText style={{marginLeft: 0, fontSize: logoSize - 10}}>
                      {item.title}
                    </RNText>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              );
            }
          })}
        </View>

        {/* This view are wrap all SVG */}
        <View>
          <Svg
            width={size}
            height={size}
            fill=""
            style={[
              styles.svg,
              {
                marginVertical: strokeWidth,
                marginHorizontal: strokeWidth,
              },
            ]}>
            {newData.map((item, i) => {
              const desiredLength = radius * 1.2; // Set the desired length
              // How to calculate? Get ratio rectange (x1,y1) with rectangle(xNew,yNew), find the value of edge for new rectangle.
              // xNew = cx + edge correspond; yNew = cy + edge correspond
              const addX =
                cx + (desiredLength * (pathLists[i].x - cx)) / radius;
              const addY =
                cy + (desiredLength * (pathLists[i].y - cy)) / radius;
              return (
                <React.Fragment key={i}>
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
                    strokeWidth={strokeWidth}
                    triggerAnimated={true}
                    setCurrentHighlight={setCurrentHighlight}
                  />
                  {decorPieCircular.newData[i].title === currentHighlight ? (
                    <RenderSlice
                      color={item.color}
                      path={decorPieCircular.pathLists[i].path}
                      circumference={circumference}
                      angleRadian={item.sweepAngleRadians}
                      title={item.title}
                      progressTime={progressTimes[i]}
                      percent={item.percent}
                      centerX={cx}
                      centerY={cy}
                      animations={animations}
                      opacity={decorPie?.opacityDecorCircular || 0.3}
                      strokeWidth={strokeWidthDecorCircular}
                      triggerAnimated={false}
                    />
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
                      <SvgText
                        x={cx}
                        y={cy - 10}
                        textAnchor="middle"
                        fontSize={30}
                        fontWeight={800}
                        fill={item.color}>
                        {`$${item.value.toLocaleString('en-Us', {
                          minimumFractionDigits: 0,
                        })}`}
                      </SvgText>
                      <SvgText
                        x={cx}
                        y={cy + 20}
                        textAnchor="middle"
                        fontSize={25}
                        opacity={0.6}>
                        {`${item.percent}%`}
                      </SvgText>
                    </View>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              );
            })}
            {currentHighlight === '' ? (
              <React.Fragment>
                <SvgText
                  x={cx}
                  y={cy - 15}
                  textAnchor="middle"
                  fontSize={20}
                  fontWeight={400}>
                  Total Value:
                </SvgText>
                <SvgText
                  x={cx}
                  y={cy + 20}
                  textAnchor="middle"
                  fontSize={30}
                  fontWeight={500}>
                  {`$${totalValue.toLocaleString('en-US')}`}
                </SvgText>
              </React.Fragment>
            ) : (
              ''
            )}
          </Svg>
        </View>
      </View>

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
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: 0,
    width: '100%',
  },
  svg: {
    top: 0,
    left: 0,
    borderBlockColor: 'red',
  },
  viewTitle: {
    width: '100%',
    height: 25,
  },
  logoTitle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
