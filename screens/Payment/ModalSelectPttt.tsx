import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { Modal, Portal, Provider, RadioButton } from "react-native-paper";
import { color1, color2 } from "../../utils/helper/Color";

export const ModalSelectPttt = (props: {
  visible: boolean;
  hideModal: () => void;
  selectPttt: number;
  setSelectPttt: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: color2,
              }}
            >
              Chọn Phương Thức Thanh toán
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              backgroundColor: "#fff",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RadioButton
                value="first"
                status={props.selectPttt === 1 ? "checked" : "unchecked"}
                color={color1}
                onPress={() => {
                  props.setSelectPttt(1);
                  props.hideModal();
                }}
              />
            </View>
            <View
              style={{
                flex: 6,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text>Thanh toán bằng tài khoản</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              backgroundColor: "#fff",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RadioButton
                value="first"
                status={props.selectPttt === 0 ? "checked" : "unchecked"}
                color={color1}
                onPress={() => {
                  props.setSelectPttt(0);
                  props.hideModal();
                }}
              />
            </View>
            <View
              style={{
                flex: 6,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text>Thanh toán khi nhận hàng</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
