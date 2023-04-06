import React from "react";
import { Text } from "react-native";

const MultiLineText = ({ text }) => {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </>
  );
};

export default MultiLineText;
