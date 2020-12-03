import React from 'react';
import {Scene,Router, Actions} from 'react-native-router-flux';
import Home from './components/Home';
import Periods from './components/Periods';
import Subjects from './components/Subjects';
import QuestionKinds from './components/QuestionKinds';
import Questions from './components/Questions';
// import PDFExample from './components/pdf';

const RouterCompenent = () => {
    return(
        <Router>    
            <Scene key="root" hideNavBar>
                <Scene key="home"  component={Home} initial/> 
                <Scene key="periods"  component={Periods}  /> 
                <Scene key="subjects"  component={Subjects} /> 
                <Scene key="questionKinds"  component={QuestionKinds}  />
                <Scene key="questions"  component={Questions} /> 
                {/* <Scene key="pdf" component={PDFExample} /> */}
            </Scene>
        </Router>
    )
}

export default RouterCompenent;