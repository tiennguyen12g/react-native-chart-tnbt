import React, { useState } from 'react';
import { Svg, Text } from 'react-native-svg';

const GetTextLength = () => {
  const [textWidth, setTextWidth] = useState<number | null>(null);

  const handleTextLayout = (event:any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };
//   console.log(textWidth);
  return (
    <Svg width={200} height={200}>
      <Text
        x={0}
        y={0}
        textAnchor="middle"
        fontSize={25}
        onLayout={handleTextLayout}
      >
        Tien Nguyen
      </Text>
    </Svg>
  );
};

export default GetTextLength;
