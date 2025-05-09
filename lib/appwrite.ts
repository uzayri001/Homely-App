// setup authentication using appwrite sdk

import {Avatars, Client, Account, OAuthProvider, Databases, Query,} from "react-native-appwrite";
// import the expo-linking module
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: 'com.uzayr001.Homely',
    // defined in env.local file
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_ID,
    databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client();
client.setEndpoint(config.endpoint!)
.setProject(config.projectID!)
.setPlatform(config.platform)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// login function
export async function login() {
    try {
        // if authentication is successful go back to app
        // expo-linking module is used for handling deep links
        const redirectURI = Linking.createURL('/');

        // request OAuth token from appwrite using Google provider
        const respone = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);

        // check if response exists
        if (!respone) throw new Error("No response, Failed to login");
        
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
        const userId = url.searchParams.get('userId')?.toString();

        // if they don't exist throw a error
        if (!secret) {
            throw new Error("No secret, failed to login");
        }

        else if (!userId) {
            throw new Error("No user ID, failed to login");
        }

        // if successful create new account session
        const accountSession = await account.createSession(userId, secret);

        // if no session exists throw a new error
        if (!accountSession) {
            throw new Error("No account session, Failed to Login");
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

export async function getLatestProperties() {
    try {
        // get latest 5 properties
        const result = await databases.listDocuments(
            config.databaseID!,
            config.propertiesCollectionID!,
            [Query.orderDesc('$createdAt'), Query.limit(5)]
        );

        // return documents
        return result.documents;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({ filter, query, limit}: {
    filter: string,
    query: string,
    limit?: number
}) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')];
        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('type', filter));
        }

        if (query) {
            buildQuery.push(Query.or([
                Query.search('name', query),
                Query.search('address', query),
                Query.search('type', query),
            ]));
        }

        if (limit) {
            buildQuery.push(Query.limit(limit));
        }

        const result = await databases.listDocuments(
            config.databaseID!,
            config.propertiesCollectionID!,
            buildQuery
        );

        // return documents
        return result.documents;
        
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseID!,
        config.propertiesCollectionID!,
        id
      );
  
      // Assuming 'gallery' is the relationship attribute
      const gallery = result.gallery;
  
      // Extract image URLs from the related gallery documents
      const imageUrls = gallery.map((item: any) => item.image);
  
      return {
        ...result,
        imageUrls,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
}

export async function getReviewCountByPropertyId(propertyId: string) {
    try {
        const result = await databases.listDocuments(
            config.databaseID!,
            config.reviewsCollectionID!,
            [Query.equal('property', propertyId)]
        );

        // Return the total number of reviews
        return result.total;
    } catch (error) {
        console.error(error);
        return 0; // Return 0 if there's an error
    }
}