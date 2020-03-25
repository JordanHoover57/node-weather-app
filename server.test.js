const weatherSwitcher = require('./server');

test('Returns an image based on weather status',() => {
    expect(getStatusImg()).toBe('imgurl1');
});