import { StyleSheet, TextInput, Text, View, Dimensions, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
    label: string,
}

export default function MyInput(props: Props) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}:</Text>
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        marginBottom: 30,
    },

    label: {
        fontSize: 18,
        marginBottom: 5,
    },

    input: {
        height: 50,
        padding: 10,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 4,
        width: Dimensions.get('screen').width - 100
    },
})