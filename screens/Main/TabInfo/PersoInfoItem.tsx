import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { TypeAccount } from "../../../utils/helper/AccountHelper";
import { color1, color2 } from "../../../utils/helper/Color";

export default function PersoInfoItem({
  value,
  title,
  onPress,
  isPressEdit,
}: {
  value: string;
  title: string;
  onPress?: (text: string) => void;
  isPressEdit: boolean;
}) {
  const [text, setText] = useState<string>(value);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View style={{ flex: 8 }}>
          <Text>{title}</Text>
          <TextInput value={text} onChangeText={setText} editable={isEdit} />
        </View>
        <View style={{ flex: 2 }}>
          {isPressEdit && (
            <Button
              title="Sửa"
              color={color1}
              onPress={() => setIsEdit(!isEdit)}
            />
          )}
        </View>
      </View>
      {isEdit === true && (
        <Button
          color={color2}
          title="Cập nhật"
          onPress={() => {
            onPress(text);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}
