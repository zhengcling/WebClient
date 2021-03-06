import service from '../../../../src/app/conversation/factories/conversationListeners';
import { CONSTANTS } from '../../../../src/app/constants';

describe('conversationListeners factory', () => {

    let factory, rootScope;
    let spy = angular.noop;

    beforeEach(angular.mock.module('ng', ($provide) => {
          $provide.decorator('$rootScope', ($delegate) => {
              const service = $delegate;
              service.$on = function (name, listener) {
                  var namedListeners = this.$$listeners[name];
                  if (!namedListeners) {
                    this.$$listeners[name] = namedListeners = [];
                  }
                  namedListeners.push(listener)
                  return spy
              }
              return service;
          });
    }));

    beforeEach(angular.mock.inject(($injector) => {
        rootScope = $injector.get('$rootScope');
        factory = service(rootScope, CONSTANTS);
    }));

    describe('Add subscriber with a draft', () => {

        let unsubscribe;
        let message;

        beforeEach(() => {
            spy = jasmine.createSpy();
            message = { Type: CONSTANTS.DRAFT };
            spyOn(rootScope, '$on').and.callThrough();
            unsubscribe = factory(message);
        });

        it('should record 3 listeners', () => {
            expect(rootScope.$on).toHaveBeenCalledTimes(3);
        });

        it('should record a listener replyConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyConversation', jasmine.any(Function));
        });

        it('should record a listener replyAllConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyAllConversation', jasmine.any(Function));
        });

        it('should record a listener forwardConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('forwardConversation', jasmine.any(Function));
        });

        it('should return a function', () => {
            expect(typeof unsubscribe).toBe('function');
        });

        describe('Emit replyConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'reply'
                });
            })
        });

        describe('Emit replyAllConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyAllConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'replyall'
                });
            })
        });

        describe('Emit forwardConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('forwardConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'forward'
                });
            })
        });

        it('should unsubscribe 3 spies', () => {
            unsubscribe();
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Add subscriber with a message:decrypted', () => {

        let unsubscribe;
        let message;

        beforeEach(() => {
            spy = jasmine.createSpy();
            message = { Type: CONSTANTS.INBOX };
            spyOn(rootScope, '$on').and.callThrough();
            unsubscribe = factory(message);
        });

        it('should record 3 listeners', () => {
            expect(rootScope.$on).toHaveBeenCalledTimes(3);
        });

        it('should record a listener replyConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyConversation', jasmine.any(Function));
        });

        it('should record a listener replyAllConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyAllConversation', jasmine.any(Function));
        });

        it('should record a listener forwardConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('forwardConversation', jasmine.any(Function));
        });

        it('should return a function', () => {
            expect(typeof unsubscribe).toBe('function');
        });

        describe('Emit replyConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).toHaveBeenCalledWith('composer.new', {
                    data: { message },
                    type: 'reply'
                });
            })
        });

        describe('Emit replyAllConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyAllConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).toHaveBeenCalledWith('composer.new', {
                    data: { message },
                    type: 'replyall'
                });
            })
        });

        describe('Emit forwardConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('forwardConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).toHaveBeenCalledWith('composer.new', {
                    data: { message },
                    type: 'forward'
                });
            })
        });

        it('should unsubscribe 3 spies', () => {
            unsubscribe();
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Add subscriber with a message:failedDecryption', () => {

        let unsubscribe;
        let message;

        beforeEach(() => {
            spy = jasmine.createSpy();
            message = { Type: CONSTANTS.INBOX, failedDecryption: true };
            spyOn(rootScope, '$on').and.callThrough();
            unsubscribe = factory(message);
        });

        it('should record 3 listeners', () => {
            expect(rootScope.$on).toHaveBeenCalledTimes(3);
        });

        it('should record a listener replyConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyConversation', jasmine.any(Function));
        });

        it('should record a listener replyAllConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('replyAllConversation', jasmine.any(Function));
        });

        it('should record a listener forwardConversation', () => {
            expect(rootScope.$on).toHaveBeenCalledWith('forwardConversation', jasmine.any(Function));
        });

        it('should return a function', () => {
            expect(typeof unsubscribe).toBe('function');
        });

        describe('Emit replyConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'reply'
                });
            })
        });

        describe('Emit replyAllConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('replyAllConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'replyall'
                });
            })
        });

        describe('Emit forwardConversation', () => {

            beforeEach(() => {
                spyOn(rootScope, '$emit').and.callThrough();
                rootScope.$emit('forwardConversation');
                rootScope.$digest();
            });

            it('should not call the composer.new event', () => {
                expect(rootScope.$emit).not.toHaveBeenCalledWith('composer.new', {
                    message,
                    type: 'forward'
                });
            })
        });

        it('should unsubscribe 3 spies', () => {
            unsubscribe();
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });
});
