import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import '../globals.css';
import { Link, useRouter } from 'expo-router';
import { images } from '../../constants/images';
import { icons } from '../../constants/icons';
import SearchBar from '../../components/SearchBar';
import { fetchMovies } from '../../services/api';
import useFetch from '../../services/useFetch';
import MovieCard from '../../components/MovieCard';
import { SafeAreaView } from 'react-native-safe-area-context';

function MoviesView({ movies, onSearch }: any) {
  return (
    <View className="flex-1 mt-5">
      <SearchBar onPress={onSearch} placeholder="Search..." />
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 pb-32"
        scrollEnabled={false}
        data={movies}
        renderItem={({ item }) => <MovieCard {...item}></MovieCard>}
      />
    </View>
  );
}

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  const goToSearch = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView className="flex-1  bg-primary">
      <StatusBar backgroundColor="#030014" translucent={false} />
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <MoviesView movies={movies} onSearch={goToSearch} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
