const getCase = require("./getCase"),
      summariseCase = require("./summariseCase");

getCase("http://www.bailii.org/uk/cases/UKHL/1997/28.html", function(err, res){
      if (err)
            console.log(err);
      summariseCase(res, function(err, res){
            if (err)
                  console.log(err);
            console.log(res);
      })
})