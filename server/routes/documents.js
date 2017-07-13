import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  // Route to fetch all documents
  app.get('/api/v1/documents', Controller.documents.fetchAllDocuments);

  // Route to create a new document
  app.post('/api/v1/documents', Authenticate.checkUser,
  Controller.documents.createDocument);

  // Route to fetch document based on user id
  app.get('/api/v1/documents/:id', Controller.documents.fetchDocument);

    // Route to update a document
  app.put('/api/v1/documents/:id', Authenticate.checkUser,
  Authenticate.allowAuthor, Controller.documents.updateDocument);

    // Route to delete a document
  app.delete('/api/v1/documents/:id', Authenticate.checkUser,
  Authenticate.allowAuthor, Controller.documents.deleteDocument);

  // Route to search for a document using title
  app.get('/api/v1/search/documents', Controller.documents.fetchAllDocuments);
};
