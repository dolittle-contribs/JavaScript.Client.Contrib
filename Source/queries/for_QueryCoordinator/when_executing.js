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
        return {
            then: (callback) => {
                let result = callback({
                    json: () => {
                        return queryResult;
                    }
                });

                return {
                    then: (callback) => {
                        callback(result);
                    }
                }
            }
        }
    };

    let queryCoordinator = new QueryCoordinator();
    let result = null;
    let query = {};

    (beforeEach => {
        queryCoordinator.execute(query).then(r => result = r);
    })();

    it('should pass an options object', () => fetchOptions.should.be.defined);
    it('should continue with the result coming back', () => result.should.equal(queryResult));
})