import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Subjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    goTo(item) {
        Actions.questionKinds({item});
    }


    componentDidMount() {
        this.setState({
            dataSource: this.props.item.subjects
        })
    }


    render() {
        const { dataSource } = this.state;
        return (
            <View style={styles.main}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sınav Hazırlama</Text>
                    <Text style={styles.headerText2}>Konular</Text>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={dataSource}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => this.goTo(item)} style={styles.card}>
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
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
    headerText2: {
        color: 'white',
        fontSize: 26,
        marginLeft: '10%',
        marginTop: '5%'
    },
    body: {
        flex: 1,
        alignItems: 'center',
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
    }
})

export default Subjects;
