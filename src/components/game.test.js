import React from 'react';
import { shallow } from 'enzyme';

import Game from './game';

describe('<Game />', () => {
    it('Renders without crashing', () => {
        shallow(<Game />);
    });

    it('Starts a new game', () => {
        const wrapper = shallow(<Game />);
        // simulate an existing game
        wrapper.setState({
            guesses: [1, 2, 3],
            feedback: 'Almost there',
            correctAnswer: -1
        });
        wrapper.instance().restartGame();
        expect(wrapper.state('guesses')).toEqual([]);
        expect(wrapper.state('feedback')).toEqual('Make your guess!');
        expect(wrapper.state('correctAnswer')).toBeGreaterThanOrEqual(0);
        expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);
    });

    it('Makes guesses', () => {
        const wrapper = shallow(<Game />);
        wrapper.setState({
            correctAnswer: 5
        })
        wrapper.instance().makeGuess(60);
        expect(wrapper.state('feedback')).toEqual('You\'re Ice Cold...');
        expect(wrapper.state('guesses')).toEqual([60]);

        wrapper.instance().makeGuess(35);
        expect(wrapper.state('feedback')).toEqual('You\'re Cold...');
        expect(wrapper.state('guesses')).toEqual([60, 35]);

        wrapper.instance().makeGuess(15);
        expect(wrapper.state('feedback')).toEqual('You\'re Warm.');
        expect(wrapper.state('guesses')).toEqual([60, 35, 15]);

        wrapper.instance().makeGuess(6);
        expect(wrapper.state('feedback')).toEqual('You\'re Hot!');
        expect(wrapper.state('guesses')).toEqual([60, 35, 15, 6]);

        wrapper.instance().makeGuess(5);
        expect(wrapper.state('feedback')).toEqual('You got it!');
        expect(wrapper.state('guesses')).toEqual([60, 35, 15, 6, 5])
    });

    it('Generates aural updates', () => {
        const wrapper = shallow(<Game />);
        wrapper.setState({
            correctAnswer: 5
        })
        
        wrapper.instance().makeGuess(60);
        wrapper.instance().generateAuralUpdate();
        expect(wrapper.state('auralStatus'))
            .toEqual(`Here's the status of the game right now: You're Ice Cold... You've made 1 guess. It was: 60`);

        wrapper.instance().makeGuess(35);
        wrapper.instance().generateAuralUpdate();
        expect(wrapper.state('auralStatus'))
            .toEqual(`Here's the status of the game right now: You're Cold... You've made 2 guesses. In order of most- to least-recent, they are: 35, 60`);
    });
})