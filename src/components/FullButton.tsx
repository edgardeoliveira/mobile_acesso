import { Button, ButtonProps, Dimensions, StyleSheet, View } from 'react-native'

export default function FullButton(props: ButtonProps) {
    return (
        <View style={styles.buttonView}>
            <Button {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        marginTop: 20,
        width: Dimensions.get('screen').width - 160
    },
})