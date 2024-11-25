import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Addpost from "../screens/Addpost";
import Filter from "../screens/Filter"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (


        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="black" />, headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" />, headerShown: false }} />
            <Tab.Screen name='Addpost' component={Addpost} options={{ headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }} />
            <Tab.Screen name="Filter" component={Filter} options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />, headerShown: false,}}/>

        </Tab.Navigator>


    )
}

export default HomeMenu;