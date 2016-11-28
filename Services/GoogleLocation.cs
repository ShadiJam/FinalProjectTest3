using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using LocationSearch;

public class GoogleLocationService {
    
    private string key = "AIzaSyAtkcKhu5sly4w5dvFFFvvUzI7o15tea3c";
    public string address = "woodbar";
    public GoogleLocationService(){}
    protected string urlFormat(string address, string key) =>
        $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={key}";
    
    public async Task<RootObject> Get(string address){
        return await API.GetData<RootObject>(urlFormat(address, key));
    }

}