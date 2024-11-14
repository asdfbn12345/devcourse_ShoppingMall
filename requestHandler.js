const fs = require("fs");
const mainView = fs.readFileSync("./main.html", "utf-8");
const orderListView = fs.readFileSync("./orderList.html", "utf-8");
const mariadb = require("./database/connect/mariadb");

function main(res) {
    console.log("main");

    mariadb.query("SELECT * FROM product", (err, rows) => {
        // console.log(rows);
    });

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    res.write(mainView);
    res.end();
}

function orderList(res, productId) {
    res.writeHead(200, {"Content-Type" : "text/html"});

    if (productId) {
        const date = new Date().toLocaleDateString();
        const values = `(${productId}, "${date}")`
        
        mariadb.query(`INSERT INTO orderList VALUES ${values};`, (err, rows) => {
            console.log(rows);
        });
    }


    mariadb.query("SELECT * FROM orderList", (err, rows) => {
        res.write(orderListView);

        rows.forEach(element => {
            res.write("<tr>" +
                `<td>${element.product_id}</td>` +
                `<td>${element.order_date}</td>` +
                "</tr>");
        });

        res.write("</table>");
        res.end();
    })
}

function getResource(res, pathname) {
    fs.readFile("." + pathname, (err, data) => {
        console.log('loaded: ' + pathname);
        const contentType = (pathname.match(/.css$/m))
            ? "text/css"
            : "image/png";
        res.writeHead(200, {"Content-Type" : contentType});
        res.write(data);
        res.end();
    });
}

let handle = {};
handle["/"] = main;
handle["getResource"] = getResource;
handle["/orderList"] = orderList;

exports.handle = handle;