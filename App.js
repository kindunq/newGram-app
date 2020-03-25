import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Text, View, AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './apollo';
import style from './style';

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [client, setClient] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const preLoad = async () => {
		try {
			await Font.loadAsync({
				...Ionicons.Font
			});
			await Asset.loadAsync([require('./assets/logo.jpg')]);
			const cache = new InMemoryCache();
			await persistCache({
				cache,
				storage: AsyncStorage
			});
			const client = new ApolloClient({
				cache,
				...apolloClientOptions
			});
			const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
			if (isLoggedIn === null || isLoggedIn === false) {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
			setLoaded(true);
			setClient(client);
		} catch (error) {
			console.log;
		}
	};
	useEffect(() => {
		preLoad();
	}, []);
	return loaded && client && !isLoggedIn !== null ? (
		<ApolloProvider client={client}>
			<ThemeProvider theme={style}>
				<View>
					{isLoggedIn === true ? <Text>I'm In</Text> : <Text>I'm Out</Text>}
				</View>
			</ThemeProvider>
		</ApolloProvider>
	) : (
		<AppLoading />
	);
}
