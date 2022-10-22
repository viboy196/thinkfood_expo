import { View, Text, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store/hooks";
import { TypeAccount } from "../../../utils/helper/AccountHelper";
import RelationshipCrud from "../../../utils/api/RelationshipCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import ItemPerson from "./ItemPerson";
import { RootTabScreenProps } from "../../../navigation/types";

export default function Relationship({
  navigation,
}: RootTabScreenProps<"TabNotification">) {
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const [listFriend, setListFriend] = useState<TypeAccount[]>();
  useEffect(() => {
    if (token && accountDetail.id)
      RelationshipCrud.getListAccountFriend(token, accountDetail.id).then(
        (res) => {
          if (res.code == ResultStatusCode.success) {
            setListFriend(res.result);
          }
        }
      );
  }, [token, accountDetail.id]);
  return (
    <View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Danh sách bạn bè</Text>
        </View>
        <Button
          title="Giới thiệu"
          color={"#49cc90"}
          onPress={() => {
            navigation.navigate("introduce");
          }}
        />
      </View>

      <FlatList
        data={listFriend}
        renderItem={({ item }) => <ItemPerson item={item} key={item.id} />}
      />
    </View>
  );
}
