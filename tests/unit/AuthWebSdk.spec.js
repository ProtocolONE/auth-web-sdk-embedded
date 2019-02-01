import AuthWebSdk, { getLanguage } from '@/AuthWebSdk';

const projectID = '5be2e16701d96d00012d26c3';

describe('AuthWebSdk', () => {
  // it('should require projectID to init', () => {
  //   expect(() => {
  //     // eslint-disable-next-line
  //     new AuthWebSdk();
  //   }).toThrowError(/projectID is required/);
  // });

  it('should be able to handle events', () => {
    const p1PayOne = new AuthWebSdk({
      projectID,
    });

    let check;
    p1PayOne.on('testEvent', (value) => {
      check = value;
    });
    p1PayOne.emit('testEvent', 'ok');

    expect(check).toEqual('ok');
  });

  it('should be able to handle custom apiUrl', () => {
    const customApiUrl = 'https://localhost:3333';
    const p1PayOne = new AuthWebSdk({
      projectID,
      apiUrl: customApiUrl,
    });

    expect(p1PayOne.urls.apiUrl).toEqual(customApiUrl);
  });

  describe('getLanguage', () => {
    it('should return region undefined when no value', () => {
      const value = getLanguage(null);
      expect(value).toEqual(undefined);
    });

    it('should cast value into upper case', () => {
      const value = getLanguage('EN');
      expect(value).toEqual('en');
    });

    it('should throw error if value has incorrect type', () => {
      expect(() => {
        getLanguage({});
      }).toThrowError(/Language value must be a string/);
    });

    it('should throw error if value has incorrect format', () => {
      expect(() => {
        getLanguage('omg');
      }).toThrowError(/Language value must be in 2-characters format/);
    });
  });
});
