global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');
var Vue = require('vue');
Vue.use(require('vue-resource'));

var moment = require('moment');

var _ = require('lodash');


/////////////////////////////////////////
// Vue JS - Config
/////////////////////////////////////////

Vue.config.debug = true;

Vue.filter('simpleDate', function (value) {
    return moment(value).format('D/M/YYYY HH:mm');
});

Vue.filter('timeAgo', function (value) {
    return moment(value).fromNow();
});

Vue.filter('tagFilter', function (objectArray, filterTag) {
    if (filterTag) {
        var filteredArray = [];
        for (var i in objectArray) {
            if (_.contains(objectArray[i].tags, filterTag)) {
                filteredArray.push(objectArray[i]);
            }
        }
        return filteredArray;
    }
    return objectArray;
});

/////////////////////////////////////////
// Vue JS - Pages
/////////////////////////////////////////


new Vue({
    el: '#pings',
    ready: function() {

        this.loadData();

    },

    methods: {

        loadData: function() {
            this.$http.get('/pings').then(function (response) {

                this.$set('pings', response.data);

                this.extractTags();

                this.checkForAlerts();

            }, function (response) {

                console.log(response);

            });
        },

        checkForAlerts: function() {
            this.alerts = false;

            for (var i in this.pings) {
                if (this.pings[i].error && this.pings[i].active) {
                    this.alerts = true;
                }
            }
        },

        extractTags: function() {
            this.tags = [];
            for (var i in this.pings) {
                this.tags = _.union(this.tags, this.pings[i].tags);
            }

            vlog(this.pings);
            vlog(this.tags);
        },

        editMode: function(ping, pingIndex, state) {

            Vue.set(ping, 'edit', state);

            //store the pristine version so it can be put back if the user cancels
            if (state) {

                this.pristinePings.push(Vue.util.extend({},ping));

            } else {

                var backupPing = _.find(this.pristinePings, {id: ping.id});

                Vue.set(ping, 'name', backupPing.name);

                //Remove the copy from the pristine array?
                _.remove(this.pristinePings, {id: ping.id});

            }
        },

        deletePing: function(pingIndex) {

            var ping = this.pings[pingIndex];

            this.$http.delete('/pings/' + ping.id).then(function (response) {

                this.pings.splice(pingIndex, 1);

                this.checkForAlerts();

                this.extractTags();

            }, function (response) {

                console.log(response.data);

            });
        },

        savePing: function(pingIndex) {

            var ping = this.pings[pingIndex];

            this.$http.put('/pings/' + ping.id, ping).then(function (response) {

                this.pings[pingIndex].edit = false;

                //Update the local record with the updated one from the server
                this.pings[pingIndex] = response.data;

                this.extractTags();

                //Remove the copy from the pristine array?
                _.remove(this.pristinePings, {id: ping.id});

            }, function (response) {

                console.log(response.data);

            });
        },

        filterByTag: function(tag) {
            this.filterTag = tag;
        }
    },
    data: {
        filterTag: null,
        pings: [],
        tags:  [],
        pristinePings: [],
        alerts: false
    }
});

function vlog() {
    console.log(JSON.parse(JSON.stringify(arguments)));
}