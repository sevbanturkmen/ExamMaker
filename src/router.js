import React from 'react';
import {Scene,Router, Actions} from 'react-native-router-flux';
import Home from './screens/Home';
import Periods from './screens/Periods';
import Subjects from './screens/Subjects';
import QuestionKinds from './screens/QuestionKinds';
import Questions from './screens/Questions';

const RouterCompenent = () => {
    return(
        <Router>    
            <Scene key="root" hideNavBar>
                <Scene key="home"  component={Home} initial/> 
                <Scene key="periods"  component={Periods}  /> 
                <Scene key="subjects"  component={Subjects} /> 
                <Scene key="questionKinds"  component={QuestionKinds}  />
                <Scene key="questions"  component={Questions} />
            </Scene>
        </Router>
    )
}

export default RouterCompenent;