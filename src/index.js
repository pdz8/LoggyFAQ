/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const Alexa = require('alexa-sdk');

const SKILL_NAME = 'Loggy FAQ';
const HELP_MESSAGE = 'Ask me my age, name, or breed.';
const STOP_MESSAGE = 'Goodbye!';

const NICKNAMES = [
    'Bo-Log-Nah',
    'Loggy',
    'The Logster',
    'Loggy the Doggy',
    'Logs'
];

const handlers = {

    'GetAge': function () {
        const birthday = new Date(2010, 11, 22);
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        if (today.getMonth() <= birthday.getMonth() && today.getDate() < birthday.getDate()) {
            age--;
        }
        this.emit(':tell', age + ' years old');
    },

    'GetNickname': function () {
        const randomNickname = NICKNAMES[Math.floor(Math.random * NICKNAMES.length)];
        this.emit(':tell', randomNickname);
    },

    'GetBreed': function () {
        this.emit(':tell', 'half Great Dane and half Bull Terrier');
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
