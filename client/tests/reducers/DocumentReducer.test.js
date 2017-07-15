import expect from 'expect';
import { DOCUMENT, USER } from '../../constants/Constants';
import { DocumentReducer, Document } from '../../reducers/DocumentReducer';
import initialState from '../../utilities/initialState';

describe('Documents Reducer', () => {
  it('should set documents when passed GET_ALL_DOCS_SUCCESS', () => {
      // arrange
    const fetchedDocuments = [
        { id: '1', title: 'Alpha' },
        { id: '2', title: 'Beta' },
        { id: '3', title: 'Theta' }
    ];
    const action = {
      type: DOCUMENT.GET_ALL_SUCCESS,
      documents: fetchedDocuments };

      // act
    const newState = DocumentReducer(initialState.documents, action);

    expect(newState).toEqual(fetchedDocuments);
  });
  it('should add document when passed DOCUMENT_CREATE_SUCCESS', () => {
    // arrange
    const state = [
      { title: 'Alpha' },
      { title: 'Beta' }
    ];
    const newDocument = { title: 'Theta' };
    const action = { type: DOCUMENT.CREATE_SUCCESS, document: newDocument };

    const expectedState = [
      { title: 'Theta' },
      { title: 'Alpha' },
      { title: 'Beta' }
    ];

    // act
    const newState = DocumentReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
  it('should add document when passed DOCUMENT_CREATE_FAILURE', () => {
    // arrange
    const state = [
      { title: 'Alpha' },
      { title: 'Beta' }
    ];
    const newDocument = { title: 'Theta' };
    const action = { type: DOCUMENT.CREATE_FAILURE, error: { message: 'Error: ' } };

    const expectedState = { message: 'Error: ' };

    // act
    const newState = DocumentReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
  it('should update document when passed DOCUMENT_UPDATE_SUCCESS', () => {
    // arrange
    const state = [
      { id: '1', title: 'Alpha' },
      { id: '2', title: 'Beta' },
      { id: '3', title: 'Theta' }
    ];
    const document = { id: '2', title: 'New Title' };
    const action = { type: DOCUMENT.UPDATE_SUCCESS, document };

    const expectedState = [
      { id: '2', title: 'New Title' },
      { id: '1', title: 'Alpha' },
      { id: '3', title: 'Theta' }
    ];

    // act
    const newState = DocumentReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
  it('should update document when passed DOCUMENT_DELETE_SUCCESS', () => {
    // arrange
    const state = [
      { id: '1', title: 'Alpha' },
      { id: '2', title: 'Beta' },
      { id: '3', title: 'Theta' }
    ];
    const document = { id: '2', title: 'Beta' };
    const action = { type: DOCUMENT.DELETE_SUCCESS, document };

    const expectedState = [
      { id: '1', title: 'Alpha' },
      { id: '3', title: 'Theta' }
    ];

    // act
    const newState = DocumentReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
  it('should set search result when passed DOCUMENT_SEARCH_SUCCESS', () => {
    // arrange

    const documents = [
      { id: '1', title: 'Alpha' },
      { id: '2', title: 'Beta' },
      { id: '3', title: 'Theta' }
    ];
    const action = { type: DOCUMENT.SEARCH_SUCCESS, documents };

    // act
    const newState = DocumentReducer(initialState.documents, action);

    expect(newState).toEqual(documents);
  });
  it('should set user documents when passed GET_USER_DOCS_SUCCESS', () => {
    // arrange

    const userDocuments = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = { type: USER.GET_DOCS_SUCCESS, documents: userDocuments };

    // act
    const newState = DocumentReducer(initialState.documents, action);

    expect(newState).toEqual(userDocuments);
  });
  it('should not set user documents when passed GET_USER_DOCS_FAILURE', () => {
    // arrange

    const error = { message: 'Error: ' };
    const action = { type: USER.GET_DOCS_FAILURE, error: { message: 'Error: ' } };

    // act
    const newState = DocumentReducer(initialState.documents, action);

    expect(newState).toEqual(error);
  });
  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      state: true,
    };
    const action = { type: 'DOCUMENT_NOT_FOUND' };

    // act
    const newState = DocumentReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});

describe('Document Reducer', () => {
  it('should set document when passed GET_DOCUMENT_SUCCESS', () => {
    // arrange
    const loadedDocument = { title: 'Fallopian Tube' };
    const action = { type: DOCUMENT.GET_SUCCESS, document: loadedDocument };

    // act
    const newState = Document(initialState.document, action);

    // assert
    expect(newState).toEqual(loadedDocument);
  });
  it('should update document when passed DOCUMENT_GET_FAILURE', () => {
    // arrange
    const action = { type: DOCUMENT.GET_FAILURE, error: { message: 'Error: ' } };

    const expectedState = { message: 'Error: ' };

    // act
    const newState = DocumentReducer(initialState.document, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      iAmInitialState: true,
    };
    const action = { type: 'NO_DOCUMENT' };

    // act
    const newState = Document(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
