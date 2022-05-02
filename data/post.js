import { USERS } from "../data/users";

export const POSTS = [
	{
		imageUrl: "https://i.ibb.co/182bP1y/4k.png",
		user: USERS[0].user,
		likes: 7870,
		caption: "Train Ride to Hogwarts",
		profile_picture: USERS[0].image,
		comments: [
			{
				user: "theblack",
				comment: "WOW, nice build youre working on",
			},
		],
	},
	{
		imageUrl: "https://i.ibb.co/182bP1y/4k.png",
		user: USERS[4].user,
		likes: 7870,
		caption: "Train Ride to Hogwarts",
		profile_picture: USERS[4].image,
		comments: [
			{
				user: "theblack",
				comment: "WOW, nice build youre working on",
			},
			{
				user: "thewhite",
				comment: "I love this build",
			},
		],
	},
	{
		imageUrl: "https://i.ibb.co/182bP1y/4k.png",
		user: USERS[1].user,
		likes: 70,
		caption: "Train Ride to Lagos Nigeria",
		profile_picture: USERS[1].image,
		comments: [],
	},
	{
		imageUrl: "https://i.ibb.co/182bP1y/4k.png",
		user: USERS[2].user,
		likes: 780,
		caption: "Train Ride to Hogwarts!!!!!!",
		profile_picture: USERS[2].image,
		comments: [
			{
				user: "theblack",
				comment: "WOW, nice build youre working on",
			},
			{
				user: "thewhite",
				comment: "I love this build",
			},
		],
	},
	{
		imageUrl: "https://i.ibb.co/182bP1y/4k.png",
		user: USERS[3].user,
		likes: 870,
		caption: "Building with a faulty keyboard",
		profile_picture: USERS[3].image,
		comments: [
			{
				user: "theblack",
				comment: "WOW, nice build youre working on",
			},
			{
				user: "thewhite",
				comment: "I love this build",
			},
		],
	},
];
