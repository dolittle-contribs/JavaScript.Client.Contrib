/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CommandCoordinator } from '../CommandCoordinator';

describe('when handling', () => {
    let commandResult = {'something': 'result'};
    let requestUsed = null;
    let fetchOptions = null;
    global.fetch = (request, options) => {
        requestUsed = request;
        fetchOptions = options;
        return {
            then: (callback) => {
                let result = callback({
                    json: () => {
                        return commandResult;
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
    let commandCoordinator = new CommandCoordinator();
    let command = {};
    let result = null;

    (beforeEach => {
        commandCoordinator.handle(command).then(r => result = r);
    })();

    it("should pass along the result", () => result.should.equal(commandResult));
});
