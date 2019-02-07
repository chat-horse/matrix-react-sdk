/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017, 2019 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import MatrixClientPeg from './MatrixClientPeg';

// TODO: Decommission.
// Ref: https://github.com/vector-im/riot-web/issues/8424
export default {
    /*
     * Returns the email pusher (pusher of type 'email') for a given
     * email address. Email pushers all have the same app ID, so since
     * pushers are unique over (app ID, pushkey), there will be at most
     * one such pusher.
     */
    getEmailPusher: function(pushers, address) {
        if (pushers === undefined) {
            return undefined;
        }
        for (let i = 0; i < pushers.length; ++i) {
            if (pushers[i].kind === 'email' && pushers[i].pushkey === address) {
                return pushers[i];
            }
        }
        return undefined;
    },

    addEmailPusher: function(address, data) {
        return MatrixClientPeg.get().setPusher({
            kind: 'email',
            app_id: 'm.email',
            pushkey: address,
            app_display_name: 'Email Notifications',
            device_display_name: address,
            lang: navigator.language,
            data: data,
            append: true, // We always append for email pushers since we don't want to stop other accounts notifying to the same email address
        });
    },
};
