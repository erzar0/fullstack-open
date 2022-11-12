import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Linking } from "react-native";
import { useParams } from "react-router-native";
import Review from "./Review";
import theme from "../theme";

const style = StyleSheet.create({
  repoContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
  },
  headerContainer: {
    flexDirection: "row",
    flexGrow: 1,
    paddingBottom: 10,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
    alignSelf: "center",
  },
  infoContainer: {
    flexGrow: 1,
    alignItems: "flex-start",
    maxWidth: "80%",
    columnGap: 50,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  programmingLanguage: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 4,
    borderRadius: 5,
  },
  fullName: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 3,
    fontSize: theme.fontSizes.subheading,
  },
  description: {
    color: theme.colors.textSecondary,
    fontStyle: "italic",
    paddingBottom: 5,
  },
  repoLinkContainer: {
    backgroundColor: theme.colors.primary,
    padding: 9,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  repoLink: {
    color: "white",
    font: theme.fonts.android,
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ repo }) => {
  const { id } = useParams();
  console.log(id);
  if (id && id !== repo.id) {
    return <></>;
  }

  return (
    <>
      <View testID="repositoryItem" style={style.repoContainer}>
        <View style={style.headerContainer}>
          <View style={style.avatarContainer}>
            <Image style={style.avatar} source={{ uri: repo.ownerAvatarUrl }} />
          </View>
          <View style={style.infoContainer}>
            <Text style={style.fullName}>{repo.fullName}</Text>
            <Text style={style.description}>{repo.description}</Text>
            <Text style={style.programmingLanguage}>{repo.language}</Text>
          </View>
        </View>
        <View style={style.statsContainer}>
          <Stat name={"Stars"} value={repo.stargazersCount}></Stat>
          <Stat name={"Forks"} value={repo.forksCount}></Stat>
          <Stat name={"Rating"} value={repo.ratingAverage}></Stat>
          <Stat name={"Reviews"} value={repo.reviewCount}></Stat>
        </View>
        {id && id === repo.id ? (
          <Pressable
            style={style.repoLinkContainer}
            onPress={() => Linking.openURL(repo.url)}
          >
            <Text style={style.repoLink}>Open in github</Text>
          </Pressable>
        ) : (
          <></>
        )}
      </View>
      {id && id === repo.id ? <Review id={repo.id}></Review> : <></>}
    </>
  );
};

function Stat({ name, value }) {
  const style = StyleSheet.create({
    value: { color: theme.colors.textPrimary, fontWeight: "900" },
    valueNameContainer: {
      color: theme.colors.textSecondary,
      display: "flex",
      alignItems: "center",
    },
    name: {
      fontSize: theme.fontSizes.subheading,
    },
  });
  const valueToShow = roundValue(value);
  return (
    <View style={style.valueNameContainer}>
      <Text style={style.value}>{valueToShow}</Text>
      <Text style={style.name}>{name}</Text>
    </View>
  );
}
export function roundValue(value) {
  return value < 1000 ? value : String((value / 1000).toFixed(1)) + "k";
}
export default RepositoryItem;
