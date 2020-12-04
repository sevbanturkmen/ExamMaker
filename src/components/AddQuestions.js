import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input } from 'react-native-elements';
import firebase from 'firebase';

class AddQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            lesson: '',
            period:'',
            subject:'',
            kind:'',
            question:'',
            answers:'',
            point:0
        }
    }

    componentDidMount() {
       
    }

    addLesson(){
        let { lesson,point} = this.state;
        firebase.database().ref('/lessons')
        .push({lesson,point})
    }

    saveQuestion(){
        let { lesson, period, subject, kind, question, answers, point } = this.state;
        console.log(lesson,period,subject,kind,question,answers,point)
        this.addLesson()
    }

    render() {
        let { dataSource, lesson, period, subject, kind, question, answers, point } = this.state;
        const items = { 
            label: 'Klasik', value: 1
        }

        return (<View style={styles.main}>
            <View style={styles.header}><Text style={styles.headerText}>Sınav Hazırlama</Text></View>
            <ScrollView style={styles.body}>

                <View style={styles.field1}>
                    <Input
                        value={lesson}
                        onChangeText={(lesson) => this.setState({ lesson })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Ders"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.field1}>
                    <Input
                        value={period}
                        onChangeText={(period) => this.setState({ period })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Dönem"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.field1}>
                    <Input
                        value={subject}
                        onChangeText={(subject) => this.setState({ subject })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Konu"
                        autoCapitalize="none"
                    />
                </View>
                
                <View style={styles.field1}>
                    <Input
                        value={kind}
                        onChangeText={(kind) => this.setState({ kind })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Tür( Klasik, Test, Boşluk Doldurma )"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field1}>
                    <Input
                        value={question}
                        onChangeText={(question) => this.setState({ question })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Soru"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field1}>
                    <Input
                        value={answers}
                        onChangeText={(answers) => this.setState({ answers })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Test ise Şıklar"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field1}>
                    <Input
                        value={point}
                        onChangeText={(point) => this.setState({ point })}
                        inputContainerStyle={styles.fieldContainerStyle}
                        inputStyle={{ fontSize: 15 }}
                        containerStyle={styles.containerStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Puan"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity onPress={()=> this.saveQuestion()} style={styles.field2}>
                    <Text style={{color:'white'}}>Soruyu Kaydet</Text>
                </TouchableOpacity>

            </ScrollView>
        </View >

        )
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        backgroundColor: 'blue',
        width: '100%',
        height: 150,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        marginLeft: '10%',
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
        marginTop: '10%'
    },
    card: {
        backgroundColor: 'gray',
        width: 250,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 15
    },
    cardText: {
        color: 'white',
        fontSize: 20
    },
    field1: {
        width: '80%',
        height: 55,
        marginBottom: '5%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    field2: {
        width: '80%',
        height: 55,
        marginBottom: '5%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor:'blue',
        justifyContent:'center',
        borderRadius: 100,
    },
    fieldContainerStyle: {
        borderBottomWidth: 0,
    },
    containerStyle: {
        height: '100%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default AddQuestions;
