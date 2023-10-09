import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
interface DataItem {
  title: string;
  value: number;
  color: string;
  percent: number;
  sweepAngleRadians: number;
}
interface CryptoLogoPNG {
  [key: string]: {uri: string};
}
interface NoteBalanceProps {
  data: DataItem[];
  setCurrentHighlight: Dispatch<SetStateAction<string>>;
  currentHighlight: string;
  logoData?: CryptoLogoPNG
}
const {width} = Dimensions.get('window');
export default function NoteBalance({
  data,
  setCurrentHighlight,
  currentHighlight,
  logoData,
}: NoteBalanceProps) {
  const itemsPerRow = 2; // Number of items per row

  // Group the data into arrays based on itemsPerRow
  const groupedData = data.reduce((acc, item, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);

    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }

    acc[rowIndex].push(item);

    return acc;
  }, [] as DataItem[][]);
  let Crypto_Logo_PNG: CryptoLogoPNG;
  if(logoData){
    Crypto_Logo_PNG = logoData
  }
  return (
    <View style={styles.container}>
      {groupedData.map((group, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {group.map((item, itemIndex) => (
            <TouchableWithoutFeedback
              key={`touchKey${itemIndex}`}
              onPress={() => setCurrentHighlight(item.title)}>
              <View
                style={[
                  styles.annotation,
                  {width: width / 2 - 18},
                  currentHighlight === item.title
                    ? {backgroundColor: item.color}
                    : {backgroundColor: 'rgb(210, 227, 228)'},
                ]}
                key={itemIndex}>
                {!Crypto_Logo_PNG[`${item.title}`] ? (
                  <View
                    style={[
                      styles.pointAnnotation,
                      {backgroundColor: item.color},
                    ]}></View>
                ) : (
                  <Image
                    source={Crypto_Logo_PNG[`${item.title}`]}
                    style={{width: 25, height: 25, marginLeft: 8,}}
                  />
                )}
                <Text style={[styles.textDecor1, currentHighlight === item.title ? {color:"white"} : {color:'black'}]}>{`${item.title}`}</Text>
                <Text style={[styles.textDecor2, currentHighlight === item.title ? {color:"white"} : {color:'black'}]}>{`${item.percent.toFixed(
                  1,
                )}%`}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
  },
  row: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  annotation: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 3,
    // backgroundColor: 'rgb(210, 227, 228)',
    // backgroundColor: "rgb(198, 177, 206)",
    opacity: 0.9,
  },
  textDecor1: {
    fontSize: 18,
    marginLeft: 6,
    fontWeight: '500',
  },
  textDecor2: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 8,
  },
  pointAnnotation: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
});
