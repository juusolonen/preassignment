const express = require('express');
const app = express();

const port = 3020;

const fs = require('fs');
const parser = require('./models/app2');

app.set('views', './views');
app.set('view engine', 'ejs');

let sorted = [];

app.get('/', (req, res) => {

    if(sorted.length < 1) {

        fs.readFile('models/status.real', 'utf-8', (err, data)=> {

            if (err) throw err;
            
                 parser.parse(data, (newdata) => {
    
                    sorted = newdata.sort((a, b) => {
                        if (a.Package < b.Package) {
                            return -1;
                        }
                        if (a.Package > b.Package) {
                            return 1;
                        }
                        if(a.Package == b.Package){
                        return 0;
                        }
                        })
                    })

                    res.render('index', {'packages' : sorted });

                })
                
            } else {
                     res.render('index', {'packages' : sorted });
            }
    
 })



app.get('/package/:package', (req, res) => {

    let package;
    if (isNaN(req.params.package)) {
        let found = sorted.filter(package => package.Package == req.params.package)
        package = found[0];
    } else {
        package = sorted[req.params.package];
    }

    res.render('package', {'packages' : sorted, 'package' : package});
})

app.listen(port, () => {
    console.log(`Server opened in port ${port}`);
})