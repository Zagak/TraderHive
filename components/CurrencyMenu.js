import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";
import { useEffect } from "react";

function CurrencyMenu({ settedCurrency }) {
  const authCtx = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState({ label: "RON", value: 1 });
  const [dropdownItems, setDropdownItems] = useState([
    { label: "RON", value: 1 },
    { label: "EUR", value: 2 },
    { label: "USD", value: 3 },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  //useEffect(() => {
    settedCurrency(selectedItem.label);
  //}, [selectedItem]);

  async function get() {
    const currency = await AsyncStorage.getItem('ceva');
  }

  get();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowDropdown(!showDropdown)}>
        <Text>{selectedItem ? selectedItem.label : "RON"}</Text>
      </Pressable>

      {showDropdown && (
        <View style={styles.dropdown}>
          {dropdownItems.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => {
                setSelectedItem(item);
                authCtx.chooseCurrency(item.label);
                setShowDropdown(false);
              }}
            >
              <Text>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default CurrencyMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 24,
    marginTop: 4
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
    zIndex: 1,
    marginHorizontal: -8
  },
});
