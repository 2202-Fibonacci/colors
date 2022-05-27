
<img src="http://outpt.net/fml/FindMyLine-logo.png" width="250"/>

# Find My Line: MTA Transit Data like you've never seen it before!
[<img src="http://outpt.net/fml/findmyline_video.png"/>](https://www.youtube.com/watch?v=su92iSFLy_o)
## About
As long-time New Yorkers, we wanted to build an app that made MTA data accessible the way real New Yorkers need it ...on the run! The MTA API provides data via Google's protocol buffers, a tool for serialized, structured data that does not support Javascript, so one of our first challenges was parsing the data for usable information. Knowing we wanted flexible, dynamic querying led us to use GraphQL with an Apollo server. For the frontend, we used React Native with a React Native Map color coordinated by MTA line colors, so that users can see their closest station, available trains, and the path of individual train lines. Visually, this combines the experience of looking at a MTA map with searching for directions in Google. The UX design updates and extends the MTA visual design, taking the arrival boards as inspiration, but giving the user the options to favorite stations for future use.

## Acknowledgements
We'd like to thank 

<img src="http://outpt.net/fml/platform.png" width="250"/>

# Project

## Local Setup:

Clone the repo and enter `npm install`

Run the apollo and expo servers by entering:
`npm run play:dev` and
`npm run start:dev`

Then press i to open the app in an ios simulator. You may need to install xcode on your computer and open the simulator there first.

## Expo Go

To join our beta testing phase (iOS users only), create an [Expo account](https://expo.dev/signup) and send us an email from the address you signed up with. Download the Expo Go app on your mobile device, create an account, and scan the QR code below (also available at this URL: https://expo.dev/@jennifermklein/findmyline)


[<img src="https://qr.expo.dev/expo-go?owner=jennifermklein&slug=findmyline&releaseChannel=default&host=exp.host" width="250"/>](https://expo.dev/@jennifermklein/findmyline)