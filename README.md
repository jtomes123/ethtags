# Ethtags
Dogtag system running in ethereum blockchain. It allows the users to attach a name and a short text to their adress ethereum. The frontend is written in javascript using the meteor framework and the backend is written in solidity. You can check it out [here](ethtags.herokuapp.com). It is currently running in the ropsten test network and deployment to ethereum is planned for some time in the 2018.

You can see your dogtag via the link which is provided after a dogtag is generated. Dogtag can also be embeded as an iframe.

If you would like to deploy your own instance of the frontend one of the best ways to do so is through Heroku. You can check out the meteor [here](https://guide.meteor.com/deployment.html).

What does work now:
* You can create a dogtag
* You can customize a dogtag
* You can easily copy a link
* There is also a button to copy prepared iframe tag
* You can donate to the contract
* The verification system
What is planned in the future:
* Ability to store style of the dogtag in the blockchain through a separate contract
* Signing of messages (maybe)
