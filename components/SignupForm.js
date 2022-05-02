import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { firebase, db } from "../firebase";

const SignupForm = ({ navigation }) => {
	const SignupFormSchema = Yup.object().shape({
		email: Yup.string()
			.label("Email")
			.email("Invalid email address")
			.required("Required"),
		username: Yup.string()
			.label("Username")
			.required("Required")
			.min(2, "Username must be at least 2 characters"),
		password: Yup.string()
			.label("Password")
			.required("No password provided.")
			.min(6, "Password is too short - should be 6 chars minimum."),
	});

	const getRandomProfilePicture = async () => {
		const response = await fetch("https://randomuser.me/api/");
		const data = await response.json();
		return data.results[0].picture.large;
	};

	const onSignup = async (email, username, password) => {
		try {
			const authUser = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await firebase.auth().currentUser.updateProfile({
				displayName: username,
			});
			navigation.navigate("HomeScreen");
			console.log("firebase signup success");

			db.collection("users")
				.doc(authUser.user.email)
				.set({
					owner_uid: authUser.user.uid,
					username: username,
					email: authUser.user.email,
					profile_picture: await getRandomProfilePicture(),
				});
		} catch (error) {
			Alert.alert(
				"Signup Failed",
				error.message + "\n\n ... What would you like to do next!?",
				[
					{
						text: "OK",
						onPress: () => console.log("Ok"),
						style: "cancel",
					},
					{
						text: "Login",
						onPress: () => navigation.push("LoginScreen"),
					},
				]
			);
		}
	};

	return (
		<View style={styles.wrapper}>
			<Formik
				initialValues={{ email: "", username: "", password: "" }}
				onSubmit={(values) => {
					onSignup(values.email, values.username, values.password);
				}}
				validationSchema={SignupFormSchema}
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
							style={[
								styles.inputField,
								{
									borderColor:
										values.email.length < 1 ||
										Validator.validate(values.email)
											? "#ccc"
											: "red",
								},
							]}>
							<TextInput
								placeholderTextColor="#444"
								placeholder="Email address"
								autoCapitalize="none"
								keyboardType="email-address"
								textContentType="emailAddress"
								autoFocus={true}
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
							/>
						</View>
						<View
							style={[
								styles.inputField,
								{
									borderColor:
										1 > values.username.length ||
										values.username.length > 2
											? "#ccc"
											: "red",
								},
							]}>
							<TextInput
								placeholderTextColor="#444"
								placeholder="Username"
								autoCapitalize="none"
								textContentType="username"
								autoFocus={true}
								onChangeText={handleChange("username")}
								onBlur={handleBlur("username")}
								value={values.username}
							/>
						</View>
						<View
							style={[
								styles.inputField,
								{
									borderColor:
										1 > values.password.length ||
										values.password.length >= 6
											? "#ccc"
											: "red",
								},
							]}>
							<TextInput
								placeholderTextColor="#444"
								placeholder="Password"
								autoCapitalize="none"
								textContentType="password"
								autoCorrect={false}
								secureTextEntry={true}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
							/>
						</View>
						<View
							style={{
								alignItems: "flex-end",
								marginBottom: 30,
							}}>
							<Text style={{ color: "#6bb0f5" }}></Text>
						</View>

						<Pressable
							titleSize={20}
							style={styles.button(isValid)}
							onPress={handleSubmit}
							disabled={!isValid}>
							<Text style={styles.buttonText}>Sign Up</Text>
						</Pressable>

						<View style={styles.signinContainer}>
							<Text style={styles.signupText}>
								Already have an account?{" "}
							</Text>
							<TouchableOpacity
								titleSize={20}
								onPress={() => navigation.goBack()}>
								<Text style={{ color: "#6bb0f5" }}>
									Sign In
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default SignupForm;

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 80,
	},

	inputField: {
		borderRadius: 4,
		padding: 12,
		backgroundColor: "#fafafa",
		marginBottom: 10,
		borderWidth: 1,
	},

	button: (isValid) => ({
		backgroundColor: isValid ? "#0096f6" : "#9acaf7",
		alignItems: "center",
		justifyContent: "center",
		minHeight: 42,
		borderRadius: 4,
	}),

	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 20,
	},

	signinContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginTop: 30,
	},
});
