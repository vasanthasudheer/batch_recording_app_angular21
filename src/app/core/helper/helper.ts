function genericSearch(dataArray: any, searchText: string) {
    debugger;
    if (!searchText) {
        return dataArray;
    }
    searchText = searchText.toString().toLowerCase();
    return dataArray.filter((item: any) =>
        Object.values(item).some((val: any) =>
            val !== null && val !== undefined &&
            val.toString().toLowerCase().includes(searchText)
        )
    );
}
export { genericSearch };
 