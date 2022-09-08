import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function ButtonImageShow({
  imageSource,
  text,
  onPress,
  sizeText,
  width,
  height,
  colorText,
}: {
  imageSource?: ImageSourcePropType;
  text?: string;
  onPress?: () => void;
  color?: string;

  colorText?: string;

  size?: string | number;
  sizeText?: number;
  width?: string | number | undefined;
  height?: string | number | undefined;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: width ? width : 100,
          height: height ? height : 75,
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={
              imageSource
                ? imageSource
                : require('../../assets/images/thinkfood/item/it1.png')
            }
            resizeMode="cover"
            style={{
              width: width ? width : 100,
              // @ts-ignore
              height: width ? width * 0.75 : 75,
            }}
          />
        </View>
        <View style={{paddingTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: colorText ? colorText : '#3a3d40',
              fontSize: sizeText ? sizeText : undefined,
            }}>
            {text ? text : 'Chưa nhập'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
