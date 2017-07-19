import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DOCUMENT, USER } from '../../constants/Constants';
import * as DocumentActions from '../../actions/DocumentActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const limit = 9;
const offset = 0;
const doc = {
  id: 1,
  title: 'Im here',
  body: 'Am a banana'
};
const query = 'Front';
describe('Document Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Fetch Documents', () => {
    it('should fetch documents and dispatches GET_ALL_DOCS_SUCCESS', (done) => {
      moxios.stubRequest(`/api/v1/documents?limit=${limit}&offset=${offset}`, {
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
        offset,
        query: '' }];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.fetchDocuments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should not fetch documents and dispatches GET_ALL_DOCS_FAILURE',
    (done) => {
      moxios.stubRequest(`/api/v1/documents?limit=${limit}&offset=${offset}`, {
        status: 400,
        response: {}
      });
      const expectedActions = [{
        type: DOCUMENT.GET_ALL_FAILURE,
        error: { message: '[object Object]' } }];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.fetchDocuments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Document', () => {
    it('should search for documents and dispatches GET_ALL_DOCS_SUCCESS',
    (done) => {
      moxios
      .stubRequest(
        `/api/v1/search/documents?q=${query}&limit=${limit}&offset=${offset}`, {
          status: 200,
          response: {
            rows: [{ title: 'Front' }],
            metaData: {}
          }
        });
      const expectedActions = [{
        type: DOCUMENT.SEARCH_SUCCESS,
        searchResult: [{ title: 'frontend' }],
        metaData: {},
        offset,
        query }];
      const store = mockStore();
      done();
      return store
      .dispatch(DocumentActions.searchDocuments(query, offset, limit))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should not search for documents and dispatches GET_ALL_DOCS_FAILURE',
    (done) => {
      moxios
      .stubRequest(
        `/api/v1/search/documents?q=${query}&limit=${limit}&offset=${offset}`, {
          status: 400,
          response: {}
        });
      const expectedActions = [{
        type: DOCUMENT.SEARCH_FAILURE,
        error: { message: '[object Object]' } }];
      const store = mockStore({});
      done();
      return store
      .dispatch(DocumentActions.searchDocuments(query, offset, limit))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });


  describe('Save new Document', () => {
    it('should save a new document and dispatches DOCUMENT_CREATE_SUCCESS',
    (done) => {
      moxios.stubRequest('/api/v1/documents', {
        status: 200,
        response: { title: 'audax is awesome' }
      });

      const expectedActions = [
        { type: DOCUMENT.CREATE_SUCCESS,
          document: { title: 'audax is awesome' } }];
      const store = mockStore({ loggedIn: true, user: {} });
      done();
      return store.dispatch(DocumentActions.saveDocument({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
    it('should not save a new document and dispatches DOCUMENT_CREATE_FAILURE',
    (done) => {
      moxios.stubRequest('/api/v1/documents', {
        status: 400,
        response: {}
      });

      const expectedActions = [
        { type: DOCUMENT.CREATE_FAILURE,
          error: { message: '[object Object]' } }];
      const store = mockStore({ loggedIn: true, user: {} });
      done();
      return store.dispatch(DocumentActions.saveDocument({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });

    it(' should update a document dispatching DOCUMENT_UPDATE_SUCCESS',
    (done) => {
      moxios.stubRequest(`/api/v1/documents/${doc.id}`, {
        status: 200,
        response: { title: 'audax is awesome' }
      });

      const expectedActions = [
        { type: DOCUMENT.UPDATE_SUCCESS,
          document: { title: 'audax is awesome' } }
      ];
      done();
      const store = mockStore({});
      return store.dispatch(DocumentActions.saveDocument(doc))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
    it(' should not update a document dispatching DOCUMENT_UPDATE_FAILURE',
    (done) => {
      moxios.stubRequest(`/api/v1/documents/${doc.id}`, {
        status: 400,
        response: {}
      });

      const expectedActions = [
        { type: DOCUMENT.UPDATE_FAILURE,
          error: { message: '[object Object]' } }];
      done();
      const store = mockStore({});
      return store.dispatch(DocumentActions.saveDocument(doc))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });

  describe('Delete a Document', () => {
    it('should delete a document and dispatches DOCUMENT_DELETE_SUCCESS',
    (done) => {
      moxios.stubRequest(`/api/v1/documents/${doc.id}`, {
        status: 200
      });
      const expectedActions = [
        { type: DOCUMENT.DELETE_SUCCESS, document: doc }
      ];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.deleteDocument(doc))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should not delete a document and dispatches DOCUMENT_DELETE_FAILURE',
    (done) => {
      moxios.stubRequest(`/api/v1/documents/${doc.id}`, {
        status: 400
      });
      const expectedActions = [
        { type: DOCUMENT.DELETE_FAILURE,
          error: { message: '[object Object]' } }];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.deleteDocument(doc))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Fetch a Document', () => {
    it('should fetche a document and dispatches GET_DOCUMENT_SUCCESS',
    (done) => {
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
    it('should not fetch a document and dispatches GET_DOCUMENT_FAILURE',
    (done) => {
      moxios.stubRequest('/api/v1/documents/3', {
        status: 400,
        response: {}
      });

      const expectedActions = [
        { type: DOCUMENT.GET_FAILURE,
          error: { message: '[object Object]' } }];

      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.fetchDocument(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Fetch a User Documents', () => {
    it("should fetch a user's documents and dispatches GET_USER_DOCS_SUCCESS",
    (done) => {
      moxios.stubRequest('/api/v1/users/69/documents', {
        status: 200,
        response: [{ title: 'NSDMS' }]
      });

      const expectedActions = [
        { type: USER.GET_DOCS_SUCCESS, documents: [{ title: 'NSDMS' }] }
      ];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.fetchUserDocuments(69))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it(`should not fetch a user's documents and dispatches
    GET_USER_DOCS_FAILURE`, (done) => {
      moxios.stubRequest('/api/v1/users/69/documents', {
        status: 400,
        response: {}
      });

      const expectedActions = [
        { type: USER.GET_DOCS_FAILURE,
          error: { message: '[object Object]' } }];
      const store = mockStore({});
      done();
      return store.dispatch(DocumentActions.fetchUserDocuments(69))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
