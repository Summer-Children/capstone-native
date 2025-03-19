# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Preparation

- register the certificate on xcode
- enable developer mode on your iPhone

## Get started

1. Install dependencies

    ```bash
    pnpm i
    ```

2. build the app

    ```bash
    pnpm ios-device
    ```

3. run the app

    ```bash
    # on your ios device
    pnpm start-dev-client

    # on simulator
    pnpm ios
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Procedures to use the app on your physical phone when you have to access local backend server (when the deployed backend server is ready, you do not need to do this.)

1. Replace your .env
   replace the EXPO_PUBLIC_API_URL of .env with the url I share

2. Build (If this is your first time to use the physical phone)

```bash
pnpm exec expo run:ios
```

3. Scan the QR code with your physical iphone

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## eas build

ref: https://github.com/expo/eas-cli/issues/997

```
eas build -p ios --profile preview
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
