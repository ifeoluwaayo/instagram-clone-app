import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { USERS } from "../data/users";

const Stories = () => {
	return (
		<View style={{ marginBottom: 13, marginLeft: 5 }}>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}>
				{USERS.map((story, index) => (
					<View key={index}>
						<TouchableOpacity style={styles.storyContainer}>
							<Image
								source={{ uri: story.image }}
								style={styles.story}
							/>

							<Text
								style={{
									color: "white",
									alignItems: "center",
								}}>
								{story.user.length > 11
									? story.user.slice(0, 6).toLowerCase() +
									  "..."
									: story.user.toLowerCase()}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default Stories;

const styles = StyleSheet.create({
	story: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginLeft: 12,
		borderWidth: 3,
		borderColor: "#ff8501",
	},
	storyContainer: {
		alignItems: "center",
	},
});
