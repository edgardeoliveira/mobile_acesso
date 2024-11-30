import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { User } from "../model/user";

type Props = {
  user: User;
  onPress: (user: User) => void;
  onDelete: (id: number, user: User) => void;
};
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipeableListItem = ({ user, onPress, onDelete }: Props) => {
  const swipeableRow = useRef(null);
  const updateRef = (ref: any) => {
    swipeableRow.current = ref;
  };

  const renderRightActions = (_progress: any, dragX: any) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => onDelete(user.id || 0, user)}
      >
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderLeftActions={undefined}
      renderRightActions={renderRightActions}
    >
      <View style={[styles.border, styles.rectButtonContainer]}>
        <RectButton
          style={[styles.rectButton, { width: Dimensions.get("screen").width }]}
          onPress={() => onPress(user)}
        >
          <View style={[styles.text]}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subTitle}>{user.username}</Text>
          </View>
        </RectButton>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rectButtonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 16,
    overflow: "hidden",
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 16,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    height: 30,
  },
});

export default SwipeableListItem;
