import React, { Component } from "react";
import { View, Image, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";
import AndroidBackButton from "react-native-android-back-button";

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Text,
	Left,
	Right,
	Body,
	icon,
	Separator,
} from 'native-base';
import styles from './styles';


const datas = [
	{
		route: 'CardView',
		text: 'Credit/Debit Card',
		icon: 'card',
	},
	{
		route: 'CardView',
		text: 'CASH',
		icon: 'cash',
	},

];

class Payment extends Component {
	render() {
		return (
			<Container style={styles.container}>
				<AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />

				<Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}} >
					<Left>
						<TouchableOpacity
								transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}
							>
								<Image source = {menu}/>
							</TouchableOpacity>

					</Left>

					<Body>
            <Title style = {{color: '#888'}}>Payment</Title>

          </Body>
          <Right>
            <Button transparent
							onPress={() => this.props.navigation.navigate('CardView')}
							>
            	<Icon  style = {{color: '#888'}} name="card" />
            </Button>
          </Right>
				</Header>

				<Content>
					<Separator bordered>
						<Text>PAYMENT</Text>
					</Separator>

						<ListItem
							button onPress={() => this.props.navigation.navigate('Cash')}>

								<Text>CASH</Text>
								<Right>
									<Icon name='cash' />
								</Right>

						</ListItem>
						<ListItem
								onPress={() => this.props.navigation.navigate('CardView')}
								>
								<Text>CREDIT/DEBIT CARD</Text>
								<Right>
									<Icon name='card' />
								</Right>

						</ListItem>


				</Content>
			</Container>
		);
	}
}
const menu = require("../../../img/MENU.png");

export default Payment;
