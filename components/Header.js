import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { firebase } from "../firebase";

const handleSignOut = async () => {
	try {
		await firebase
			.auth()
			.signOut()
			.then(() => console.log("Signed Out"));
	} catch (error) {
		console.log(error);
	}
};

const Header = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleSignOut}>
				<Image
					style={styles.logo}
					source={require("../assets/header-logo.png")}
				/>
			</TouchableOpacity>

			<View style={styles.iconContainer}>
				<TouchableOpacity
					onPress={() => navigation.push("NewPostScreen")}>
					<Image
						source={{
							uri: "https://img.icons8.com/ios/fluency-systems-regular/60/ffffff/plus-2-math.png",
						}}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<Image
						source={{
							uri: "https://img.icons8.com/ios/fluency-systems-regular/60/ffffff/like--v1.png",
						}}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<View style={styles.unreadBadge}>
						<Text style={styles.unreadBadgeText}>11</Text>
					</View>
					<Image
						source={{
							uri: "https://img.icons8.com/ios/fluency-systems-regular/60/ffffff/facebook-messenger.png",
						}}
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginHorizontal: 20,
	},

	iconContainer: {
		flexDirection: "row",
	},

	logo: {
		width: 100,
		height: 50,
		resizeMode: "contain",
	},

	icon: {
		width: 25,
		height: 25,
		marginLeft: 10,
		resizeMode: "contain",
	},

	unreadBadge: {
		backgroundColor: "#ff3250",
		position: "absolute",
		left: 20,
		bottom: 18,
		width: 23,
		height: 18,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 100,
	},

	unreadBadgeText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold",
	},
});
