import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { firebase, db } from "../firebase";

const postFooterIcons = [
	{
		name: "Like",
		imageUrl:
			"https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
		likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like.png",
	},
	{
		name: "Comment",
		imageUrl:
			"https://img.icons8.com/material-outlined/90/ffffff/speech.png",
	},
	{
		name: "Share",
		imageUrl:
			"https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-send-email-flatart-icons-outline-flatarticons.png",
	},
	{
		name: "Save",
		imageUrl:
			"https://img.icons8.com/material-outlined/96/ffffff/bookmark-ribbon--v1.png",
	},
];

const Post = ({ post }) => {
	const handleLike = (post) => {
		const currentLikeStatus = !post.likes_by_users.includes(
			firebase.auth().currentUser.email
		);

		db.collection("users")
			.doc(post.owner_email)
			.collection("posts")
			.doc(post.id)
			.update({
				likes_by_users: currentLikeStatus
					? firebase.firestore.FieldValue.arrayUnion(
							firebase.auth().currentUser.email
					  )
					: firebase.firestore.FieldValue.arrayRemove(
							firebase.auth().currentUser.email
					  ),
			})
			.then(() => {
				console.log("Liked!");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleComment = (post) => {};

	const [show, setShow] = useState(false);

	return (
		<View style={{ marginBottom: 30 }}>
			<Divider width={1} orientation="vertical" />
			<PostHeader post={post} />
			<PostImage post={post} />
			<View style={{ marginHorizontal: 15, marginTop: 10 }}>
				<PostFooter
					post={post}
					handleLike={handleLike}
					handleComment={handleComment}
				/>
				<Likes post={post} />
				<Caption post={post} />
				<CommentSection post={post} show={show} setShow={setShow} />
				<Comments post={post} show={show} setShow={setShow} />
			</View>
		</View>
	);
};

const PostHeader = ({ post }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				margin: 5,
				alignItems: "center",
			}}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image
					source={{ uri: post.profile_picture }}
					style={styles.profile}
				/>
				<Text
					style={{
						color: "white",
						marginLeft: 5,
						fontWeight: "700",
					}}>
					{post.user}
				</Text>
			</View>

			<Text style={{ color: "white", fontWeight: "900" }}>...</Text>
		</View>
	);
};

const PostImage = ({ post }) => (
	<View
		style={{
			width: "100%",
			height: 450,
		}}>
		<Image
			source={{ uri: post.imageUrl }}
			style={{ height: "100%", resizeMode: "cover" }}
		/>
	</View>
);

const PostFooter = ({ handleLike, post, handleComment }) => (
	<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				width: "32%",
			}}>
			<TouchableOpacity onPress={() => handleLike(post)}>
				<Image
					style={styles.footerIcon}
					source={{
						uri: post.likes_by_users.includes(
							firebase.auth().currentUser.email
						)
							? postFooterIcons[0].likedImageUrl
							: postFooterIcons[0].imageUrl,
					}}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleComment(post)}>
				<Image
					style={styles.footerIcon}
					source={{ uri: postFooterIcons[1].imageUrl }}
				/>
			</TouchableOpacity>
			<Icon
				imgStyle={styles.footerIcon}
				imgUrl={postFooterIcons[2].imageUrl}
			/>
		</View>

		<Icon
			imgStyle={styles.footerIcon}
			imgUrl={postFooterIcons[3].imageUrl}
		/>
	</View>
);

const Icon = ({ imgStyle, imgUrl }) => (
	<TouchableOpacity>
		<Image style={imgStyle} source={{ uri: imgUrl }} />
	</TouchableOpacity>
);

const Likes = ({ post }) => (
	<View style={{ flexDirection: "row", marginTop: 4 }}>
		<Text style={{ color: "white", fontWeight: "600" }}>
			{post.likes_by_users.length.toLocaleString("en")} likes
		</Text>
	</View>
);

const Caption = ({ post }) => (
	<View style={{ marginTop: 1, flexDirection: "row" }}>
		<Text style={{ color: "white", fontWeight: "900" }}>{post.user}</Text>
		<Text style={{ color: "white", fontWeight: "400" }}>
			{" "}
			{post.caption}
		</Text>
	</View>
);

const CommentSection = ({ post, show, setShow }) => (
	<View style={{ marginTop: 5 }}>
		{!!post?.comments.length && (
			<TouchableOpacity onPress={() => setShow((s) => !s)}>
				<Text style={{ color: "gray", fontWeight: "500" }}>
					View {post.comments.length > 1 ? "all " : ""}{" "}
					{post.comments.length}{" "}
					{post.comments.length > 1 ? "comments" : "comment"}
				</Text>
			</TouchableOpacity>
		)}
	</View>
);

const Comments = ({ post, show, setShow }) => (
	<>
		{post?.comments.map((comment, index) => (
			<View
				key={index}
				style={{ marginTop: 5, marginLeft: 10 }}
				commentsVisible>
				<View
					style={{
						display: show ? "flex" : "none",
					}}>
					<View style={styles.commentsVisible}>
						<Text
							style={{
								fontSize: 12,
								color: "white",
								fontWeight: "bold",
							}}>
							{comment.user}
						</Text>
						<Text
							style={{
								fontSize: 11,
								color: "white",
								fontWeight: "400",
							}}>
							{" "}
							{comment.comment}
						</Text>
					</View>
				</View>
			</View>
		))}
	</>
);

export default Post;

const styles = StyleSheet.create({
	profile: {
		width: 35,
		height: 35,
		borderRadius: 18,
		marginLeft: 6,
		borderWidth: 1,
		borderColor: "#ff8501",
	},

	footerIcon: {
		width: 33,
		height: 33,
	},

	commentsVisible: {
		flexDirection: "row",
		alignItems: "center",
		display: "flex",
	},
});
