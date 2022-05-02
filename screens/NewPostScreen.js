import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import AddNewPost from "../components/AddNewPost";

const NewPostScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
			<AddNewPost navigation={navigation} />
		</SafeAreaView>
	);
};

export default NewPostScreen;

const styles = StyleSheet.create({});
