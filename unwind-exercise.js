// Data - https://gist.github.com/dwolverton/b42117c82e25ee02732f140994a25eae

// What were the total sales for Ronda this week?
db.sales.aggregate([
    { $match: { staff: "Ronda" } },
    { $unwind: "$sales" },
    { $group: {
      _id: null,
      totalSales: { $sum: "$sales.total" }
    } }
  ]);
  
  // What were the total sales for each staff member this week?
  db.sales.aggregate([
    { $unwind: "$sales" },
    { $group: {
      _id: "$staff",
      totalSales: { $sum: "$sales.total" }
    } },
    { $project: { // Optional to make our output a bit cleaner
      staff: "$_id",
      totalSales: true,
      _id: false
    } }
  ]);
  
  // What is the average price per drink?
db.sales.aggregate([
    // unwind to get each sale into its own document
    { $unwind: "$sales" },
    // group to find sum of drinks and totals
    { $group: {
      _id: null,
      totalItems: { $sum: "$sales.items" },
      totalTotal: { $sum: "$sales.total" }
    } },
    // project to calculate price per drink
    { $project: {
      _id: false,
      pricePerDrink: { $divide: [ "$totalTotal", "$totalItems" ]}
    }}
  ]);
  
  // What is the average % tip?
  db.sales.aggregate([
    // unwind to get each sale into its own document
    { $unwind: "$sales" },
    // group to find sum of drinks and totals
    { $group: {
      _id: null,
      totalTotal: { $sum: "$sales.total" },
      totalTips: { $sum: "$sales.tip"}
    } },
    // project to calculate price per drink
    { $project: {
      _id: false,
      percentTip: { $multiply: [{$divide: [ "$totalTips", "$totalTotal" ]}, 100]}
    }}
  ]);
  
  // What is the average % tip per staff member?
  // What is the average order total for each day of the week?
  // Which day has the most tips?