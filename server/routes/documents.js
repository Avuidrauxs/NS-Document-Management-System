import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  // Route to fetch all documents
  app.get('/documents', Controller.documents.fetchAllDocuments);

  // Route to search for a document using title
  app.get('search/documents', Controller.documents.fetchAllDocuments);

  // Route to create a new document
  app.post('/documents', Authenticate.checkUser,
  Controller.documents.createDocument);

// Route to fetch document based on user id
  app.get('/documents/:id', Controller.documents.fetchDocument);

  // Route to update a document
  app.put('/documents/:id', Authenticate.checkUser, Authenticate.allowAuthor,
  Controller.documents.updateDocument);

  // Route to delete a document
  app.delete('/documents/:id', Authenticate.checkUser, Authenticate.allowAuthor,
  Controller.documents.deleteDocument);
};
