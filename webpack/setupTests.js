import 'raf/polyfill';

const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

export default raf

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
