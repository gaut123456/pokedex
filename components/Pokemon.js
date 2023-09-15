import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import FlipCard from 'react-native-flip-card'

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setPokemonData(data);
      });
  }, []);

  const combineGradients = (types) => {
    const gradients = types.map((type) => {
      switch (type.name) {
        case "Poison":
          return ["#A600FF", "#00FFA6"];
        case "Plante":
          return ["#00FF00", "#007F00"];
        case "Feu":
            return ["#FF0000", "#7F0000"];
        case "Eau":
            return ["#0000FF", "#00007F"];
        case "Insecte":
            return ["#FFFF00", "#7F7F00"];
        case "Normal":
            return ["#7F7F7F", "#000000"];
        case "Vol":
            return ["#00FFFF", "#007F7F"];
        case "Electrik":
            return ["#FFFF00", "#7F7F00"];
        case "Combat":
            return ["#FF0000", "#7F0000"];
        case "Sol":
            return ["#7F3F00", "#000000"];
        case "Roche":
            return ["#7F3F00", "#000000"];
        case "Spectre":
            return ["#7F3F00", "#000000"];
        case "Dragon":
            return ["#7F3F00", "#000000"];
        case "Psy":
            return ["#7F3F00", "#000000"];
        case "Acier":
            return ["#7F3F00", "#000000"];
        case "Glace":
            return ["#7F3F00", "#000000"];
        case "Ténèbres":
            return ["#7F3F00", "#000000"];
        case "Fée":
            return ["#7F3F00", "#000000"];
        default:
          return ["#7F3F00", "#000000"]; 
      }
    });

    const combinedGradient = gradients.reduce((baseGradient, currentGradient) => {
      return [
        baseGradient[0],
        currentGradient[1],
      ];
    }, gradients[0]);

    return combinedGradient;
  };

  const handleSearch = () => {
    const filteredData = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemonData(filteredData);
  };

  const isSearching = filteredPokemonData.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Liste des Pokémons</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un Pokémon par nom"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>

      {Loading && <Text>Chargement...</Text>}

      {isSearching ? (
        filteredPokemonData.map((data, i) => {
          const gradientColors = combineGradients(data.apiTypes);
          return (
            <View key={i} style={styles.cardContainer}>
              <FlipCard>
                {/* Face avant de la carte */}
                <View style={[styles.card, { backgroundColor: gradientColors[0] }]}>
                  <Image source={{ uri: data.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{data.name}</Text>
                  <View style={styles.typeContainer}>
                    {data.apiTypes.map((type, i) => (
                      <Image key={i} source={{ uri: type.image }} style={styles.typeIcon} />
                    ))}
                  </View>
                </View>

                {/* Face arrière de la carte */}
                <View style={[styles.card, { backgroundColor: gradientColors[0] }]}>
                  <Image source={{ uri: data.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{data.name}</Text>
                  <Text style={styles.pokemonStat}>HP: {data.stats.HP}</Text>
                  <Text style={styles.pokemonStat}>Attaque: {data.stats.attack}</Text>
                  <Text style={styles.pokemonStat}>Défense: {data.stats.defense}</Text>

                  {/* Ajoutez d'autres statistiques ici */}
                  <Text style={styles.pokemonSubtitle}>Types:</Text>
                  <View style={styles.typeContainer}>
                    {data.apiTypes.map((type, i) => (
                      <Image key={i} source={{ uri: type.image }} style={styles.typeIcon} />
                    ))}
                  </View>
                </View>
              </FlipCard>
            </View>
          );
        })
      ) : (
        pokemonData.map((data, i) => {
          const gradientColors = combineGradients(data.apiTypes);
          return (
            <View key={i} style={styles.cardContainer}>
              <FlipCard>
                {/* Face avant de la carte */}
                <View style={[styles.card, { backgroundColor: gradientColors[0] }]}>
                  <Image source={{ uri: data.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{data.name}</Text>
                  <View style={styles.typeContainer}>
                    {data.apiTypes.map((type, i) => (
                      <Image key={i} source={{ uri: type.image }} style={styles.typeIcon} />
                    ))}
                  </View>
                </View>

                {/* Face arrière de la carte */}
                <View style={[styles.card, { backgroundColor: gradientColors[0] }]}>
                  <Image source={{ uri: data.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{data.name}</Text>
                  <Text style={styles.pokemonStat}>HP: {data.stats.HP}</Text>
                  <Text style={styles.pokemonStat}>Attaque: {data.stats.attack}</Text>
                  <Text style={styles.pokemonStat}>Défense: {data.stats.defense}</Text>
                  <Text style={styles.pokemonStat}>Vitesse: {data.stats.speed}</Text>
                  {/* Ajoutez d'autres statistiques ici */}
                  <Text style={styles.pokemonSubtitle}>Types:</Text>
                  <View style={styles.typeContainer}>
                    {data.apiTypes.map((type, i) => (
                      <Image key={i} source={{ uri: type.image }} style={styles.typeIcon} />
                    ))}
                  </View>
                </View>
              </FlipCard>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 28,
    justifyContent: 'center', 
  },
  cardContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  typeIcon: {
    width: 24,
    height: 24,
    margin: 4,
  },
  pokemonStat: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  pokemonSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Pokemon;
