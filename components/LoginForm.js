import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { firebase } from "../firebase";

const LoginForm = ({ navigation }) => {
	const LoginFormSchema = Yup.object().shape({
		email: Yup.string()
			.label("Email")
			.email("Enter a valid email")
			.required("Required"),
		password: Yup.string()
			.label("Password")
			.required("No password provided.")
			.min(6, "Password is too short - should be 6 chars minimum."),
	});

	const onLogin = async (email, password) => {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			navigation.navigate("HomeScreen");
			console.log("firebase login success");
		} catch (error) {
			Alert.alert(
				"Login Failed",
				error.message + "\n\n ... What would you like to do next!?",
				[
					{
						text: "OK",
						onPress: () => console.log("Ok"),
						style: "cancel",
					},
					{
						text: "Forgot password?",
						onPress: () => console.log("Forgot password?"),
					},
					{
						text: "Sign up",
						onPress: () => navigation.push("SignupScreen"),
					},
				]
			);
		}
	};

	return (
		<View style={styles.wrapper}>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => {
					onLogin(values.email, values.password);
				}}
				validationSchema={LoginFormSchema}
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
								placeholder="Phone number, username or email"
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
							<Text style={{ color: "#6bb0f5" }}>
								Forgot password?
							</Text>
						</View>

						<Pressable
							titleSize={20}
							style={styles.button(isValid)}
							onPress={handleSubmit}
							disabled={!isValid}>
							<Text style={styles.buttonText}>Log In</Text>
						</Pressable>

						<View style={styles.signupContainer}>
							<Text style={styles.signupText}>
								Don't have an account?{" "}
							</Text>
							<TouchableOpacity
								titleSize={20}
								onPress={() => navigation.push("SignupScreen")}>
								<Text style={{ color: "#6bb0f5" }}>
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default LoginForm;

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

	signupContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginTop: 30,
	},
});
