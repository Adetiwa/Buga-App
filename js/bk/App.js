/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Login from "./components/form/Login";
import Register from "./components/form/register";
import Pickup from "./components/pickup";
import Dropoff from "./components/dropoff";
import Summary from "./components/summary";
import Init from "./components/init";
import Confirm from "./components/confirm";
import Home from "./components/home";
import CardView from "./components/cardinput";
import Profile from "./components/profile";
import Map from "./components/map";
import History from "./components/history";
import Payment from "./components/payment";
import Route from "./components/route";
import Support from "./components/support";
import SplashPage from "./components/splashscreen";
import Header from "./components/Header";
import SideBar from "./components/sidebar";

const AppNavigator = StackNavigator(
	{

		Drawer: {screen: Drawer},
		Login: { screen: Login },

		Map: {screen: Map},
		Register: { screen: Register },
		Pickup: { screen: Pickup },
		Dropoff: { screen: Dropoff },
		Summary: { screen: Summary },
		Init: { screen: Init },
		Confirm: {screen: Confirm},
		Home: {screen: Home},
		CardView: {screen: CardView},
		Profile: {screen: Profile},
		Payment: {screen: Payment},
		History: {screen: History},
		Route: {screen: Route},
		Support: {screen: Support},
		SplashPage: {screen: SplashPage},
		Header: {screen: Header},
	},
	{
		initialRouteName: "SplashPage",
		headerMode: "none",
	}
);

export default () =>
	<Root>
		<AppNavigator />
	</Root>;
