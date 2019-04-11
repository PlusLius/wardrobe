import React from 'react'
import Enzyme,{mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()});
import App from '../src/pages/App'


describe('UI 测试',() => {
  it('test should equlas hah',() => {
      const wrapper = mount(<App/>)
      const content = wrapper.find('.test')
      expect(content).toHaveLength(1)
      expect(content.text()).toBe('haha')
  })
})
