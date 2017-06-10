/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const Alexa = require('alexa-sdk');

const SKILL_NAME = 'Loggy FAQ';
const HELP_MESSAGE = 'You can ask my age, name, or breed.';
const STOP_MESSAGE = 'Goodbye!';
const WELCOME_MESSAGE = 'Welcome to Loggy F.A.Q.. Ask me a question.';

const NICKNAMES = [
    'Bo-Log-Nah',
    'Loggy',
    'The Logster',
    'Loggy the Doggy',
    'Logs'
];

const handlers = {

    'LaunchRequest': function () {
        this.emit(':ask', WELCOME_MESSAGE, HELP_MESSAGE);
    },

    'GetAge': function () {
        const birthday = new Date(2010, 11, 22);
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        if (today.getMonth() < birthday.getMonth()
            || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
            age--;
        }
        this.emit(':tell', age + ' years old');
    },

    'GetNickname': function () {
        const randomNickname = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
        this.emit(':tell', randomNickname);
    },

    'GetBreed': function () {
        this.emit(':tell', 'half Great Dane and half Bull Terrier');
    },

    'GetGoodDoggy': function () {
        const doggy = this.event.request.intent.slots.Doggy.value ? this.event.request.intent.slots.Doggy.value : 'doggy';
        this.emit(':tell', 'Loggy is a good ' + doggy);
    },

    'GetWeather': function () {
        this.emit(':tell', "It's perfect weather for a walk!");
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },

};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
