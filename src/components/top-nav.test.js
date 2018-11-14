import React from 'react';
import {shallow, mount} from 'enzyme';

import TopNav from './top-nav';

describe('<TopNav />', () => {
    it('Renders without crashing', () => {
        shallow(<TopNav />);
    });

    it('Renders New Game when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<TopNav onRestartGame={callback} />);
        wrapper.find('.new').simulate('click', {
             preventDefault() {} 
        });
        expect(callback).toHaveBeenCalled();
    });

    it('Renders Aural Update when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<TopNav onGenerateAuralUpdate={callback} />);
        wrapper.find('.status-link').simulate('click', { 
            preventDefault() {} 
        });
        expect(callback).toHaveBeenCalled();
    });
})