import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REVIEW } from "../graphql/queries";
import theme from "../theme";
const style = StyleSheet.create({
  reviewContainer: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ratingContainer: {
    flexGrow: 0,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 3,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
  },

  rating: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  dateUsernameContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
  },
  date: {
    color: theme.colors.textSecondary,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: -3,
  },
  review: {
    flexGrow: 1,
    marginTop: 5,
  },
});
const Review = ({ id }) => {
  const { data } = useQuery(GET_REVIEW, { variables: { id } });
  const review = data?.repository?.reviews?.edges[0]?.node;
  console.log(review);
  if (!review) return <></>;
  return (
    <View style={style.reviewContainer}>
      <View style={style.ratingContainer}>
        <Text style={style.rating}>{review.rating}</Text>
      </View>
      <View style={style.dateUsernameContainer}>
        <Text style={style.username}>{review?.user?.username}</Text>
        <Text style={style.date}>
          {new Date(review?.createdAt).toDateString()}
        </Text>
      </View>
      <Text style={style.review}>{review?.text}</Text>
    </View>
  );
};

export default Review;
