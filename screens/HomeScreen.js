import * as React from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { toggleTaskStatus, getTasks } from "../redux/app-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTaskStatus: (task) => {
      dispatch(toggleTaskStatus(task));
    },
    getTasks: () => {
      dispatch(getTasks());
    },
  };
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getTasks();
  }

  onTaskToggle = (task) => {
    this.props.toggleTaskStatus(task);
  };

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onTaskToggle(item)}>
      <View
        style={{
          backgroundColor: item.complete ? "#00f5d4" : "#ade8f4",
          padding: 20,
          marginVertical: 5,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {item.title} - {item.complete ? "done" : "not done"}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.props.tasks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
