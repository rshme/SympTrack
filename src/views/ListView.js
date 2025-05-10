// src/views/ListView.js
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

const SurveyListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}
    >
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.contactText}>{item.phone_number}</Text>
      <Text style={styles.contactText}>{item.email}</Text>
      <Text style={styles.addressText} numberOfLines={2}>
        {item.address}
      </Text>
    </TouchableOpacity>
  );
};

const SurveyListView = ({ data, onItemPress, selectedItemId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>COVID-19 Survey Records</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SurveyListItem
            item={item}
            onPress={onItemPress}
            isSelected={selectedItemId === item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default SurveyListView;
