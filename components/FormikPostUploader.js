import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { firebase, db } from "../firebase";

const PLACEHOLDER_IMAGE =
	"https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg";

const uploadPostSchema = Yup.object().shape({
	imageUrl: Yup.string().url().required("Image URL is required"),
	caption: Yup.string()
		.max(2200, "Caption has reached the character limit")
		.required("Caption is required"),
});

const FormikPostUploader = ({ navigation }) => {
	const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMAGE);
	const [currentLoggedinUser, setCurrentLoggedInUser] = useState(null);

	const getUsername = () => {
		const user = firebase.auth().currentUser;
		const unsubscribe = db
			.collection("users")
			.where("owner_uid", "==", user.uid)
			.limit(1)
			.onSnapshot((snapshot) => {
				snapshot.docs.map((docs) => {
					setCurrentLoggedInUser({
						username: docs.data().username,
						profilePicture: docs.data().profile_picture,
					});
				});
			});
		return unsubscribe;
	};

	useEffect(() => {
		getUsername();
	}, []);

	const uploadPostToFirebase = (imageUrl, caption) => {
		const unsubscribe = db
			.collection("users")
			.doc(firebase.auth().currentUser.email)
			.collection("posts")
			.add({
				imageUrl: imageUrl,
				user: currentLoggedinUser.username,
				profile_picture: currentLoggedinUser.profilePicture,
				owner_uid: firebase.auth().currentUser.uid,
				caption: caption,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				likes_by_users: [],
				comments: [],
				owner_email: firebase.auth().currentUser.email,
			})
			.then(() => navigation.goBack());

		return unsubscribe;
		// 	navigation.goBack();
	};

	return (
		<Formik
			initialValues={{ caption: "", imageUrl: "" }}
			onSubmit={(values) => {
				// console.log(values);
				uploadPostToFirebase(values.imageUrl, values.caption);
			}}
			validationSchema={uploadPostSchema}
			validateOnMount={true}>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				isValid,
			}) => (
				<>
					<View
						style={{
							margin: 20,
							justifyContent: "space-between",
							flexDirection: "row",
						}}>
						<Image
							source={{
								uri: validUrl.isUri(thumbnailUrl)
									? thumbnailUrl
									: PLACEHOLDER_IMAGE,
							}}
							style={{ width: 100, height: 100 }}
						/>

						<View style={{ flex: 1, marginLeft: 12 }}>
							<TextInput
								placeholder="Write a caption..."
								placeholderTextColor="gray"
								multiline={true}
								style={{ color: "white", fontSize: 20 }}
								onChangeText={handleChange("caption")}
								onBlur={handleBlur("caption")}
								value={values.caption}
							/>
						</View>
					</View>
					<Divider width={0.2} orientation="vertical" />
					<TextInput
						onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
						style={{ color: "white", fontSize: 18 }}
						placeholder="Paste an image URL..."
						placeholderTextColor="gray"
						onChangeText={handleChange("imageUrl")}
						onBlur={handleBlur("imageUrl")}
						value={values.imageUrl}
					/>
					{errors.imageUrl && (
						<Text style={{ color: "red", fontSize: 10 }}>
							{errors.imageUrl}
						</Text>
					)}

					<Button
						onPress={handleSubmit}
						title="Share"
						disabled={!isValid}
					/>
				</>
			)}
		</Formik>
	);
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
