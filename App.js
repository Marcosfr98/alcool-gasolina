import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  View,
} from "react-native";

class AlcoolGasolina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      precoAlcool: "",
      precoGasolina: "",
      melhorEscolha: "Combustível",
      mostrarResultado: false,
    };
    this.validaCampos = this.validaCampos.bind(this);
    this.melhorEscolha = this.melhorEscolha.bind(this);
  }

  validaCampos() {
    if (this.state.precoAlcool === "" || this.state.precoAlcool === "") {
      Alert.alert("Mensagem de erro", "Por favor, preencha todos os campos!", [
        { text: "OK", onPress: () => "" },
        { text: "cancel", onPress: () => "" },
      ]);
    } else {
      this.melhorEscolha();
    }
  }
  melhorEscolha() {
    const alcool = parseFloat(this.state.precoAlcool);
    const gasolina = parseFloat(this.state.precoGasolina);
    const calcula = alcool / gasolina;
    if (calcula < 0.7) {
      this.setState({ melhorEscolha: "Gasolina" });
    } else if (calcula > 0.7) {
      this.setState({ melhorEscolha: "Álcool" });
    }
    this.setState({ mostrarResultado: true });
  }

  render() {
    return (
      <>
        <Modal visible={this.state.mostrarResultado} animationType="slide">
          <View style={styles.container}>
            <Image style={styles.logo} source={require("./images/logo.png")} />
            <Text
              style={{
                color: "#00ff00",
                fontSize: 22,
                textAlign: "center",
                marginBottom: 25,
                marginTop: 25,
              }}
            >
              A melhor escolha é: {this.state.melhorEscolha}
            </Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => this.setState({ mostrarResultado: false })}
            >
              <Text style={{ color: "#fff" }}>Calcular novamente</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <StatusBar backgroundColor="#fcba03" />
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset="0"
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView
              keyboardPersistTaps="awalys"
              contentContainerStyle={styles.contentContainerStyle}
            >
              <Image
                style={styles.logo}
                source={require("./images/logo.png")}
              ></Image>
              <Text style={styles.heading}>Preço do álcool (por litro)</Text>
              <TextInput
                textInputMode="decimal"
                value={this.state.precoAlcool}
                onChangeText={(text) => this.setState({ precoAlcool: text })}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Insira o preço do álcool"
              />
              <Text style={styles.heading}>Preço da gasolina (por litro)</Text>
              <TextInput
                textInputMode="decimal"
                value={this.state.precoGasolina}
                onChangeText={(text) => this.setState({ precoGasolina: text })}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Insira o preço da gasolina"
              />
              <TouchableOpacity
                style={styles.botao}
                onPress={this.validaCampos}
              >
                <Text style={{ color: "#fff" }}>Calcular</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 35,
    paddingTop: 25,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 250,
    width: 250,
  },
  heading: {
    fontSize: 22,
    color: "#fff",
    margin: 25,
  },
  input: {
    borderRadius: 15,
    width: "90%",
    height: 60,
    backgroundColor: "#fff",
    paddingLeft: 25,
    color: "#000",
    marginBottom: 25,
  },
  botao: {
    borderRadius: 15,
    backgroundColor: "#fcba03",
    height: 60,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AlcoolGasolina;
