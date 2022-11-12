import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate, useParams } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => {
  const { id } = useParams();
  return <View style={id ? <></> : styles.separator} />;
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const renderRepo = (repo) => {
    return (
      <Pressable onPress={() => navigate("/" + repo.item.id)}>
        <RepositoryItem repo={repo.item} />
      </Pressable>
    );
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderRepo}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
