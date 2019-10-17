/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { QueryCoordinator } from '../QueryCoordinator';

describe('when executing with custom response handler', () => {
    let queryResult = { 'something': 'result' };
    let requestUsed = null;
    let fetchOptions = null;
    global.fetch = (request, options) => {
        requestUsed = request;
        fetchOptions = options;
        return Promise.resolve({json: () => queryResult});
    };
    let queryCoordinator = new QueryCoordinator();
    let query = {};
    let result = null;

    (async beforeEach => {
        QueryCoordinator.responseHandler(response => "my response");
        result = await queryCoordinator.execute(query);
    })();

    it("should call the custom handler", () => result.should.equal("my response"));
});
