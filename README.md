
<img src="http://outpt.net/fml/FindMyLine-logo.png" width="250"/>

# Find My Line: MTA Transit Data like you've never seen it before!
[<img src="http://outpt.net/fml/findmyline_video.jpg"/>](https://www.youtube.com/watch?v=su92iSFLy_o)
## About

As a team of long-time and native New Yorkers, we wanted to build an app that made MTA data accessible the way real New Yorkers need it ...on the run! The MTA API provides data via Google's protocol buffers, a tool for serialized, structured data that does not support Javascript, so one of our first challenges was parsing the data for usable information. Knowing we wanted flexible, dynamic querying led us to use GraphQL with an Apollo server. For the frontend, we used React Native with a React Native Map which follows the MTA line color scheme, so that users can see their closest station, available trains, and the path of individual train lines. Visually, this combines the experience of looking at a MTA map with searching for directions in Google Maps. The UX design updates and extends the MTA visual design, taking the on-platform arrival boards as inspiration. Users can favorite stations they go to regularly for future use.

### Acknowledgements
We'd like to thank our Grace Hopper cohort, our instructors, and our families and friends. We'd especially like to thank our mentor [Alec Friedman](https://github.com/alecfriedman3) for all his contributions to our success. Video production services provided by [RAMPANT](http://rampant.nyc).


<img src="http://outpt.net/fml/platform.jpg"/>

<hr />

## Development


Fork the repo and clone to your system. Run `npm install` to install dependencies.

The apollo and expo servers need to run concurrently, with the following commands:
* `npm run play:dev`
* `npm run start:dev`

You'll need to have the XCode development environment installed to to test through the iOS simulator.

## Testing

To join our beta testing phase (iOS users only), create an [Expo account](https://expo.dev/signup) and [send us an email](mailto:findmyline@pir2.org) from the address you signed up with. Download the Expo Go app on your mobile device, create an account, and scan the [QR code](https://expo.dev/@jennifermklein/findmyline)


[<img src="https://qr.expo.dev/expo-go?owner=jennifermklein&slug=findmyline&releaseChannel=default&host=exp.host" width="250"/>](https://expo.dev/@jennifermklein/findmyline)

## Feedback
We're continuing development on Find My Line, and we welcome your thoughts on our project! If you'd like to share your thoughts after using Find My Line, you can send us an email at [findmyline@pir2.org](mailto:findmyline@pir2.org) or use our [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSeBUv8D-wSfTf_AgF3BZhtrEcfalen9ZPfrh1SyjXJU8Wcn9g/viewform).
