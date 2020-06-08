# Food-Picker

- implementation so far doesn't involve any permanent users (ppl cannot come back to view data / eventual matches)
- otherwise, the user flow x data tracking is relatively complete 
- create room -> fill out party info -> call yelp api to get restaurant data -> generate new room id & create firebase record with party info + restaurant data -> start swiping -> get restaurant data from firebase -> render tinder screen of yes/no restaurants
- join room -> enter room id -> increment number of users joined for that room -> get restaurant data from firebase -> render tinder screen of yes/no restaurants
- selecting yes/no on a restaurant will update a yes/no counter for that restaurant record for that room
- after swiping through all restaurants, will redirect to "my rooms" page (basically blank & functionless page atm)
- idk if you all can access my firebase real-time database (?) so here's a quick ss: 
<img src="assets/Screen Shot 2020-06-08 at 12.50.54 AM.png" width=200>

