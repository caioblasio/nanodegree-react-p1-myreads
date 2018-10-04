import Enzyme, { shallow, render, mount, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing

/* Set up mock for localStorage so that our tests will run */

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};

global.localStorage = localStorageMock;
global.fetch = require('jest-fetch-mock');


global.shallow = shallow;
global.wrapper = wrapper;
global.render = render;
global.mount = mount;
global.fetch = require('jest-fetch-mock');