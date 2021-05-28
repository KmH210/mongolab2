// #1 Average age
// Expected Result: 41.41
db.people.aggregate([
    { $group: {
      _id: "Sage",
      averageAge: { $avg: "$age" }
    } }
  ]);

// #2 Average age by gender
// Expected Result: Female: 42.04, Male: 40.60
db.people.aggregate([
    {$group: {
      _id: "$gender", 
      averageAge: { $avg: "$age" }
    } }
]);


// #3 Number of people by gender
// Expected Result: Female: 113, Male: 87
db.people.aggregate([
    {$group: {
        _id:"$gender",
        count: {$sum: 1}
    }}
]);

// #4 3 oldest people
// Expected Result: Phyllis Gray 81, Melissa Banks 79, Walter Bishop 76
db.people.aggregate([
    {$sort: {age: -1} },
    {$limit: 3}
])

// #5 5 youngest people, display only their names as one value (first + " " + last) and their ages
// Expected Result: Nicholas Hunter 17, Kenneth Burns 18, Kathy Hayes 19, Edward Hayes 21, Steve Vasquez 21)
db.people.aggregate([
    {$sort: {age: 1} },
    {$limit: 5},
    {$project: {
        name: {$concat: ["$first_name", '-', "$last_name"]},
        age: '$age'
    }}
])



// #6 Average number of children
// Expected Result: 2.34
db.people.aggregate( [
    {$group: {
        _id: null,
        numberOfChildren: {$sum: { $size: "$children" } }
        }},
    {$project:{
        _id:false,
        averageChildren: [{$divide: ["$numberOfChildren", 200]}]
    }}
]);


// #7 Name and age of children in Michigan who are under age ten
// Expected Result: Adam 0, Janice 1, Judith 3, Beverly 4, Antonio 6, Jeremy 7
db.people.aggregate( [
    { $unwind: "$children" },
    { $match: { state: "Michigan", 'children.age': {'$lt': 10} } },
    {
        $project: {
            _id: false,
            name: '$children.name',
            age: '$children.age'
        }
    }
] );


// #8 Average age of child by state, sorted with oldest first
// Expected Result: Rhode Island 20, Idaho 20, Louisiana 15.7, Kentucky 13.1, Indiana 12.6, ...


// 14. Count all people with at least one child under age four. (69)
// db.people.find( { 'children.age': { $lt: 4 } } ).count();

