/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { QueryCoordinator } from '../QueryCoordinator';

describe('when_executing', () => {
    let queryResult = { 'something': 'result' };
    let requestUsed = null;
    let fetchOptions = null;
    global.fetch = (request, options) => {
        requestUsed = request;
        fetchOptions = options;
        return Promise.resolve({json: () => queryResult});
    };

    let queryCoordinator = new QueryCoordinator();
    let result = null;
    let query = {};

    (async beforeEach => {
        result = await queryCoordinator.execute(query)
    })();

    it('should pass an options object', () => fetchOptions.should.be.defined);
    it('should continue with the result coming back', () => result.should.equal(queryResult));
})
