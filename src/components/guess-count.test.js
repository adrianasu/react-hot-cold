import React from 'react';
import { shallow, mount } from 'enzyme';

import GuessCount from './guess-count';

describe( '<GuessCount />', () => {
    it('Renders without crashing', () => {
        shallow(<GuessCount />);
    });

    it('Renders the correct guess count', () => {
        const guessCount = 5;
        const wrapper = shallow(<GuessCount guessCount={guessCount} />);
        expect(wrapper.containsMatchingElement(<span>{guessCount}</span>)).toEqual(true);
        // or:
        // expect(wrapper.text()).toEqual(`You've made ${guessCount} guesses!`);
    })

    it('Renders a singular noun', () => {
        const guessCount = 1;
        const singularNoun = "guess";
        const wrapper = shallow(<GuessCount guessCount={guessCount} />);
        expect(wrapper.containsMatchingElement(
            <h2>You've made <span>{guessCount}</span> {singularNoun}!</h2>)).toEqual(true);
    })
})