"use client";

import {Amplify, type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
    Cognito:{
        userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
        userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID),
    },
};

Amplify.configure({
    Auth: authConfig,
},
{ssr: true}
);

export default function ConfigureAmplify() {
    return null;
}
