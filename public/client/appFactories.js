var appFactories = angular.module('appFactories', []);

appFactories.factory('getSearchedShow', function($http){
  var receivedShow;
  var shows = {
      getAShow: function(args){
        return $http.get('/getSearchedShow', {
          params: args
        })
        .success(function(data, status, headers, config){
          console.log("getASearchedShowData ", data);
          receivedShow = data;
        })
        .error(function(data, status, headers, config){
          console.log('get error in getAshow');
        });
       },
      getReceivedShow: function(){
      return receivedShow;
   }
  };
  return shows;
});

appFactories.factory('getAllShows', function($http){
var shows = {showNames:[
   // getAllShows: function(){
   //  return $http.get('/getShows')
   //  .success(function(data,status, headers, config){
   //    angular.forEach(data.data, function(item){
   //      console.log("data in factory", item);
        
   //    });
   //  })
   //  .error(function(data, status, headers, config){
   //    console.log('get error');
   //  });
   // }

    {name:"The West Wing", title: "the-west-wing"},
    {name: "The Office", title: "the-office-us"},
    {name: "Friday Night Lights", title: "friday-night-lights"},
    {name: "My So-Called Life", title: "my-so-called-life" },
    {name: "Breaking Bad", title: "my-so-called-life"},
    {name: "Game of Thrones", title: "game-of-thrones"},
    {name: "Parks and Recreation", title:"parks-and-recreation"},
    {name: "The Good Wife", title: "the-good-wife"},
    {name: "Freaks and Geeks", title:"freaks-and-geeks"},
    {name: "The Walking Dead (2010)", title:"the-walking-dead"},
    {name: "Game of Thrones (2011)", title:"game-of-thrones"},
    {name: "How I Met Your Mother (2005)", title:"how-I-met-your-mother"},
    {name: "True Detective (2014)", title:"true-detective"},
    {name: "Breaking Bad (2008)", title:"breaking-bad"},
    {name: "Arrow (2012)", title:"arrow"},
    {name: "Vikings (2013)", title:"vikings"},
    {name: "The Big Bang Theory (2007)", title:"the-big-bang-theory"},
    {name: "House of Cards (2013)", title:"house-of-cards"},
    {name: "Once Upon a Time (2011)", title:"once-upon-a-time"},
    {name: "Supernatural (2005)", title:"supernatural"},
    {name: "American Horror Story (2011)", title:"american-horror-story"},
    {name: "Teen Wolf (2011)", title:"teen-wolf"},
    {name: "Suits (2011)", title:"suits"},
    {name: "The 100 (2014)", title:"the-100"},
    {name: "The Following (2013)", title:"the-following"},
    {name: "Bates Motel (2013)", title:"bates-motel"},
    {name: "The Vampire Diaries (2009)", title:"the-vampire-diaries"},
    {name: "Grey's Anatomy (2005)", title:"greys-anatomy"},
    {name: "Hannibal (2013)", title:"hannibal"},
    {name: "Resurrection (2014)", title:"resurrection"},
    {name: "Doctor Who (2005)", title:"doctor-who"},
    {name: "The Good Wife (2009)", title:"the-good-wife"},
    {name: "Glee (2009)", title:"glee"},
    {name: "Dexter (2006)", title:"dexter"},
    {name: "Modern Family (2009)", title:"modern-family"},
    {name: "The Blacklist (2013)", title:"the-blacklist"},
    {name: "Pretty Little Liars (2010)", title:"pretty-little-liars"},
    {name: "Agents of S.H.I.E.L.D. (2013)", title:"marvels-agents-of-shield"},
    {name: "Believe (2014)", title:"believe"},
    {name: "From Dusk Till Dawn: The Series (2014)", title:"from-duck-till-dawn"},
    {name: "Sons of Anarchy (2008)", title:"sons-of-anarchy"},
    {name: "Da Vinci's Demons (2013)", title:"da-vinci's-demons"},
    {name: "Revenge (2011)", title:"revenge"},
    {name: "Sherlock (2010)", title:"sherlock"},
    {name: "Mad Men (2007)", title:"mad-men"},
    {name: "NCIS (2003)", title:"ncis"},
    {name: "Psych (2006)", title:"psych"},
    {name: "Shameless (2011)", title:"shameless"},
    {name: "Lost (2004)", title:"lost"},
    {name: "Girls (2012)", title:"girls"},
    {name: "Crisis (2014)", title:"crisis"},
    {name: "Castle (2009)", title:"castle"},
    {name: "Homeland (2011)", title:"homeland"},
    {name: "The Originals (2013)", title:"the-originals"},
    {name: "Black Sails (2014)", title:"black-sails"},
    {name: "Orange Is the New Black (2013)", title:"orange-is-the-new-black"},
    {name: "Scandal (2012)", title:"scandal"},
    {name: "Bones (2005)", title:"bones"},
    {name: "New Girl (2011)", title:"new-girl"},
    {name: "Person of Interest (2011)", title:"person-of-interest"},
    {name: "Justified (2010)", title:"justified"},
    {name: "Criminal Minds (2005)", title:"criminal-minds"},
    {name: "Grimm (2011)", title:"grimm"},
    {name: "Two and a Half Men (2003)", title:"two-and-a-half-men"},
    {name: "Veronica Mars (2004)", title:"veronica-mars"},
    {name: "Downton Abbey (2010)", title:"downton-abbey"},
    {name: "Friends (1994)", title:"friends"},
    {name: "Archer (2009)", title:"archer"},
    {name: "Gossip Girl (2007)", title:"gossip-girl"},
    {name: "Revolution (2012)", title:"revolution"},
    {name: "The Mentalist (2008)", title:"the-mentalist"},
    {name: "Cosmos: A Space-Time Odyssey (2014)", title:"cosmos"},
    {name: "True Blood (2008)", title:"true-blood"},
    {name: "Law & Order: Special Victims Unit (1999)", title:"law-and-order"},
    {name: "The Secret Life of the American Teenager (2008)", title:"the-secret-life-of-the-american-teenager"},
    {name: "Star-Crossed (2014)", title:"star-crossed"},
    {name: "24 (2001)", title:"24"},
    {name: "The Tomorrow People (2013)", title:"the-tomorrow-people"},
    {name: "Brooklyn Nine-Nine (2013)", title:"brooklyn-nine-nine"},
    {name: "Reign (2013)", title:"reign"},
    {name: "Banshee (2013)", title:"banshee"},
    {name: "Spartacus: War of the Damned (2010)", title:"spartacus"},
    {name: "Community (2009)", title:"community"},
    {name: "The Office (2005)", title:"the-office"},
    {name: "Helix (2014)", title:"helix"},
    {name: "Parks and Recreation (2009)", title:"parks-and-recreation"},
    {name: "Parenthood (2010)", title:"parenthood"},
    {name: "Full House (1987)", title:"full-house"},
    {name: "Family Guy (1999)", title:"family-guy"},
    {name: "Hart of Dixie (2011)", title:"hart-of-dixie"},
    {name: "One Tree Hill (2003)", title:"one-tree-hill"},
    {name: "The Americans (2013)", title:"the-americans"},
    {name: "That '70s Show (1998)", title:"that-70s-show"},
    {name: "Buffy the Vampire Slayer (1997)", title:"buffy-the-vampire-slayer"},
    {name: "Prison Break (2005)", title:"prison-break"},
    {name: "Once Upon a Time in Wonderland (2013)", title:"once-upon-a-time-in-wonderland"},
    {name: "Californication (2007)", title:"californication"},
    {name: "White Collar (2009)", title:"white-collar"},
    {name: "Chuck (2007)", title:"chuck"},
    {name: "NCIS: Los Angeles (2009)", title:"ncis-los-angeles"},
    {name: "The Musketeers (2014)", title:"the-musketeers"},
    {name: "Fargo (2014)", title:"fargo"},
    {name: "Surviving Jack (2014)", title:"surviving-jack"},
    {name: "The Fosters (2013)", title:"the-fosters"},
    {name: "Falling Skies (2011)", title:"falling-skies"},
    {name: "Elementary (2012)", title:"elementary"},
    {name: "Nashville (2012)", title:"nashville"},
    {name: "The Wire (2002)", title:"the-wire"}
 ]}; return shows;
});
