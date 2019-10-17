/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CommandCoordinator } from '../CommandCoordinator';

const firstHeaderKey = 'fourty-two';
const firstHeaderValue = '42';
const secondHeaderKey = 'fourty-three';
const secondHeaderValue = '43';

describe('when handling with before handle callbacks', () => {
    let commandResult = { 'something': 'result' };
    let requestUsed = null;
    let fetchOptions = null;
    global.fetch = (request, options) => {
        requestUsed = request;
        fetchOptions = options;
        return Promise.resolve({ json: () => commandResult });
    };
    let commandCoordinator = new CommandCoordinator();
    let command = {};
    let result = null;

    let first_callback = null;
    let second_callback = null;



    (async beforeEach => {
        first_callback = sinon.spy(options => {
            options.headers[firstHeaderKey] = firstHeaderValue;
        });
        second_callback = sinon.spy(options => {
            options.headers[secondHeaderKey] = secondHeaderValue;
        });
        CommandCoordinator.beforeHandle(first_callback);
        CommandCoordinator.beforeHandle(second_callback);
        result = await commandCoordinator.handle(command)
    })();

    it('call the first callback', () => first_callback.called.should.be.true);
    it('call the second callback', () => second_callback.called.should.be.true);
    it('should contain the first callbacks header value in fetch options', () => fetchOptions.headers[firstHeaderKey].should.equal(firstHeaderValue));
    it('should contain the second callbacks header value in fetch options', () => fetchOptions.headers[secondHeaderKey].should.equal(secondHeaderValue));
});
