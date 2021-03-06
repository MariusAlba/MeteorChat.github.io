import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Messages = new Mongo.Collection('messages');

if (Meteor.isClient){
    Template.messages.helpers({
        messages: function () {
        return Messages.find();
        }
    });
    
    Template.messages.events({
        'keypress textarea': function(e, instance) {
            if (e.keyCode == 13) { // enter key pressed
            var value = instance.find('textarea').value;
            instance.find('textarea').value = '';
            
            Messages.insert({
                message: value,
                timestamp: new Date(),
                user: Meteor.userId()
            });
          }
        }
    });
    
    Template.message.helpers({
       user: function(){
        return Meteor.users.findOne({_id: this.user});   
       },
        time: function(){
            return moment(this.timestamp).format('hh:mm:ss a')
        }
    });
    Template.registerHelper('Date', function(date) {
  return moment(date).format('MM-DD-YYYY');
    });
    Template.message.events({
        'click .delete': function() {
            Messages.remove(this._id);
        }
    });
    
    Accounts.ui.config({
        passwordSignupFields:"USERNAME_AND_OPTIONAL_EMAIL"
    });
    
    
}