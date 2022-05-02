import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Stories from "../components/Stories";
import Post from "../components/Post";
// import { POSTS } from "../data/post";
import BottomTabs, { bottomTabIcons } from "../components/BottomTabs";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collectionGroup("posts")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((post) => ({
						id: post.id,
						...post.data(),
					}))
				);
			});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} />
			<Stories />
			<ScrollView vertical={true}>
				{posts.map((post, index) => (
					<Post key={index} post={post} />
				))}
			</ScrollView>
			<BottomTabs icons={bottomTabIcons} />
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		height: "100%",
	},
});
