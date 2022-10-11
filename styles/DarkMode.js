import React from "react";
import { StyleSheet } from "react-native";

const darkMode= StyleSheet.create({
    ExploreScreen_FlatList_Container: {
        backgroundColor: '#0d1015',
        paddingBottom: 200,
      },
      ExploreScreen_FlatList_Title_Text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
        marginVertical: 20,
      },
      ExploreScreen_FlatList_Selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        shadowColor: '#000',
        elevation: 4,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#161b21',
        width: '40%',
        borderWidth:.5,
        borderColor:'#808080',
      },
      ExploreScreen_FlatList_Selector_Text: {
        fontWeight: '700', 
        color: '#fff'
      },
    
      
      RepositoriesScreen_FlatList_Container: {
        backgroundColor: '#0d1015',
        paddingBottom: 200,
      },
      RepositoriesScreen_FlatList_Title_Text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
        marginVertical: 20,
      },
      RepositoriesScreen_FlatList_Selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        shadowColor: '#000',
        elevation: 4,
        padding: 10,
        backgroundColor: '#161b21',
        width: '48%',
        borderWidth:.5,
        borderColor:'#808080',
      },
      RepositoriesScreen_FlatList_Selector_Text: {
        fontWeight: '700',
        color: '#fff',
      },
    
      
      ExploreCard: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        backgroundColor: '#161b21',
        alignItems: 'center',
        shadowColor: '#000',
        borderWidth:.5,
        borderColor:'#808080',
        elevation: 3,
      },
      ExploreCard_Info_Header_Star_Text: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 3
      },
    
      ExploreCard_Info_Header_StarNumber: {
        backgroundColor: '#243c3c',
        color: '#85d8c1',
        fontWeight: '600',
        marginLeft: 10,
        padding: 5,
        fontSize: 13,
        borderRadius: 5,
      },
      ExploreCard_Info_Title_Text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        flexShrink: 1,
        marginLeft: 10
      },
    
      ExploreCard_Info_Description: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '400'
      },
    
      ExploreCard_Info_Bottom_Text: {
        marginRight: 15,
        fontSize: 13,
        color: '#fff'
      },
    
      ReposCard: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        backgroundColor: '#161b21',
        alignItems: 'center',
        borderWidth:.5,
        borderColor:'#808080',
        shadowColor: '#000',
        elevation: 3,
      },
      ReposCard_Info_Title_Text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        flexShrink: 1,
        marginLeft: 10,
      },
    
      ReposCard_Info_Description: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '400',
      },
      ReposCard_Info_Bottom_Text: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        color: '#fff',
      },
    
      ReposCard_Info_Bottom_TextIcon: {
        fontSize: 13,
        color: '#fff',
        marginLeft: 3,
      },
    
      SelectList_MainView: {
        height: '50%',
        width: '90%',
        backgroundColor: '#161b21',
        position: 'absolute',
        borderRadius: 20,
        left: '5%',
        top: '8%',
        borderWidth:.5,
        borderColor:'#808080',
      },
      SelectList_Header_Text:{
        color: '#fff', 
        fontWeight: '500'
      },
      SelectList_Search:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#808080',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      SelectList_Search_TextInput:{
        color:'#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      SelectList_Item_Text:{
        padding: 10,
        fontSize: 15,
        color: '#fff',
        borderBottomWidth: 1,
        borderColor: '#808080',
      },
      Header: {
        backgroundColor: '#161b21',
        alignItems: 'center',
      },
      Header_ButtonSelected: {
        borderBottomWidth: 2,
        borderColor: '#6cdab9',
        paddingBottom: 15,
        color: '#fff',
        fontWeight: '700',
        paddingHorizontal: 5,
        marginRight: 30,
      },
      Header_ButtonNotSelected: {
        paddingHorizontal: 5,
        marginRight: 30,
        color: '#808080',
      },
      MainScreen_Background:{
        backgroundColor:'#0d1015',
        height:'100%',
        width:'100%'
      }
})


export default darkMode