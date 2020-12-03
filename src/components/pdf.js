
// import React from 'react';
// import { StyleSheet, Dimensions, View } from 'react-native';
 
// import Pdf from 'react-native-pdf';
 
// export default class PDFExample extends React.Component {

//     constructor(props) {
//         super(props);
//     }
//     componentDidMount(){
//         console.log(this.props.source)
//     }

//     render() {
//         const source = this.props.source
 
//         return (
//             <View style={styles.container}>
//                 <Pdf
//                     source={source}
//                     style={styles.pdf}/>
//             </View>
//         )
//   }
// }
 
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//         height:Dimensions.get('window').height,
//     }
// });