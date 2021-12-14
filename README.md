# Forty Years Of Weather

[Try it out here](https://fortyyearsofweather.netlify.app/)

Forty Years Of Weather is a React Web Application. 

It takes the current time and fetches weather data for the past forty years of said hour on the said date. So much for the time. The place is my Hamburg, Germany, so you get forty years of Hamburg weather, while the app may be easily expanded to different cities all around the world.

## About the Data (Backend)

To get the data I used the Open Weather Map API. While you can fetch this historical data via a history API of the service, it gets pretty expensive for such a small app. Instead you can also buy one time bulks of data, which I did for my hometown. Forty years of Hamburg weather data were then migrates to MongoDB over at MongoDB atlas. To fetch the data I set up a MongoDB Realm webhook that serves as an own API to convey the exact data for the requested date.

At the same time a cron job over at GitHub Actions runs an hourly python script to push new current data to the Database so my app does not run out of data within a year. The frontend fetches the data from a simple backend application over at Heroku.

## About the Display (Frontend)

The frontend is a simple React app that pretty much only displays the data via the d3.js module. You can hover the nodes for each of the temperatures and get a few infos below plus a comment on climate change.

## Next steps?

As I stated above this app could be expanded to other cities so one could compare the weather of Hamburg to Sydney or Tokyo for example. Also it would be very interesting to add a linear regression line to the graph. Another feature might be to toggle between Celsius and Fahrenheit. We'll see when I find the time for that.
