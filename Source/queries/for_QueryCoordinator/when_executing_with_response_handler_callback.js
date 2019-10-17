/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { QueryCoordinator } from '../QueryCoordinator';

describe('when_executing_with_response_handler_callback', () => {
    let queryResult = { 'something': 'result' };
    global.fetch = (request, options) => {
        return Promise.resolve({json: () => queryResult});
    };

    let queryCoordinator = new QueryCoordinator();
    let result = null;
    let query = {};

    (async beforeEach => {
        QueryCoordinator.responseHandler((response) => "my response");
        result = await queryCoordinator.execute(query);
    })();

    it("should call the response handler", () => result.should.equal("my response"));

})
