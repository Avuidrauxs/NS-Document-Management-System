import expect from 'expect';
import { DOCUMENT, USER } from '../../constants/Constants';
import { DocumentReducer, Document } from '../../reducers/DocumentReducer';

describe('Documents Reducer', () => {
  it('should set documents when passed GET_ALL_DOCS_SUCCESS', () => {
      // arrange
    const initialState = [];
    const fetchedDocuments = [
        { id: '1', title: 'Alpha' },
        { id: '2', title: 'Beta' },
        { id: '3', title: 'Theta' }
    ];
    const action = { type: DOCUMENT.GET_ALL_SUCCESS, documents: fetchedDocuments };

      // act
    const newState = DocumentReducer(initialState, action);

    expect(newState).toEqual(fetchedDocuments);
  });
  it('should add document when passed DOCUMENT_CREATE_SUCCESS', () => {
    // arrange
    const initialState = [
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
    const newState = DocumentReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
  it('should update document when passed DOCUMENT_UPDATE_SUCCESS', () => {
    // arrange
    const initialState = [
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
    const newState = DocumentReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
  it('should set search result when passed DOCUMENT_SEARCH_SUCCESS', () => {
    // arrange
    const initialState = [];
    const documents = [
      { id: '1', title: 'Alpha' },
      { id: '2', title: 'Beta' },
      { id: '3', title: 'Theta' }
    ];
    const action = { type: DOCUMENT.SEARCH_SUCCESS, documents };

    // act
    const newState = DocumentReducer(initialState, action);

    expect(newState).toEqual(documents);
  });
  it('should set user documents when passed GET_USER_DOCS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const userDocuments = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = { type: USER.GET_DOCS_SUCCESS, documents: userDocuments };

    // act
    const newState = DocumentReducer(initialState, action);

    expect(newState).toEqual(userDocuments);
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
    const initialState = {};
    const loadedDocument = { title: 'Fallopian Tube' };
    const action = { type: DOCUMENT.GET_SUCCESS, document: loadedDocument };

    // act
    const newState = Document(initialState, action);

    // assert
    expect(newState).toEqual(loadedDocument);
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
