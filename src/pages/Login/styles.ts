import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, 
        borderRadius: 15, 
        padding: 20, 
        margin: 10, 
    },
});
