const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev });

const handle = app.getRequestHandler();

const renderPage = (req, res) => {
  const query = {
    ...req.query,
    ...req.params
  };
  return app.render(req, res, req.path, query);
};

const renderPageProject = (req, res) => {
  let query = {};
  let path = null;
  if (isNaN(req.params.id)) {
    query = {
      ...req.query,
      cid: req.params.id
    };
    path = '/projects/[cid]';
  } else {
    query = {
      ...req.query,
      ...req.params
    };
    path = '/projects/[cid]/[id]';
  }
  return app.render(req, res, path, query);
};


app.prepare()
  .then(() => {
    const server = express();
    server.disable('x-powered-by');

    server.get('/', renderPage);

    // server.get('/projects/:cid', renderPageProject);

    // server.get('/projects/:cid/:id', renderPageProject);

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
