// Reports on orders collection:


// #9 Find the total dollar amount of all sales ever. Use the total field.
// Expected Result: 680.92
db.orders.aggregate([
    {$group: {
        _id:"$price",
        totalAmount: { $sum: "$price" },
        total: {sum: 1}
    } }
 ]);

// #10 Find the total dollar amount of sales on 2017-05-22. Use the total field.
// Expected Result: 271.2
db.orders.aggregate([
    { $match: { date: "2017-05-22"} },
    {$group: {
        _id:"$date",
       totalAmount: { $sum: "$total" },
     
    } }
 ]);
 
// #11 Find the date with the greatest number of orders. Include the date and the number of orders.
// Expected Result: 2017-05-04 3
db.orders.aggregate([
    {$group: {
        _id:"$date",
       totalAmount: { $max: "$total" },
    } },
    {$sort:{total: 1 } },
    {$limit: 1},
    { $project: {
        _id: "$date",
        items:  "$items.count"
      }}
 ]);
 

// #12 Find the date with the greatest total sales. Include the date and the dollar amount for that day.
// Expected Result: 2017-05-22 $271.2


// #13 Find the top three products that have had the greatest number sold. Include product name and number sold.
// Expected Result: Pine Nuts 13, Cheese 8, Top Hat 5


// #14 Find the top item that has the greatest revenue (number sold * price). Include product name and dollar amount of sales.
// Expected Result: Shoes 197.98


