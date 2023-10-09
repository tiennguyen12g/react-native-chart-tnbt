/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
// import Test from './src/Test';
import PieChart from './src/PieChart';
import 'react-native-svg';
const {width} = Dimensions.get('window');
function App(): JSX.Element {
  const [typeNo, setTypeNo] = useState<number>(1);
  const size = 280
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {typeNo === 1 ? 
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
            // logoData: Crypto_Logo_PNG,
            // logoSize: 35,
          }}
        />
          :
        <PieChart
          typeNo={2}
          data={dataBalance}
          duration={2000}
          mainPie={{size: width, strokeWidth: 25}}
          animations={{
            clockwiseDirection: 'clockwise', // counter_clockwise or clockwise
          }}
          decorPie={{
            sizeDecorCircular: width - 100,
            strokeWidthDecorCircular: 25,
            seperateSlice: true,
            opacityDecorCircular: 0.5,
            annotation: true,
          }}
        />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
const data = [
  {
    title: 'Binance',
    value: 25,
    color: 'red',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ronin-781',
    value: 50,
    color: 'green',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ether-3',
    value: 125,
    color: 'orange',
    percent: 0,
    sweepAngleRadians: 0,
  },
  //   {
  //   title: 'Bybit',
  //   value: 120,
  //   color: 'rgb(128,22,80)',
  //   percent: 0,
  //   sweepAngleRadians: 0,
  // },
  // {
  //   title: 'Ether-360',
  //   value: 30,
  //   color: 'rgb(131,242,58)',
  //   percent: 0,
  //   sweepAngleRadians: 0,
  // },
  // {
  //   title: 'Ronin-777',
  //   value: 130,
  //   color: 'rgb(59,95,255)',
  //   percent: 0,
  //   sweepAngleRadians: 0,
  // },
];
const testData = [
  {
    title: 'Binance',
    value: 23900.52,
  },
  {
    title: 'Ronin-781',
    value: 11100,
  },
  {
    title: 'Bybit',
    value: 8200,
  },
  {
    title: 'ETH',
    value: 5200,
  },
];
const dataBalance = [
  {
    title: 'Binance',
    value: 23900.52,
    color: 'rgb(244,62,61)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ronin-781',
    value: 11100,
    color: 'rgb(254,165,61)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Bybit',
    value: 8200,
    color: 'rgb(128,22,80)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ether-360',
    value: 500,
    color: 'rgb(131,242,58)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ronin-777',
    value: 13000,
    color: 'rgb(59,95,255)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Bybit-2',
    value: 18200,
    color: 'rgb(252,60,222)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ether-999',
    value: 15500,
    color: 'rgb(72,220,236)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ether-3',
    value: 6000,
    color: 'rgb(131,242,58)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ronin-3',
    value: 3100,
    color: 'rgb(59,95,255)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Bybit-3',
    value: 200,
    color: 'rgb(252,60,222)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'Ether-4',
    value: 4000,
    color: 'rgb(72,100,180)',
    percent: 0,
    sweepAngleRadians: 0,
  },
];
const currencyData = [
  {
    title: 'BTC',
    value: 23900.52,
    color: 'rgb(244,62,61)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'ETH',
    value: 11800.85,
    color: 'rgb(254,165,61)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'BNB',
    value: 8200.8,
    color: 'rgb(128,22,80)',
    percent: 0,
    sweepAngleRadians: 0,
  },
  {
    title: 'AXS',
    value: 11450.58,
  },
  {
    title: 'SOL',
    value: 18000.9,
  },
  {
    title: 'DOGE',
    value: 18200.42,
  },
  {
    title: 'USDT',
    value: 15500.5,

  },
  {
    title: 'SHIBA',
    value: 6000.88,

  },
  {
    title: 'GAL',
    value: 500.55,
  },
]
