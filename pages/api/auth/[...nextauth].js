import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("im here");
            const firstName = profile.given_name || '';
            const lastName = profile.family_name || '';

            // Constructing parcelData object with extracted data
            const parcelData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: profile.email,
                password: 'NOT_SET',
                country: "" // You can set the country here if you have this information available
            };


            const rawResponse = await fetch(`${process.env.BACKEND_URL}chutlunds/fb_googleLogin`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });


            const response = await rawResponse.json();

            if (response.success) {
                return true
            } else {
                return false
            }
        },
        async redirect({ url, baseUrl }) {
            // console.log(url, baseUrl);
            return baseUrl
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    },
    secret: process.env.JWT_SECRET,


};

export default NextAuth(authOptions);


