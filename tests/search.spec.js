import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch')

import { search , searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach( () => {
    fetchedStub.restore();
  });


  describe('Smoke Tests', ()=>{

    // Search (Genérico) - + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', ()=>{
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', ()=>{
      expect(searchAlbums).to.exist;
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
      promise.resolves({body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({body: 'json' }); //Deeply equal = eql !== equal;
    });
  });


  describe('searchArtists', () => {
    it('should call the fetch function', () => {
      const artists = searchArtists('Slipknot');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Slipknot');
      expect(fetchedStub).to.been
        .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist');

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call the fetch function', () => {
      const albums = searchAlbums('Slipknot');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should to call fetch with the correct URL', () => {
      const albums = searchAlbums('Slipknot');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call the fetch function', () => {
      const tracks = searchTracks('Slipknot');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should to call fetch with the correct URL', () => {
      const tracks = searchTracks('Slipknot');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=tracks');
    });
  });

  describe('searchPlaylists', () => {
    it('should call the fetch function', () => {
      const playlists = searchPlaylists('Slipknot');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should to call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Slipknot');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=playlist');
    });
  });

});
