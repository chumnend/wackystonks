import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('/status', function () {
  it('expects to hit health check', function (done) {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
