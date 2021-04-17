import React,
{
    useState,
    useCallback,
    useEffect
} from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
    const [colorPalettes, setColorPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const fetchColorPalettes = useCallback(async () => {
        const result = await fetch('https://color-palette-api.kadikraman.now.sh/palettes');
        if (result.ok) {
            const palettes = await result.json();
            setColorPalettes(palettes);
        }
    }, []);

    useEffect(() => {
        fetchColorPalettes();
    }, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchColorPalettes();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    }, []);

    const newColorPalette = route.params ? route.params.newColorPalette : undefined;

    useEffect(() => {
        if (newColorPalette) {
            setColorPalettes(palettes => [newColorPalette, ...palettes]);
        }
    }, [newColorPalette]);

    return (
        <FlatList
            style={styles.list}
            data={colorPalettes}
            keyExtractor={palette => palette.paletteName}
            renderItem={({ item }) => (
                <PalettePreview handlePress={() => {
                    navigation.navigate('ColorPalette', item);
                }}
                    colorPalette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ColorPaletteModal')
                }}>
                    <Text style={styles.buttonText}>Add a color scheme</Text>
                </TouchableOpacity>}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'teal',
        marginBottom: 10,
    }
});

export default Home;
