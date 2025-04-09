// setup authentication using appwrite sdk

import {Avatars, Client, Account, OAuthProvider,} from "react-native-appwrite";
// import the expo-linking module
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: 'com.uzayr001.Homely',
    // defined in env.local file
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_ID
}

export const client = new Client();
client.setEndpoint(config.endpoint!)
.setProject(config.projectID!)
.setPlatform(config.platform)

export const avatar = new Avatars(client);
export const account = new Account(client);

// login function
export async function login() {
    try {
        // if authentication is successful go back to app
        // expo-linking module is used for handling deep links
        const redirectURI = Linking.createURL('/');

        // request OAuth token from appwrite using Google provider
        const respone = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);

        // check if response exists
        if (!respone) throw new Error("Failed to Login");
        
        // if OAuth2Token successfully created open web session to continue OAuth process
        const browserResult = await openAuthSessionAsync(respone.toString(), redirectURI);

        // if openAuthSessionAsync failed
        if (browserResult .type != 'success') {
            throw new Error("Failed to Open Auth Session");
        }

        // extract browser result url if successful
        const url = new URL(browserResult.url);

        // extract secret and userID from url
        const secret = url.searchParams.get('secret')?.toString();
        const userID = url.searchParams.get('userID')?.toString();

        // if they don't exist throw a error
        if (!secret || !userID) {
            throw new Error("Failed to login");
        }

        // if successful create new account session
        const accountSession = await account.createSession(userID, secret);

        // if no session exists throw a new error
        if (!accountSession) {
            throw new Error("Failed to login");
        }

        return true;

    } catch(error) {
        // log error during authentication
        console.error(error);
        return false;
    }
}

// logout function
export async function logout() {
    try {
        // delete session
        await account.deleteSession('current');
        return true;
    } catch(error) {
        // console error
        console.error(error);
        return false;
    }
}

// fetch info about current user
export async function getCurrentUser() {
    try {
        const respone = await account.get();

        // generate user avatar for user
        if (respone.$id) {
            const userAvatar = avatar.getInitials(respone.name);
            return {
                ... respone,
                avatar: userAvatar.toString()
            }
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}