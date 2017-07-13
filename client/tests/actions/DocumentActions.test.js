import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DOCUMENT, USER } from '../../constants/Constants';
import * as DocumentActions from '../../actions/DocumentActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Fetch Documents', () => {
    it('should fetch documents and dispatches GET_ALL_DOCS_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/documents?limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ title: 'backend' }],
          metaData: {}
        }
      });
      const expectedActions = [{
        type: DOCUMENT.GET_ALL_SUCCESS,
        documents: [{ title: 'backend' }],
        metaData: {},
        offset: 0,
        query: '' }];
      const store = mockStore();
      done();
      return store.dispatch(DocumentActions.fetchDocuments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Document', () => {
    it('should search for documents and dispatches GET_ALL_DOCS_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/search/documents?q=dms&limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ title: 'frontend' }],
          metaData: {}
        }
      });
      const expectedActions = [{
        type: DOCUMENT.SEARCH_SUCCESS,
        searchResult: [{ title: 'frontend' }],
        metaData: {},
        offset: 0,
        query: 'front' }];
      const store = mockStore();
      done();
      return store.dispatch(DocumentActions.searchDocuments('front'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });


  describe('Save new Document', () => {
    it('should save a new document and dispatches DOCUMENT_CREATE_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/documents', {
        status: 200,
        response: { title: 'audax is awesome' }
      });

      const expectedActions = [
        { type: DOCUMENT.CREATE_SUCCESS,
          document: { title: 'audax is awesome' } }];
      const store = mockStore({ loggedIn: false, user: {} });
      done();
      return store.dispatch(DocumentActions.saveDocument({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });

    it(' should update a document dispatching DOCUMENT_UPDATE_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/documents/5', {
        status: 200,
        response: { title: 'audax is awesome' }
      });

      const expectedActions = [
        { type: DOCUMENT.UPDATE_SUCCESS,
          document: { title: 'audax is awesome' } }
      ];
      done();
      const store = mockStore({});
      return store.dispatch(DocumentActions.saveDocument({ updateId: 5 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });

  describe('Delete a Document', () => {
    it('should delete a document and dispatches DOCUMENT_DELETE_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/documents/5', {
        status: 200
      });
      const expectedActions = [
        { type: DOCUMENT.DELETE_SUCCESS }
      ];
      const store = mockStore();
      done();
      return store.dispatch(DocumentActions.deleteDocument(5))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Fetch a Document', () => {
    it('should fetche a document and dispatches GET_DOCUMENT_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/documents/3', {
        status: 200,
        response: { title: 'page 7' }
      });

      const expectedActions = [
      { type: DOCUMENT.GET_SUCCESS, document: { title: 'page 7' } }
      ];
      const store = mockStore();
      done();
      return store.dispatch(DocumentActions.fetchDocument(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Fetch a User Documents', () => {
    it("should fetche a user's documents and dispatches GET_USER_DOCS_SUCCESS", (done) => {
      moxios.stubRequest('/api/v1/users/69/documents', {
        status: 200,
        response: [{ title: 'NSDMS' }]
      });

      const expectedActions = [
        { type: USER.GET_DOCS_SUCCESS, documents: [{ title: 'NSDMS' }] }
      ];
      const store = mockStore();
      done();
      return store.dispatch(DocumentActions.fetchUserDocuments(69))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
