import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch')

import { search , searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {

  describe('Smoke Tests', ()=>{

    // Search (Genérico) - + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', ()=>{
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', ()=>{
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', ()=>{
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', ()=>{
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', ()=>{
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', ()=>{
    let fetchedStub;
    let promise;

    beforeEach( () => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach( () => {
      fetchedStub.restore();
    });

    it('should call fetch function', ()=> {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should return the correct url to fetch ', ()=> {

      context('passing one type', () => {
        const artists = search('Slipknot', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist');

        const albums = search('Slipknot', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist');
      });

      context('passing more than one type', () => {
        const artistAndAlbums = search('Slipknot', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist,album');
      });
    }); // Correct URL

    it('should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' }); //Deeply equal = eql !== equal;
    });

  }); // Generic Search
});
