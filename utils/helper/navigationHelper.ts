export const goBackNav = (navigation:any) =>{
    if (navigation.canGoBack()) {
        navigation.goBack();
      }
}