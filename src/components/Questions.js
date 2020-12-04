import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RNFS, { ExternalDirectoryPath } from 'react-native-fs';
import { Actions } from 'react-native-router-flux';
import { Input } from 'react-native-elements';
import Data from '../../json/questions.json';

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      point: 0,
      isChecked: false,
      questions: '',
      isVisible: false,
      addPoint: 0
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: this.props.item.questions,
    })
  }

  showPdf() {
    var path = RNFS.ExternalCachesDirectoryPath;
    this.setState({ questions: '' })
    alert(path+' klasöründe dosya oluşturuldu.')
  }

  cleanPdf(){
    var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
    RNFS.unlink(path)
    this.setState({ questions: '' })
  }

  selectQuestion(item) {
    let data = [...this.state.dataSource];
    let { point, questions } = this.state;
    var elpoint = point;
    var elquestions = questions;
    data.map(el => {
      if (el.key == item.key) {
        el.isChecked = !el.isChecked
        if (el.isChecked == true) {
          elpoint = item.point + elpoint
          { el.answer ? elquestions = ''+elquestions +'\n\n\n' + [el.question +'\n\n'+ el.answer]  : elquestions = elquestions +'\n\n\n'+ el.question}
          this.setState({ isChecked: true })
          this.setState({ point: elpoint })
          this.setState({ questions: elquestions })
          console.log(elpoint)
          console.log(elquestions)
        } else if (el.isChecked == false) {
          elpoint = elpoint - item.point
          { item.answer ? elquestions = elquestions = elquestions.replace([item.question + item.answer], '') : elquestions = elquestions.replace(item.question, ''); }
          this.setState({ isChecked: false })
          this.setState({ point: elpoint })
          this.setState({ questions: elquestions })
          console.log(elpoint)
          console.log(elquestions)
        } return elpoint;
      } else if (el.key == item.key) {

      }
      return el;
    });
  }

  addQuestions() {
    console.log(RNFS.ExternalCachesDirectoryPath)
    var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
    console.log(path)
    RNFS.appendFile(path, this.state.questions)
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
    var file = RNFS.readFile(path, 'utf8')
    console.log(file)
    console.log(this.state.questions);
  }

  addRandomQuestions() {
    var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
    let data = [...this.state.dataSource];
    const { addPoint, isVisible, point, questions } = this.state;
    var elpoint = point;
    var elquestions = questions;
    this.setState({
      isVisible: !isVisible
    })
    if (addPoint > 0) {

      while (elpoint < addPoint) {

        data.map(el => {
          if (Math.floor(Math.random() * 10) == el.key) {
            console.log(addPoint)
            console.log(elpoint)
            console.log(el.key)
            elpoint = el.point + elpoint
            { el.answer ? elquestions = ''+elquestions +'\n\n\n' + [el.question +'\n\n'+ el.answer]  : elquestions = elquestions +'\n\n\n'+ el.question}
            this.setState({ isChecked: true })
            this.setState({ point: elpoint })
            this.setState({ questions: elquestions })
            RNFS.appendFile(path, this.state.questions)
              .then((success) => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log(err.message);
              });
            console.log(elpoint)
            console.log(elquestions)
          } else { }
        });
      }
      alert(addPoint + ' puanlık soru seçildi.Seçtiklerimi ekle tıklayarak ekleyebilirsiniz. ')
    }
  }

  render() {
    const { dataSource, point, addPoint } = this.state;

    return (
      <ScrollView style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sınav Hazırlama</Text>
          <Text style={styles.headerText}>Sorular</Text>
        </View>
        <View style={styles.body}>
          <Text style={{ alignSelf: 'flex-end', paddingRight: 10 }}>Puanlar</Text>
          <FlatList
            data={dataSource}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    onValueChange={() => this.selectQuestion(item)}
                    disabled={false}
                    value={item.isChecked} />
                  <View style={styles.card}>
                    <Text style={styles.cardText}>{item.question}</Text>
                    {item.answer ? <Text style={styles.cardText2}>{item.answer}</Text> : null}
                  </View>
                  <View style={styles.pointView}><Text style={styles.pointText}>{item.point}</Text></View>
                </View>
              )
            }}
          />
          <View style={styles.selectButtonsView}>
            {this.state.isVisible == true ? <View style={styles.field1}>
              <Input
                keyboardType="numeric"
                value={addPoint}
                onChangeText={(addPoint) => this.setState({ addPoint })}
                inputContainerStyle={styles.fieldContainerStyle}
                inputStyle={{ fontSize: 15 }}
                containerStyle={styles.containerStyle}
                underlineColorAndroid="transparent"
                placeholder="Kaç Puan?"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => this.addRandomQuestions()} style={styles.selectButton2}><Text style={styles.selectButtonText}>Rastgele Seç</Text></TouchableOpacity>
            </View> : <TouchableOpacity onPress={() => this.addRandomQuestions()} style={styles.selectButton}><Text style={styles.selectButtonText}>Rastgele Seç</Text></TouchableOpacity>}
            <TouchableOpacity onPress={() => this.addQuestions()} style={styles.selectButton}><Text style={styles.selectButtonText}>Seçtiklerimi Ekle</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.showPdf()} style={styles.selectButton}><Text style={styles.selectButtonText}>Pdf göster</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.cleanPdf()} style={styles.selectButton}><Text style={styles.selectButtonText}>Temizle</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    width: '80%',
    height: 100,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15
  },
  cardText: {
    marginTop: '5%',
    color: 'white',
    fontSize: 20
  },
  cardText2: {
    marginTop: '5%',
    color: 'white',
    fontSize: 20,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 0,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  selectButtonsView: {
    marginTop: '20%',
    flexDirection: 'row',
    marginBottom: '10%'
  },
  selectButton: {
    width: 80,
    height: 50,
    backgroundColor: 'red',
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  selectButton2: {
    width: 80,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 60
  },
  selectButtonText: {
    color: 'white',
    textAlign: 'center'
  },
  pointView: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  pointText: {
    fontWeight: '600'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  field1: {
    width: 80,
    height: 55,
    marginBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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

export default Questions;
