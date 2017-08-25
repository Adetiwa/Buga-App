import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,

        } from '../../actions/Map';
import { connect } from 'react-redux';
import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";
import UserAvatar from 'react-native-user-avatar';
import styles from "./style";

/*
<Icon
									style = {{color: "#FFF", fontSize: 30,}}
									name='person'
								/>
*/								

const datas = [
	{
		name: "Home",
		route: "Map",
		icon: "home",
		bg: "#C5F442",
	},

	{
		name: "Payments",
		route: "Payment",
		icon: "card",
		bg: "#477EEA",

	},
	{
		name: "History",
		route: "History",
		icon: "clock",
		bg: "#DA4437",

	},
	{
		name: "Support",
		route: "Support",
		icon: "happy",
		bg: "#4DCAE0",
	},
	{
		name: "Account Setting",
		route: "Profile",
		icon: "settings",
		bg: "#C5F442",
	},

];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<StatusBar backgroundColor='#f4dc42' barStyle='light-content' />
				<View style = {{
					backgroundColor: '#f4dc42',
					flex: 2,
					justifyContent: "center",
				}}>

				<ListItem
						style = {{
							marginTop: 20,
							paddingBottom: 20,
							height: 50,
							borderBottomWidth: 0,


						}}
						>
							<Left>
								
								<UserAvatar name={this.props.user.fullname}  src={this.props.user.profile_image} size={50} />
								<Text style = {{
									color: '#FFF',
									fontSize: 25,
									textAlign: 'center',
								}}>{this.props.user.fullname}</Text>
							</Left>



				</ListItem>
			</View>
			<View style = {{
				flex: 7
			}}>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: 20 }}>



					<List

						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</View>
			<View style = {{
				flex: 1,
				borderBottomWidth: 0,
			}}>
			<ListItem 
			style = {{
				borderBottomWidth: 0,
			}} onPress={() => this.props.navigation.navigate('Map')}>
						<Left>
						<Icon
									style = {{color: "#f4dc42", fontSize: 30}}
									name='car'
								/>

							<Text style = {{
								color: '#f4dc42',
								fontSize: 13,
								textAlign: 'right',
								borderBottomWidth: 0,
							}}>Drive with Buga</Text>
						</Left>



			</ListItem>

			</View>
			</Container>
		);
	}
}

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    error, region, user, loading, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,

})(SideBar);
