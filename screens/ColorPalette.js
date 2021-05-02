import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
    const { colors } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                // ItemSeparatorComponent={({ highlighted }) => (
                //     <Text>----------</Text>
                //     // <View style={[styles.item, highlighted && { marginLeft: 0 }]} />
                // )}
                style={styles.colorList}
                data={colors}
                keyExtractor={item => item.colorName}
                renderItem={({ item }) => (
                    <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
                )}
            // ListHeaderComponent={<Text style={styles.heading}>{paletteName}</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    colorList: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

export default ColorPalette;
